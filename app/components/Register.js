import React,{Component} from 'react';
import { AppRegistry, View, Image,TouchableHighlight, KeyboardAvoidingView,AsyncStorage ,Alert, WebView, Linking, Platform } from 'react-native';
import { Container, Label,Header, Input,Item,Form,Title, Content, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import Swiper from 'react-native-swiper';
import { Actions, ActionConst } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import main from '../../assets/main.png';
import { Location, Permissions} from 'expo';
import Camara from '../utils/Camara.js';
import {registerNewUser,postGuia} from '../utils/Controller';
var style = require('../utils/Styles.js');

export default class Register extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        email:'',
        password:'',
        nombre:'',
        edad:'',
        photo:'',
        localizacion:'',
        estilo:'',
        calificacion:5,
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
    console.log('currentLocation: ', currentLocation);
    this.setState({localizacion:currentLocation.toString()});
  };
  photoUri = (url) =>{
    console.log('url desde arriba: ', url);
    this.setState({photo:url});
  }
register = () =>{
  this.setState({isLoading:true});
    let email = this.state.email;
    let self  = this;
    let nombre = this.state.nombre;
    let password = this.state.password;
    let photo = this.state.photo;
    let localizacion = this.state.localizacion;
    let edad = this.state.edad;
    let estilo = this.state.estilo;
    let calificacion = this.state.calificacion;
    registerNewUser(email, password).then(async data => {
        console.log('data: ', data);
        try {
            let user = {
              nombre,
              localizacion,
              edad,
              estilo,
              calificacion,
              token:data.user.uid,
              photo,
            }
            console.log('user: ', user);
            postGuia(user).then(async value=>{
              await AsyncStorage.setItem('uid', data.user.uid);
              self.setState({isLoading:false});
              Actions.index();
            }).catch(err=>{
              console.log('err: ', err);
              self.setState({isLoading:false});
              Alert.alert('Error','Datos incorrectos');
            });
        } catch (error) {
            console.log('error saving uid: ', error);
            self.setState({isLoading:false});
        }
    }).catch((error) => {
        console.log('firebaseError',error);
        self.setState({isLoading:false});
        Alert.alert('Error',error.message);
    });
}
startOver(){
  this._getLocationAsync();
}
componentWillMount(){
  this.startOver();
}
render(){
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
            <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Código Azul</Title>
        </Body>
    </Header>
        <Content >
          <View style={style.mainImageContainer}>
              <Image
                  resizeMode="contain"
                  style={style.mainImage}
                  source={mini}
              />
          </View>
          <KeyboardAvoidingView style={style.keyboardAvoiding} behavior="padding" enabled>
          <Form>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input  placeholder='Nombre completo' onChangeText={ (nombre) => this.setState({ nombre }) }/>
          </Item>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input  placeholder='Edad' keyboardType='number-pad'  onChangeText={ (edad) => this.setState({ edad }) }/>
          </Item>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input  placeholder='Estilo' onChangeText={ (estilo) => this.setState({ estilo }) }/>
          </Item>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input autoCorrect={ false }   keyboardType='email-address'  autoCapitalize = 'none' placeholder='Correo electrónico' onChangeText={ (email) => this.setState({ email }) }/>
          </Item>
          <Item floatingLabel last style={style.paddingTextCustom}>
            <Input placeholder='Contraseña' onChangeText={ (password) => this.setState({ password }) } secureTextEntry />
          </Item>
          <View style={style.br} />
          <View style={style.paddingTextCustom}>
            <Text>Agregue su foto de perfil</Text>
          </View>
          <View style={style.br} />
          <Camara photoUri = {this.photoUri}></Camara>
          <View style={style.br}></View>
            {  
              this.state.isLoading ?
              <Spinner size='small' color='black' />
              :
              <View>
                <Button block  style={style.paddingTextCustom} onPress={ this.register }>
                  <Text>Crear cuenta</Text>
                </Button>
              </View>
            }
        </Form>
        </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}
