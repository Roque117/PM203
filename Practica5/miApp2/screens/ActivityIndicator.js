/* Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/* Zona 2: Main - Hogar de los componentes */
export default function SafeAreaScreen() {
  return (
    <View style={styles.container}>
        <Text> Aqui va la practica de Ana </Text>
      <StatusBar style="auto" />
    </View>
  );
}

/* Zona 3: Estilos y Pocisionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection:'row',
  },

});
