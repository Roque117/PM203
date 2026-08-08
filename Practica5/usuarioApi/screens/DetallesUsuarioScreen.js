import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, Platform, Modal, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetallesUsuarioScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params.id;
  const [nombre, setNombre] = useState(params.nombre || '');
  const [edad, setEdad] = useState(params.edad || '');

  const [modalVisible, setModalVisible] = useState(false);
  const [cargando, setCargando] = useState(false);

  const API_URL = Platform.OS === 'web'
    ? 'http://localhost:5000/v1/usuarios/'
    : 'http://192.168.1.112:5000/v1/usuarios/';

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const irAActualizar = () => {
    router.push({
      pathname: '/actualizar',
      params: { id, nombre, edad }
    });
  };

  const confirmarEliminar = async () => {
    try {
      setCargando(true);
      const urlEliminar = `${API_URL}${id}`;
      const respuesta = await fetch(urlEliminar, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (respuesta.ok) {
        setModalVisible(false);
        mostrarMensaje('Éxito', 'Usuario eliminado correctamente');
        router.replace('/(tabs)/consulta');
      } else {
        mostrarMensaje('Error', 'No se pudo eliminar el usuario');
      }
    } catch (error) {
      console.log('Error API al eliminar:', error);
      mostrarMensaje('Error', 'Ocurrió un error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalles del Usuario</Text>

        <View style={styles.campoGroup}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.valor}>{nombre}</Text>
        </View>

        <View style={styles.linea} />

        <View style={styles.campoGroup}>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.valor}>{edad} años</Text>
        </View>

        <View style={styles.botonesContainer}>
          <Pressable style={styles.botonActualizar} onPress={irAActualizar}>
            <Text style={styles.textoBotonActualizar}>Actualizar</Text>
          </Pressable>

          <Pressable style={styles.botonEliminar} onPress={() => setModalVisible(true)}>
            <Text style={styles.textoBotonEliminar}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>

            <Text style={styles.modalMensaje}>
              ¿Estás seguro de que deseas eliminar al usuario {nombre}?
            </Text>

            <View style={styles.modalBotonesRow}>
              <Pressable
                style={styles.modalBotonCancelar}
                onPress={() => setModalVisible(false)}
                disabled={cargando}
              >
                <Text style={styles.modalTextoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.modalBotonEliminar}
                onPress={confirmarEliminar}
                disabled={cargando}
              >
                <Text style={styles.modalTextoEliminar}>
                  {cargando ? 'Eliminando...' : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  campoGroup: {
    marginVertical: 4,
  },
  label: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 4,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  linea: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 14,
  },
  botonesContainer: {
    marginTop: 30,
  },
  botonActualizar: {
    backgroundColor: 'yellow',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotonActualizar: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonEliminar: {
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonEliminar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMensaje: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalBotonesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBotonCancelar: {
    flex: 1,
    backgroundColor: 'gray',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  modalTextoCancelar: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalBotonEliminar: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  modalTextoEliminar: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
