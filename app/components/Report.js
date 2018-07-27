import React,{Component} from 'react';
import { View, Image, KeyboardAvoidingView ,Alert} from 'react-native';
import { Container, Label,Header, Input,Item,Form,Title, Content,Textarea, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
import { Location, Permissions} from 'expo';
import {reporte} from '../utils/Controller';
var style = require('../utils/Styles.js');

export default class ReportDetail extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        sexo:'Mujer',
        rangoEtario:'Niño/a',
        dificultad:'No',
        dificultadDetail:'',
        pushKey:null,
    };
}
  next = () =>{
    this.setState({isLoading:true});
    let sexo = this.state.sexo;  
    let rangoEtario = this.state.rangoEtario;
    let dificultad = this.state.dificultad;
    let dificultadDetail = this.state.dificultadDetail;
    let pushKey = this.state.pushKey;
    let user = {
      sexo,
      rangoEtario,
      dificultad,
      dificultadDetail
    }
    reporte(user,pushKey);
    this.setState({isLoading:false});
    Actions.reportDetail({pushKey:pushKey});
}
onSexoChange = (sexo) =>{this.setState({sexo})}
onDificultadChange = (dificultad) =>{this.setState({dificultad})}
onRangoEtarioChange = (rangoEtario) =>{this.setState({rangoEtario})}
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
          <Text style={{padding:5, textAlign:'center'}}>Detalles de la persona en situación de calle</Text>
          <View style={style.br} />
          <View style={style.br} />
          <Text style={{padding:5, textAlign:'center'}}>A continuación se requiere que pueda describir a la persona en situación de calle.</Text>
          <Text style={{padding:5, textAlign:'center'}}>Es importante señalar que si es un grupo de personas, se describa a la persona con mayor nivel de urgencia.</Text>
          <View style={style.br} />
          <View style={style.br} />
          <KeyboardAvoidingView style={style.keyboardAvoiding} behavior="padding" enabled>
          <Form>
              <Text style={{padding:5, textAlign:'center'}}>¿La persona es hombre o mujer?</Text>
              <Picker
                renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#fff" }}>Sexo</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                style={{width:'100%',padding:5,margin:5,}}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.sexo}
                onValueChange={this.onSexoChange}
              >
                <Picker.Item label="Mujer" value="Mujer" />
                <Picker.Item label="Hombre" value="Hombre" />
              </Picker>
              <View style={style.br} />
              <View style={style.br} />
              <Text style={{padding:5, textAlign:'center'}}>¿Cuál es su rango etario?</Text>
              <Picker
                renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#fff" }}>Rango Etario</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                style={{width:'100%',padding:5,margin:5,}}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.rangoEtario}
                onValueChange={this.onRangoEtarioChange}
              >
                <Picker.Item label="Niño/a" value="Niño/a" />
                <Picker.Item label="Adulto" value="Adulto" />
                <Picker.Item label="Adulto Mayor" value="Adulto Mayor" />
              </Picker>
              <View style={style.br} />
              <View style={style.br} />
              <Text style={{padding:5, textAlign:'center'}}>A simple vista ¿La persona presenta algún tipo de dificultad física o mental? (por ejemplo: está en silla de ruedas/usa bastones/habla incoherencias)</Text>
              <Picker
                renderHeader={backAction =>
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#fff" }}>Dificultad</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                style={{width:'100%',padding:5,margin:5,}}
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.dificultad}
                onValueChange={this.onDificultadChange}
              >
                <Picker.Item label="Si" value="Si" />
                <Picker.Item label="No" value="No" />
                <Picker.Item label="No se" value="No se" />
              </Picker>
              {
                this.state.dificultad==='Si' &&
                  <Textarea style={style.paddingTextCustom} rowSpan={5} bordered placeholder="Describe la dificultad...."  onChangeText={ (dificultadDetail) => this.setState({ dificultadDetail }) }/>
              }
              <View style={style.br} />
              <View style={style.br} />
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
