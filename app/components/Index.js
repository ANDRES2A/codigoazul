import React,{Component} from 'react';
import { AppRegistry,Modal, View, Image,TouchableHighlight, AsyncStorage,FlatList ,Alert, WebView, Linking,ScrollView, Platform } from 'react-native';
import { Container, Label,Header, Radio,Toast, Input,Item,Form,Title, Content, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import Swiper from 'react-native-swiper';
import {ListItem as ListItemN, List as ListN} from 'native-base';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import comida from '../../assets/comida.png'; 
import cultura from '../../assets/cultura.png'; 
import diversion from '../../assets/diversion.png'; 
import mini from '../../assets/mini.png';
import filter from '../../assets/filter.png';
import price from '../../assets/price.png';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import main from '../../assets/main.png';
import { Constants, Location, Permissions,MapView } from 'expo';
import geofire from 'geofire';
import {getGuias,logOutUser,db,updateUserLocation,getItem} from '../utils/Controller';

const locations = db.ref('locations');

var style = require('../utils/Styles.js');
const GOOGLE_MAPS_APIKEY='AIzaSyBaAJwtqoIkT0h3Mw41tXeVlWYwTL_lihs';
export default class Index extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        error: '', 
        isLoading: false,
        guias:null,
        category:'Todos',
        categories:[
          'Todos',
          'Cultura',
          'Comida',
          'Diversión'
        ],
        route:[],
        location:null,
        locations:null,
        footerTab:1,
    };
  }
  getData(){
    let self = this;
    getGuias().then(value=>{
      self.setState({guias:value.data,isLoading:false})
    }).catch(error=>{
      console.log('error: ', error);
    })
  }
  async startOver(){
    this.setState({isLoading:true,loading:true,refreshing:true,});
    await this._getLocationAsync();
    this.getData();
  }

  renderListItemGuides = (val) =>{
    let item = val.item;
    return(
      <ListItemN onPress={()=> Actions.info({store:item}) }>
        <Left style={style.mediumFlex}>
          <Image style={style.miniIconList} source={{uri:item.photo}} resizeMode="contain"></Image>
        </Left>
        <Body>
          <Text>{item.nombre}</Text>
          <Text style={{fontSize:10,color:'#434343'}}>{'Edad: '+item.edad + ', Tipo de Guía: ' + item.estilo}</Text>
        </Body>
        <Right>
          <Button transparent onPress={()=> Actions.info({store:item}) }>
            <Icon name='ios-arrow-forward' style={{color:'#2196F3'}}/>
          </Button>
        </Right>
      </ListItemN> 
    );
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
    this.setState({ location:currentLocation});
  };

  logout(){
    logOutUser();
    Actions.first();
  }
  logoutModal = ()=>{
    Alert.alert(
        'Confirmación',
        '¿Está seguro de que desea salir?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Salir', onPress: () => this.logout()},
        ],
    );
  }
  componentWillMount(){
    this.startOver();
  }
  async componentDidMount(){
    let uid = await AsyncStorage.getItem('uid');
    if(uid){      
      this.watchID = navigator.geolocation.watchPosition(
       async position => {
          const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
          const { latitude, longitude } = position.coords;
          const newCoordinate = {
            latitude,
            longitude
          };
          let newLocation = [latitude,longitude];
          let geofireRef = new geofire(db.ref('locations'));
          geofireRef.set(uid,newLocation).then(value=>{
            console.log('Location modified');
          }).catch((error)=> {
            console.log(error);
          });
          getItem('user').then(value=>{
            if(value!==null){
              let user = JSON.parse(value);
              user.localizacion = newLocation.toString();
              updateUserLocation(user).then(val=>{
                console.log('val: ', val);
              }).catch(error=>{
                console.log('error: ', error);
              })
            }
          }).catch(error=>{
            console.log('error: ', error);
          });
          },
          error => console.log(error),
          { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 }
      );
      locations.on('value', snapshot => {
        this.setState({
          locations: snapshot.toJSON()
        })
      })
    }
  }
render(){
  var markers = this.state.locations!==null &&
    Object.entries(this.state.locations).map((element, index)=>{
        let key = element[0];
        let guias  = this.state.guias;
        if(guias!==null){
        for(let i = 0; i <guias.length;i++){
          if(key===guias[i].token){
            let coordenadas = [parseFloat(element[1].l[0]),parseFloat(element[1].l[1])];
            return(
                <MapView.Marker
                  key = {index}
                  coordinate={{latitude: coordenadas[0],longitude: coordenadas[1]}}
                  title={guias[i].nombre}
                >
                <Image 
                    source={{uri:guias[i].photo}}
                    resizeMode="contain"
                    style={{width:40,height:40}}
                />
                <MapView.Callout containerStyle={style.containerCallout}>
                    <View style={{width:240}}>
                    <View style={style.mainImageContainer}>
                        <Image
                            resizeMode="contain"
                            style={style.mainImageFloating}
                            source={{uri:guias[i].photo}}
                        />
                    </View>
                    <Text style={{fontSize:14,marginVertical:5, textAlign:'center',}}>{guias[i].nombre}</Text>
                    <Text style={{fontSize:11,marginBottom:5, textAlign:'center',}}>{'Edad: '+guias[i].edad+', Tipo de Guía: '+guias[i].estilo}</Text>
                    <Button style={{alignSelf:'center'}} onPress={()=>Actions.info({store:guias[i]})} >
                        <Text style={{fontSize:14}}>Detalle</Text>
                    </Button>
                    </View>
                </MapView.Callout>
                </MapView.Marker>
            );
          }
        }
      }
      else{
        return '';
      }
    });
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
          <Body style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:'row',}}>
              <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Código Azul</Title>
          </Body>
          <Right style={{flex:1}}>
            <Button transparent onPress={ this.logoutModal }>
              <Icon name='md-exit' style={{color:'#fff'}}/>
            </Button>
          </Right>
        </Header>
        {
          this.state.footerTab === 1 ?
          <Content>
          {
            this.state.location!==null?
              <Content>
                <MapView
                  style={style.mapFinder}
                  showsUserLocation={true}
                  zoomEnabled = {true}
                  showsMyLocationButton={true}
                  scrollEnabled = {true}
                  apikey={GOOGLE_MAPS_APIKEY}
                  initialRegion={{
                    latitude: parseFloat(this.state.location[0]),
                    longitude: parseFloat(this.state.location[1]),
                    latitudeDelta:  0.02922,
                    longitudeDelta:  0.02421,
                  }}
                >
                {markers}
                </MapView>
            </Content>
            :
            <Content>
                <Text>Por favor activa los servicios de localización</Text>
            </Content>
          }
          </Content>
          :
          <Content>        
                <List containerStyle ={{borderTopWidth:0,borderBottomWidth:0,paddingTop:0,marginTop:0}}>
                  <ListItemN style={{marginTop:0,paddingTop:10}}>
                    <Text style={style.cercaTitle}>Guías</Text>
                  </ListItemN>
                  <FlatList
                      data={this.state.guias}
                      renderItem={this.renderListItemGuides}
                      keyExtractor={(item,index) => index+''}
                  />
                </List>
          </Content>
        }
        <Footer>
        <FooterTab>
            <Button vertical active={this.state.footerTab==1?true:false} onPress={()=>this.setState({footerTab:1})}>
                <Icon name="map" />
                <Text>Mapa</Text>
            </Button>
            <Button vertical active={this.state.footerTab==2?true:false} onPress={()=>this.setState({footerTab:2})}>
                <Icon name="person" />
                <Text>Guías</Text>
            </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
