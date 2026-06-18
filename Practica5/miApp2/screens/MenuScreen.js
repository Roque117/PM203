/* Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import TextInputScreen from './TextInputScreen';
import PresseableScreen from './PresseableScreen';
import FlatList from './FlatList';
import ImageBackground from './ImageBackground';
import ActivityIndicator from './ActivityIndicator';
import BottomSheet from './BottomSheet';

/* Zona 2: Main - Hogar de los componentes */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'safeArea':
            return <SafeAreaScreen />;
        case 'textInput':
            return <TextInputScreen />;
        case 'presseable':
            return <PresseableScreen />;
        case 'flatList':
            return <FlatList />;
        case 'imageBackground':
            return <ImageBackground />;
        case 'activityIndicator':
            return <ActivityIndicator />;
        case 'bottomSheet':
            return <BottomSheet />;
        case 'menu':
            default:
                return( 
                <View style={styles.container}>
                    <Text style={styles.title}>MENU DE PRACTICAS:</Text>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('tarjetas')} title="Practica Tarjetas"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('safeArea')} title="Practica SafeArea"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('textInput')} title="Practica TextInput"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('presseable')} title="Practica Presseable"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('flatList')} title="Practica FlatList"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('imageBackground')} title="Practica ImageBackground"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('activityIndicator')} title="Practica ActivityIndicator"/>
                    <Text>  </Text>
                        <Button onPress={()=>setScreen('bottomSheet')} title="Practica BottomSheet"/>
                    <StatusBar style="auto" /> 
                    </View>
                    );
                }
}

/* Zona 3: Estilos y Pocisionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf6ff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection:'column',
    paddingVertical: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#002a55',
  },

});

