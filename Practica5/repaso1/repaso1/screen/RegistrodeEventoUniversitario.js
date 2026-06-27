import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Switch, TextInput, Pressable, Modal } from 'react-native';
import { useState } from "react";

export default function RegistrodeEventoUniversitario() {
  const [isTaller, setIsTaller] = useState(true);
  const [isConstancia, setIsConstancia] = useState(false);
  const [isDeportes, setIsDeportes] = useState(true);

  const toggleSwitchTaller = () => setIsTaller(previousState => !previousState);
  const toggleSwitchConstancia = () => setIsConstancia(previousState => !previousState);
  const toggleSwitchDeportes = () => setIsDeportes(previousState => !previousState);

  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalMensaje, setModalMensaje] = useState("");

  const dispararAlertaCustom = (titulo, mensaje) => {
    setModalTitulo(titulo);
    setModalMensaje(mensaje);
    setModalVisible(true);
  };

  const registro = () => {
    if (!nombre || !carrera || !semestre) {
      dispararAlertaCustom("Campos incompletos", "Debes llenar todos los campos.");
      return;
    }

    if (!semestre.match(/^[0-9]+$/)) {
      dispararAlertaCustom("Error", "El semestre debe ser un número.");
      return;
    }

    const cuerpo = `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\nTaller: ${isTaller ? "Sí" : "No"}\nConstancia: ${isConstancia ? "Sí" : "No"}\nDeportes: ${isDeportes ? "Sí" : "No"}`;
    dispararAlertaCustom("Registro enviado", cuerpo);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.Titulo}>Registro de Evento Universitario</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Ingrese su Nombre"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={nombre}
            onChangeText={(texto) => setNombre(texto)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Ingrese su Carrera"
            placeholderTextColor="#999"
            value={carrera}
            onChangeText={(texto) => setCarrera(texto)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Ingrese su Cuatrimestre"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={15}
            value={semestre}
            onChangeText={(texto) => setSemestre(texto)}
          />

          <Text style={styles.Texto}>Opciones</Text>

          <View style={styles.row}>
            <Text style={styles.label}>¿Asistirá al taller?:</Text>
            <Switch onValueChange={toggleSwitchTaller} value={isTaller} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>¿Requiere constancia?:</Text>
            <Switch onValueChange={toggleSwitchConstancia} value={isConstancia} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>¿Participará en deportes?:</Text>
            <Switch onValueChange={toggleSwitchDeportes} value={isDeportes} />
          </View>

          <Pressable style={styles.boton} onPress={registro}>
            <Text style={styles.textoBoton}>Enviar Registro</Text>
          </Pressable>

          <StatusBar style="auto" />
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFondoFijado}>
          <View style={styles.ventanaAlertaMapeada}>
            <Text style={styles.urlHeader}>localhost:8081</Text>
            <Text style={styles.tituloAlertaText}>{modalTitulo}</Text>
            <Text style={styles.mensajeAlertaText}>{modalMensaje}</Text>
            
            <View style={styles.alinearDerecha}>
              <Pressable style={styles.botonAzulAceptar} onPress={() => setModalVisible(false)}>
                <Text style={styles.textoBotonAceptar}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  formContainer: {
    width: '100%',
  },
  Titulo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  Texto: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#ffffff",
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalFondoFijado: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  ventanaAlertaMapeada: {
    width: '85%',
    maxWidth: 440,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 24,
    borderWidth: 3,
    borderColor: '#000000', 
  },
  urlHeader: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
    marginBottom: 16,
  },
  tituloAlertaText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    color: '#000',
  },
  mensajeAlertaText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
    whiteSpace: 'pre-line',
  },
  alinearDerecha: {
    alignItems: 'flex-end',
  },
  botonAzulAceptar: {
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 10,
  },
  textoBotonAceptar: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
