import React from 'react';
import { Location, Permissions} from 'expo';
import {AsyncStorage} from 'react-native';
import Router from './app/utils/Router';
import material from './native-base-theme/variables/material';
import { StyleProvider,Root } from 'native-base';
import getTheme from './native-base-theme/components';  

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, loggedIn:false };
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
    }
  };
  async camera() {
    const { Permissions } = Expo;
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);

    if (status !== 'granted') {
      alert('Activa permisos de carrete');
    }
  }
  async cameraRoll() {
    const { Permissions } = Expo;
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if (status !== 'granted') {
      alert('Activa permisos de carrete');
    }
  }
  startOver(){
    this._getLocationAsync();
    this.camera();
    this.cameraRoll();
  }
  async componentWillMount() {
    this.startOver();
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    try{
      let uid = await AsyncStorage.getItem('uid');
      if(uid){
        this.setState({loggedIn:true})
      }
    }
    catch(error){
      console.log('error getting uid: ', error);
    }
    this.setState({isLoading:false})
  }
  render() {
    return (
      <Root>
      <StyleProvider  style={getTheme(material)}>   
      {
        this.state.isLoading?
          <Expo.AppLoading />
        :
        <Router loggedIn={ this.state.loggedIn }  />
      }
      </StyleProvider> 
      </Root>
    );
  }
}
