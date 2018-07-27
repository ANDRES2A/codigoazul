import React, { Component } from 'react';
import { AppRegistry, Linking,View, Platform,Image, Alert, AsyncStorage,FlatList,ActivityIndicator } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab,Button, Left, Right, Body, Separator,Icon,Thumbnail, Text,Spinner } from 'native-base';
import {List as ListN} from 'native-base';
import {ListItem as ListItemN} from 'native-base';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
export default class Info extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:false,
      store:{},
      stores:{},
      email:null,
      cedula:null,
      place:'locales',
      orders:[],
      loading:false,
      store:null,
      refreshing:false,
    };
   
  }
  seeOnMap = () =>{
    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const latLng = this.state.store.location;
    const label = this.state.store.name;
    const url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}`;

    Linking.openURL(url);
  }
  
  renderSeparator = () =>{
      return(
          <View 
            style={{
                height:1,
                width:'86%',
                backgroundColor:'#434343',
                marginLeft:'40%'
            }}
          />
      )
  }
  renderHeader = () =>{
    return(
        <SearchBar placeholder="¿Qué deseas reparar?" lightTheme 
          onChangeText={this.searchStore}
          onClearText={this.startOver}
        />
    )
  }
  renderFooter = () =>{
    if(!this.state.loading) return null;
    return(
      <View style={{paddingVertical:20}}>
        <ActivityIndicator size="large" animating />
      </View>
    )
  }
  logoutModal(){
    Alert.alert(
        'Confirmación',
        '¿Está seguro de que desea salir?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Salir', onPress: () => this.logout()},
        ],
    );
  }
  startOver = () =>{
    this.setState({store:this.props.store})
    console.log('this.props.store: ', this.props.store);
  }
  componentWillMount(){
    this.startOver();
  }
  render() {
    var style= require('../utils/Styles');
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
          <Left style={style.mediumFlex}>
            <Button transparent onPress={ ()=>{Actions.pop()} }>
              <Icon name='ios-arrow-back' style={{color:'#fff'}}/>
            </Button>
          </Left>
          <Body style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:'row',}}>
              <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Código Azul</Title>
          </Body>
          <Right style={style.mediumFlex} />
        </Header>
          <Content>
            <View>
            <View style={style.customImageContainerV2}>
            <Image
                resizeMode="contain"
                style={style.smallImage}
                source={{uri:this.state.store.photo}}
            />
          </View>
              <ListN>
                <Separator bordered></Separator>
                <ListItemN><Text style={style.smallTitleLeft}>{this.state.store.nombre}</Text></ListItemN>
                <ListItemN><Text style={style.smallTitleLeft}>Estilo: {this.state.store.estilo}</Text></ListItemN>
                <ListItemN><Text style={style.smallTitleLeft}>Edad: {this.state.store.edad}</Text></ListItemN>
                <ListItemN><Text style={style.smallTitleLeft}>Calificación: {this.state.store.calificacion}</Text></ListItemN>
                <ListItemN>
                <Body>
                  <Text style={style.smallTitleLeft}>Ver en el mapa</Text>
                </Body>
                <Right>
                  <Button transparent onPress={ this.seeOnMap }>
                    <Icon name='md-map'/>
                  </Button>
                </Right>
              </ListItemN>
              </ListN>
            </View>
          </Content>
      </Container>
    );
  }
}