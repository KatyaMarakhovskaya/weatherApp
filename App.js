import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import Loading from './Loading'

const API_KEY = "54826daeea75ff8e3f16e0a5663a085f";


const appi = "api.openweathermap.org/data/2.5/weather?lat=50.4332&lon=30.5219&appid=54826daeea75ff8e3f16e0a5663a085f" ;

export default class extends React.Component{

  state={
    isLoading:true
  }

  getWeather = async(latitude, longitude) =>{
    const{data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    console.log(data)
  }
  getLocation = async () => {
    try{
    /*  throw Error();*/
      await Location.requestPermissionsAsync();
      const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
      //const coords = await Location.getCurrentPositionAsync();
      //console.log(coords)
      this.getWeather(latitude, longitude)
      this.setState({isLoading:false})

    }catch(error){
      Alert.alert('Не могу определить местоположение', "Очень грустно")
    }


  }
  componentDidMount(){
    this.getLocation()
  }

  render(){
    const {isLoading} = this.state;
    return (
        isLoading ? <Loading/> : null
    );

  }
}
