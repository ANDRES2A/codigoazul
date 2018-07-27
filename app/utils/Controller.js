import firebase from 'firebase';
export default firebase.initializeApp({
    apiKey: "AIzaSyDF57s0tKgYjCc4_rnbAFQAC-hco6gFymo",
    authDomain: "codigo-azul-quito.firebaseapp.com",
    databaseURL: "https://codigo-azul-quito.firebaseio.com",
    projectId: "codigo-azul-quito",
    storageBucket: "codigo-azul-quito.appspot.com",
    messagingSenderId: "659019739684"
});
import {  AsyncStorage } from 'react-native';
export let db = firebase.database();
export const storage = firebase.storage();
export let auth = firebase.auth();
import axios from 'axios';
import {url} from './Config';

export function newUser(user){
    let ref = db.ref('alerts');
    let key = ref.push().key;
    ref.child(key).set(user);
    return key;
}
export function reporte(reporte,key){
    let ref = db.ref('alerts/'+key+'/reporte');
    ref.set(reporte);
}
export function alertaDetail(alerta,key){
    let ref = db.ref('alerts/'+key+'/detalle');
    ref.set(alerta);
}
export function addLocation(info,key){
    let ref = db.ref('alerts/'+key+'/localizacion');
    ref.set(info);
}


export async function getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      return value;
    } catch (error) {
        console.log('error getting item: ', error);
        return null;
    }
    return null;
}
export async function setItem(name,item) {
    try {
      const value = await AsyncStorage.setItem(name,item);
      return value;
    } catch (error) {
        console.log('error setting item: ', error);
        return null;
    }
    return null;
}
export async function removeItem(item) {
    try {
      const value = await AsyncStorage.removeItem(item);
      return value;
    } catch (error) {
        console.log('error removing item: ', error);
        return null;
    }
    return null;
}
export async function logOutUser(){
    try{
        auth.signOut();
        let uid = await AsyncStorage.getItem('uid');
        if(uid){
            db.ref(uid).remove();
        }
        const value = await AsyncStorage.clear()
        return value;
    }
    catch (error){
        console.log('something went wrong')
        return 'error';
    }
}
export function logInUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}
export async function verifyUser (uid){
    let user = null;
    await getGuias().then(async value=>{
        await Object.values(value.data).map(element=>{
            if(uid===element.token){
                console.log('element: ', element);
                user = element;
            }
        })
    });
    return user;
}
export function registerNewUser(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
}
export function postGuia(user){
    let options ={
        async: true,
        method: 'POST',
        url:url+'Guias',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        data:user
    };
    return axios(options);
}

export function getGuias(){
    let options ={
        async: true,
        method: 'GET',
        url:url+'Guias',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
    };
    return axios(options);
}
export function updateUserLocation(user){
    let options ={
        async: true,
        method: 'PUT',
        url:url+'Guias/'+user.id,
        data:user,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
    };
    return axios(options); 
}
export async function updateLocation(uid,location){
    let id = null;
    let data = null;
    await getGuias().then(async value=>{
        await Object.values(value.data).map(element=>{
            if(uid===element.token){
                console.log('element: ', element);
                id=element.id;
                data = element;
                data.location = location;
            }
        })
    });
    if(id!==null && data!==null){
        let options ={
            async: true,
            method: 'PUT',
            url:url+'Guias/'+id,
            data:data,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
        };
        return axios(options);
    }
    else{
        console.log('error, no uid');
    }
}