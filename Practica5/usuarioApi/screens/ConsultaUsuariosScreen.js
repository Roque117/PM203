import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, Pressable, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  // En web usa localhost, en celular usa la IP de tu PC
  const API_URL = Platform.OS === 'web'
    ? 'http://localhost:5000/v1/usuarios/'
    : 'http://192.168.1.112:5000/v1/usuarios/';

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      setUsuarios(datos.usuarios || []);
    } catch (error) {
      console.log("Error API: ", error);
    }
  };

  // Se ejecuta cada vez que entras a este tab
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea} />

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Pressable
        style={styles.btnDetalles}
        onPress={() => router.push({
          pathname: '/detalles',
          params: { id: item.id, nombre: item.nombre, edad: item.edad }
        })}
      >
        <Text style={styles.textoDetalles}>Ver detalles →</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id ? String(item.id) : Math.random().toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
  },
  btnDetalles: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  textoDetalles: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
});