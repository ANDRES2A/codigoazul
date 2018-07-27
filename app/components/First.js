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
    startNow(){
        Actions.login();
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
            <Swiper style={style.wrapper} loop={false}>
                <Container style={style.view1}>
                    <Header>
                    <Body style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:'row',}}>
                        <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Código Azul</Title>
                    </Body>
                    </Header>
                    <Content >
                        <View style={style.textContainer}>
                            <Text style={style.whiteTitleCustom}>Colabora con quien más lo necesita</Text>
                            <View style={style.br}></View>
                            <Text style={style.whiteSmallTitle}>Con Código Azul los puedes hacer y es así de fácil</Text>
                            <View style={style.mainImageContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={style.mainImage}
                                    source={tutorial1}
                                />
                            </View>
                            <Text style={style.whiteSmallTitle}>¡Acércate, Alerta y Actúa!</Text>
                        </View>
                    </Content>
                </Container>
                <Container style={style.view1}>
                    <Header>
                    <Body style={{flexWrap: 'wrap', alignItems: 'flex-start',flexDirection:'row',}}>
                        <Image resizeMode="contain" style={style.miniIcon} source={mini} /><Title>Código Azul</Title>
                    </Body>
                    </Header>
                    <Content >
                        <View style={style.textContainer}>
                            <Text style={style.whiteTitleCustom}>Si encuentras a una Persona en Situación de Calle</Text>
                            <View style={style.br}></View>
                            <Text style={style.whiteSmallTitle}>Acércate, pregúntale cómo se siente, qué necesita y colabora enviando una alerta a quien lo requiera</Text>
                            <View style={style.mainImageContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={style.mainImage}
                                    source={tutorial2}
                                />
                            </View>
                            <Text style={style.whiteSmallTitle}>¡Acércate, Alerta y Actúa!</Text>
                        </View>
                    </Content>
                </Container>
                <Container style={style.view2}>
                    <Content >
                        <View style={style.br}></View>
                        <View style={style.textContainer}>
                            <Text style={style.whiteTitleCustom}>Te damos la Bienvenida a</Text>
                            <View style={style.br}></View>
                            <View style={style.mainImageContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={style.mainImage}
                                    source={main}
                                />
                            </View>
                            <View style={style.br}></View>
                            
                            
                            <Button full block style={style.button} onPress={()=>Actions.userinfo() }>
                                <Text style={{fontSize:12}}>¡Alerta Ahora!</Text>
                            </Button>
                            {/*<View style={style.br}></View>
                            <Button full transparent  onPress={this.startNow.bind(this) }>
                                <Text style={{fontSize:12}}>Información</Text>
                            </Button>*/}
                        </View>
                    </Content>
                </Container>
            </Swiper>
        );
    }
}
