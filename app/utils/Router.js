import React,{Component} from 'react';
import { Router,Stack, Scene, Actions } from 'react-native-router-flux';
import Login from '../components/Login';
import First from '../components/First';
import Index from '../components/Index';
import Main from '../components/Main';
import Info from '../components/Info';
import UserInfo from '../components/UserInfo';
import Register from '../components/Register';
import Report from '../components/Report';
import ReportDetail from '../components/ReportDetail';
import Ubicacion from '../components/Ubicacion';
import Success from  '../components/Success';

export default class RouterComponent extends Component{
render(){
    return (
      <Router>
        <Stack key="root">
            <Scene key="first" component={First} hideNavBar={true} initial ={true} />
            <Scene key="index" component={Index} hideNavBar={true} />
            <Scene key="login" component={Login} hideNavBar={true} />
            <Scene key="register" component={Register} hideNavBar={true}/>
            <Scene key="main" component={Main} hideNavBar={true}/>
            <Scene key="info" component={Info} hideNavBar={true}/>
            <Scene key="userinfo" component={UserInfo} hideNavBar={true}/>
            <Scene key="report" component={Report} hideNavBar={true} />
            <Scene key="reportDetail" component={ReportDetail} hideNavBar={true} />
            <Scene key="ubicacion" component={Ubicacion} hideNavBar={true} />
            <Scene key="success" component={Success} hideNavBar={true} />
            
        </Stack>
      </Router>
    );
  }
}
