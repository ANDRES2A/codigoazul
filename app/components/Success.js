import React,{Component} from 'react';
import { AppRegistry, View, Image, AsyncStorage ,Alert, WebView, Linking, Platform } from 'react-native';
import { Container, Label,Header, Input,Item,Form,Title, Content, Footer, FooterTab, Button, Left, Right, Picker,Body, Icon, Text, Spinner } from 'native-base';
import Swiper from 'react-native-swiper';
import { Actions, ActionConst } from 'react-native-router-flux';
import mini from '../../assets/mini.png';
import main from '../../assets/main.png';
import tutorial1 from '../../assets/tutorial1.png';
import tutorial2 from '../../assets/tutorial2.png';
var style = require('../utils/Styles.js');

export default class First extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            error: '', 
            isLoading: false,
        };
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
                <Container style={style.view2}>
                    <Content >
                        <View style={style.br}></View>
                        <View style={style.textContainer}>
                            <Text style={style.whiteTitleCustom}>Gracias por tu reporte</Text>
                            <Text style={style.whiteTitleCustom}>En breve estaremos ahí</Text>
                            <View style={style.br}></View>
                            <View style={style.mainImageContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={style.mainImage}
                                    source={main}
                                />
                            </View>
                            <View style={style.br}></View>
                            
                            
                            <Button full block style={style.button} onPress={()=>Actions.first() }>
                                <Text style={{fontSize:12}}>Volver a empezar</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
        );
    }
}
