import React, { useState } from "react";
import {StyleSheet, View, Text} from 'react-native';


export const TarjetaProducto = ({nombre, marca, precio}) => {
    return (
        <View style={styles.container}>
        <Text style={styles.carrera}> {nombre} </Text>
        <Text style={styles.otroTexto}> {marca} </Text>
        <Text style={styles.otroTexto}> ${precio} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#00bcf0',
  },

    tarjeta: {
        borderWidth: 2,
        padding: 25,
        margin: 15,
    },
    nombre: {
        fontSize: 24,
        fontWeight:600,
        textTransform:'uppercase',
    },

    marca: {
        fontSize: 18,
        color:'blue',
        fontFamily:'Roboto',
    },

    precio: {
        fontSize: 12,
        color:'Courier',
        fontFamily:'italic',
    },
});