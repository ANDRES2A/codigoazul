import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  
  TouchableOpacity,
  View,
} from 'react-native';
import { Spinner } from 'native-base';
import {storage} from './Controller';
import main from '../../assets/main.png';
import { Content,Button as ButtonN, Text } from 'native-base';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
var style = require('./Styles.js');
export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    worked:false,
  };
  componentDidMount(){
    
  }
  render() {
    let { image } = this.state;
    
    if(this.state.uploading===true){
        return (<Spinner size='small' color='black' />)
    }
    return (
      <View >
      {
        this.state.worked === false ?
            <View>
              <ButtonN
              block  style={style.paddingTextCustom}
                onPress={this._pickImage}
              >
                <Text>Elegir Imagen de galería</Text>
              </ButtonN>
                <View style={style.br}></View>
              <ButtonN
              block  style={style.paddingTextCustom}
                onPress={this._takePhoto}
              >
                <Text>Tomar Foto</Text>
              </ButtonN>
            </View>
        :
        <View>
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        </View>
      }
      </View>
    );
  }
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: '100%',
          justifyContent:'center',
          alignContent:'center',
          alignItems:'center'
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Se ha copiado el url de la imagen');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let self  = this;
    try {
      this.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        let uri = pickerResult.uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = storage.ref().child('guide'+Date.now()+'.png');
        await ref.put(blob).then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            self.props.photoUri(url);
            self.setState({ image: url ,worked:true});
        })
      }
    } catch (e) {
      console.log({ e });
      alert('Falló subir imágen');
    } finally {
      this.setState({ uploading: false });
    }
  };
}