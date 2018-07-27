import React,{Component} from 'react';
import { View, Image, KeyboardAvoidingView ,Alert} from 'react-native';
import { Container, Label,Header, Input,Item,Form,Title, Content,Textarea, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
import { Location, Permissions} from 'expo';
import {alertaDetail} from '../utils/Controller';
var style = require('../utils/Styles.js');

export default class ReportDetail extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        tipo:'Abrigo y alimento',
        mojada:'No',
        protegido:'Si',
        dificultadDetail:'',
        pushKey:null,
    };
}
  next = () =>{
    this.setState({isLoading:true});
    let tipo = this.state.tipo;  
    let mojada = this.state.mojada;
    let protegido = this.state.protegido;
    let pushKey = this.state.pushKey;
    let alerta = {
      tipo,
      mojada,
      protegido
    }
    alertaDetail(alerta,pushKey);
    this.setState({isLoading:false});
    Actions.ubicacion({pushKey:pushKey});
}
onTipoChange = (tipo) =>{this.setState({tipo})}
onMojadaChange = (mojada) =>{this.setState({mojada})}
onProtegidoChange = (protegido) =>{this.setState({protegido})}
startOver(){
  if(this.props.pushKey){
    this.setState({pushKey:this.props.pushKey});
  }
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
          <Text style={{padding:5, textAlign:'center'}}>Detalles de la alerta</Text>
          <View style={style.br} />
          <View style={style.br} />
          <KeyboardAvoidingView style={style.keyboardAvoiding} behavior="padding" enabled>
          <Form>
              <Text style={{padding:5, textAlign:'center'}}>¿Qué tipo de atención necesita?</Text>
              <Picker
                renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#fff" }}>Tipo</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                style={{width:'100%',padding:5,margin:5,}}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.tipo}
                onValueChange={this.onTipoChange}
              >
                <Picker.Item label="Abrigo y alimento" value="Abrigo y alimento" />
                <Picker.Item label="Atención y salud" value="Atención y salud" />
                <Picker.Item label="Traslado a un albergue/refugio" value="Traslado a un albergue/refugio" />
              </Picker>
              <View style={style.br} />
              <View style={style.br} />
              <Text style={{padding:5, textAlign:'center'}}>¿La persona está mojada/desabrigada?</Text>
              <Picker
                renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#fff" }}>Mojada o desabrigada</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                style={{width:'100%',padding:5,margin:5,}}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.mojada}
                onValueChange={this.onMojadaChange}
              >
                <Picker.Item label="Si" value="Si" />
                <Picker.Item label="No" value="No" />
              </Picker>
              <View style={style.br} />
              <View style={style.br} />
              <Text style={{padding:5, textAlign:'center'}}>¿Se encuentra protegido por alguna estructura? ( techo y paredes/carpa/dentro de un cajero/dentro del metro.)</Text>
              <Picker
                renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#fff" }}>Protección</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                style={{width:'100%',padding:5,margin:5,}}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.protegido}
                onValueChange={this.onProtegidoChange}
              >
              <Picker.Item label="Si" value="Si" />
              <Picker.Item label="No" value="No" />
              </Picker>
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
