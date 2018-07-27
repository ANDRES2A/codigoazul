'use strict';
var React = require('react-native');
var {StyleSheet,} = React;
import { Platform, Dimensions, PixelRatio } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const headerHeight = Platform === "ios" ? (isIphoneX ? 88 : 64) : 56;
module.exports = StyleSheet.create({
    paddingText:{
        margin:15,
    },
    paddingTextCustom:{
        marginVertical:5,
        marginHorizontal:15,
    },
    btnPadd:{
        margin:5,
    },
    whiteSpace:{
        height:100,
        backgroundColor:'transparent',
    },
    ListOfMaps:{
        width: '100%',
        flex: 1,
        height: (deviceHeight- headerHeight)/2,
    },
    ListOfMapsMap:{ 
        width:'100%', 
        flex: 1,
        height: (deviceHeight- headerHeight)/2,
    },
    littleFlex:{
        flex:0.1
    },
    bigFlex:{
        flex:0.8,
        justifyContent:'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    mediumBigFlex:{
        flex:0.6,
        justifyContent:'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    mediumFlex:{
        flex:0.2
    },
    processText:{
        textAlign:'center'
    },
    processButton:{
        flex:0.5,
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },
    mainImageContainer:{
        width:'100%',  
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
    },
    customImageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
    },
    customImageContainerV2:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
        marginVertical: 20,
    },
    textContainer:{
        width:'100%',  
        padding:40,
    },
    centerSpinner:{
        backgroundColor:'#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customLoginBtn:{
        marginHorizontal:20,
        marginBottom:15,
        padding:12,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#000',
    },
    RegisterBtn:{
        marginHorizontal:20,
        marginBottom:15,
        padding:12,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#2196F3',
        backgroundColor:'#2196F3'
    },
    containerCallout:{
        width:deviceWidth
    },
    view2:{
        backgroundColor:'#193f6b',
    },
    miniIcon:{
        width:22,
        height:22
    },
    miniIconList:{
        width:40,
        height:40
    },
    miniIconCustom:{
        width:22,
        height:22,
        marginRight:30
    },
    view1:{
        backgroundColor:'#4093cc',
    },
    button:{
        backgroundColor:'#1772b6',
    },
    title:{
        fontSize:22,
        textAlign:'center',
        color:'#000'
    },
    whiteTitle:{
        fontSize:22,
        textAlign:'center',
        color:'#fff'
    },
    whiteTitleCustom:{
        fontSize:20,
        textAlign:'center',
        color:'#fff',
        fontWeight:"900"
    },
    whiteSmallTitle:{
        fontSize:16,
        color:'#fff',
        textAlign:'center'
    },
    br:{
        height:30,
    },
    modal:{
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        width:'100%',
        height:deviceHeight
    },
    modalContainer:{
        width:'90%',
        height:deviceHeight/2,
        backgroundColor:'#fff',
        borderRadius:10,
        alignSelf:'center',
        marginTop:deviceHeight/4,
    },
    smallTitle:{
        fontSize:18,
        textAlign:'center',
        color:'#000'
    },
    cercaTitle:{
        paddingTop:0,
        margin:0,
        marginTop:0
    },
    center:{
        textAlign:'center',
    },
    mediumtitleLeft:{
        textAlign:'left',
        color:'#3F51B5',
        margin:5
    },
    smallTitleLeft:{
        fontSize:16,
        textAlign:'left',
        color:'#000',
        margin:5
    },
    smallTitleNew:{
        fontSize:16,
        textAlign:'center',
        color:'#000',
        margin:5
    },
    miniSmallTitleLeft:{
        fontSize:14,
        textAlign:'left',
        color:'#434343',
        margin:5,
    },
    mainImage:{
        width:'100%',
        height:180,
        marginVertical:20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
    },
    mainIcon:{
        width:'100%',
        height:180,
        marginVertical:20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
        color:'#fff',
        fontSize:48,
        textAlign:'center'
    },
    mainImageFloating:{
        width:'70%',
        height:100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
    },
    thumbnail:{
        width:70,
        height:70
    },
    smallImage:{
        width:120,
        height:90,
    },
    middleImage:{
        width:'100%',
        height:180,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
    },
    maxImage:{
        width:'100%',
        height:250,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
    },
    mapFinder:{
        width:'100%',
        height:(deviceHeight-(headerHeight + 30))/2,
        marginBottom:0,
    },
    flatListFinder:{
        width:'100%',
        height:(deviceHeight-(headerHeight+30))/3
    },

});