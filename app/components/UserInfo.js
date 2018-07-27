import React,{Component} from 'react';
import { View, Image, KeyboardAvoidingView ,Alert} from 'react-native';
import { Container, Label,Header, Input,Item,Form,Title, Content, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
import { Location, Permissions} from 'expo';
import {newUser} from '../utils/Controller';
var style = require('../utils/Styles.js');

export default class UserInfo extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        email:'',
        nombre:'',
        ci:'',
        telefono:'',
        localizacion:'',
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
  next = () =>{
  this.setState({isLoading:true});
    let email = this.state.email;
    let self  = this;
    let nombre = this.state.nombre;
    let localizacion = this.state.localizacion;
    let ci = this.state.ci;
    let telefono = this.state.telefono;
    let user = {
      active:true,
      nombre,
      localizacion,
      ci,
      telefono,
      email,
    }
    let pushKey = newUser(user);
    this.setState({isLoading:false});
    Actions.report({pushKey:pushKey});
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
            <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Alerta</Title>
        </Body>
    </Header>
        <Content >
          <View style={style.br} />
          <Text style={{padding:5, textAlign:'center'}}>Tú información</Text>
          <KeyboardAvoidingView style={style.keyboardAvoiding} behavior="padding" enabled>
          <Form>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input  placeholder='Nombre completo' onChangeText={ (nombre) => this.setState({ nombre }) }/>
          </Item>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input  placeholder='Número de cédula' keyboardType='number-pad'  onChangeText={ (ci) => this.setState({ ci }) }/>
          </Item>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input  placeholder='Teléfono' keyboardType='number-pad'  onChangeText={ (telefono) => this.setState({ telefono }) }/>
          </Item>
          <Item floatingLabel style={style.paddingTextCustom}>
            <Input autoCorrect={ false }   keyboardType='email-address'  autoCapitalize = 'none' placeholder='Correo electrónico' onChangeText={ (email) => this.setState({ email }) }/>
          </Item>
        </Form>
        </KeyboardAvoidingView>
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
