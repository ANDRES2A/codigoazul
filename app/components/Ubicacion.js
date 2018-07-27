import React,{Component} from 'react';
import { View, Image, KeyboardAvoidingView ,Alert,ScrollView} from 'react-native';
import { Container, Label,Header, Input,Item,Textarea, Form,Title, Content, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
import {  Location, Permissions,MapView } from 'expo';
import {addLocation} from '../utils/Controller';
var style = require('../utils/Styles.js');
const GOOGLE_MAPS_APIKEY='AIzaSyDpBQLYMv8vFzl_ggm-88FXdnpY_Gd5hjI';


export default class Ubicacion extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        puntoDeReferencia:'',
        comentario:'',
        pushKey:null,
        localizacion:[],
        localizacionPin:[],
    };
}
_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    let currentLocation = [location.coords.latitude, location.coords.longitude];
    this.setState({localizacion:currentLocation,localizacionPin:currentLocation});
  };
  next = () =>{
  this.setState({isLoading:true});
    let localizacion = this.state.localizacionPin.toString();
    let puntoDeReferencia = this.state.puntoDeReferencia;
    let comentario = this.state.comentario;
    let pushKey =this.state.pushKey;
    let user = {
        comentario,
      localizacion,
      puntoDeReferencia,
    }
    addLocation(user,pushKey);
    this.setState({isLoading:false});
    Actions.success();
}
startOver(){
  this._getLocationAsync();
  if(this.props.pushKey){
    this.setState({pushKey:this.props.pushKey});
  }
}
changePin = (evt) =>{
    const {coordinate} = evt.nativeEvent;
    let localizacionPin=[coordinate.latitude,coordinate.longitude]
    this.setState({localizacionPin})
}
componentWillMount(){
  this.startOver();
}
render(){
    let self = this;
    if(this.state.isLoading == true){
      return(
          <View style={style.centerSpinner}>
              <Spinner color='#2196F3' />
          </View>
      )
    }
    return (
      <Container>
        <Header>
        <Left>
            <Button transparent onPress={ ()=>{Actions.pop()} }>
                <Icon name='ios-arrow-back' style={{color:'#fff'}}/>
            </Button>
        </Left>
        <Body style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:'row',}}>
            <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Ubicación</Title>
        </Body>
    </Header>
        <Content >
        {
            this.state.localizacion.length>0?
              <Content>
                <MapView
                  style={style.mapFinder}
                  showsUserLocation={true}
                  zoomEnabled = {true}
                  showsMyLocationButton={true}
                  scrollEnabled = {true}
                  onPress={(evt)=>this.changePin(evt)}
                  apikey={GOOGLE_MAPS_APIKEY}
                  initialRegion={{
                    latitude: parseFloat(this.state.localizacion[0]),
                    longitude: parseFloat(this.state.localizacion[1]),
                    latitudeDelta:  0.02922,
                    longitudeDelta:  0.02421,
                  }}
                >
                {self.state.localizacionPin.length>0 && 
                    <MapView.Marker
                        color='#2196F3'
                        coordinate={{latitude: parseFloat(self.state.localizacionPin[0]),longitude: parseFloat(self.state.localizacionPin[1])}}
                        title={'Enviar Ayuda'}
                        description={'Ubicación a la que debemos enviar ayuda'}
                    />
                  }
                </MapView>
                <ScrollView>
                    <Form>
                        <Item floatingLabel style={style.paddingTextCustom}>
                            <Input  placeholder='Punto de referencia' onChangeText={ (puntoDeReferencia) => this.setState({ puntoDeReferencia }) }/>
                        </Item>
                        <Textarea style={style.paddingTextCustom} rowSpan={5} bordered placeholder="Comentario"  onChangeText={ (comentario) => this.setState({ comentario }) }/>
                    </Form>
                </ScrollView>
            </Content>
            
            :
            <Content>
                <Text>Por favor activa los servicios de localización</Text>
            </Content>
          }
        </Content>
        <Footer>
        <FooterTab>
          <Button full onPress={this.next}>
            <Text style={{color:'#fff'}}>Siguiente</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
