import React,{Component} from 'react';
import { AppRegistry, View, Image,TouchableHighlight, KeyboardAvoidingView,AsyncStorage ,Alert, WebView, Linking, Platform } from 'react-native';
import { Container, Label,Header, Input,Item,Form,Title, Content, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import {logInUser,verifyUser,updateLocation,db} from '../utils/Controller';
import geofire from 'geofire';
import {  Location, Permissions } from 'expo';
import mini from '../../assets/mini.png';
import main from '../../assets/main.png';
var style = require('../utils/Styles.js');

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        email:'',
        location:null,
        password:'',
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
    this.setState({ location:currentLocation,});
  };
toRegister = () =>{
  console.log('register');
  Actions.register();
}
login = () =>{
    this.setState({isLoading:true});
    let email = this.state.email;
    let self  = this;
    let password = this.state.password;
    logInUser(email, password).then(async data => {
        try {
            let user = await verifyUser(data.user.uid);
            if(user!==null){
                await AsyncStorage.setItem('uid', data.user.uid);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                self.setState({isLoading:false});
                let uid = data.user.uid;
                let location = this.state.location;
                if(location!==null){
                    updateLocation(uid,location.toString()).then(value=>{
                        console.log('value: ', value);
                    })
                    .catch(error=>{
                        console.log('error: ', error);
                    });
                    let geofireRef = new geofire(db.ref('locations'));
                    geofireRef.set(uid, location).then(value=>{
                        console.log('Location added');
                    }).catch((error)=> {
                        console.log(error);
                    });
                } 
                Actions.index();
            }
            else {
                self.setState({isLoading:false});
                Alert.alert('Error','Datos incorrectos');
            }
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
          <View style={style.customImageContainerV2}>
              <Image
                  resizeMode="contain"
                  style={style.mainImage}
                  source={main}
              />
          </View>
          <KeyboardAvoidingView style={style.keyboardAvoiding} behavior="padding" enabled>
          <Form>
            <Item floatingLabel style={style.paddingTextCustom}>
                <Input autoCorrect={ false }   keyboardType='email-address'  autoCapitalize = 'none' placeholder='Correo electrónico' onChangeText={ (email) => this.setState({ email }) }/>
            </Item>
            <Item floatingLabel last style={style.paddingTextCustom}>
                <Input placeholder='Contraseña' onChangeText={ (password) => this.setState({ password }) } secureTextEntry />
            </Item>
                {  
                this.state.isLoading ?
                <Spinner size='small' color='black' />
                :
                <View>
                    <Button block  style={style.paddingTextCustom} onPress={ this.login }>
                        <Text>Iniciar Sesión</Text>
                    </Button>
                    <Button block transparent style={style.paddingTextCustom} onPress={ this.toRegister }>
                        <Text>¿No tienes una cuenta? Regístrate.</Text>
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
