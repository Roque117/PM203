import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ActualizarUsuarioScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params.id;
  const [nombre, setNombre] = useState(params.nombre || '');
  const [edad, setEdad] = useState(params.edad ? String(params.edad) : '');
  const [cargando, setCargando] = useState(false);

  const API_URL = Platform.OS === 'web'
    ? 'http://localhost:5000/v1/usuarios'
    : 'http://192.168.1.112:5000/v1/usuarios';

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarCambios = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Campos vacíos', 'Todos los campos son obligatorios');
      return;
    }

    try {
      setCargando(true);
      const urlActualizar = `${API_URL}/${id}`;
      const respuesta = await fetch(urlActualizar, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          edad: parseInt(edad, 10),
        }),
      });

      if (respuesta.ok) {
        mostrarMensaje('Éxito', 'Usuario actualizado correctamente');
        router.replace('/(tabs)/consulta');
      } else {
        mostrarMensaje('Error', 'No se pudo actualizar el usuario');
      }
    } catch (error) {
      console.log('Error API al actualizar:', error);
      mostrarMensaje('Error de Conexión', error.message || String(error));
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Actualizar Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          style={styles.botonGuardar}
          onPress={guardarCambios}
          disabled={cargando}
        >
          <Text style={styles.textoBotonGuardar}>
            {cargando ? 'Guardando...' : 'Guardar cambios'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
  },
  botonGuardar: {
    backgroundColor: 'yellow',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotonGuardar: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
