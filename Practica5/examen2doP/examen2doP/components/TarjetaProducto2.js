import React, { useState } from "react";
import {StyleSheet, View} from 'react-native';
import {TarjetaProducto} from './TarjetaProducto';

export default function TarjetaProducto2 () {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.tarjeta}>
      <TarjetaProducto
        nombre="Laptop"
        marca="HP"
        precio="15000"
      />
      </View>
      <View style={styles.tarjeta}>
      <TarjetaProducto
        nombre="Celular"
        marca="Samsung"
        precio="8500"
      />
      </View>
      <View style={styles.tarjeta}>
      <TarjetaProducto
        nombre="Audífonos"
        marca="Sony"
        precio="2200"
      />
      </View>
      

    </View>

    
  );
}

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

});