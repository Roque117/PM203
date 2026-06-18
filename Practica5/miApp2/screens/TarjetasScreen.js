/* Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Perfil } from '../components/Perfil';

/* Zona 2: Main - Hogar de los componentes */
export default function TarjetasScreen() {
  return (
    <View style={styles.container}>
      <Perfil estiloEXT={styles.tarjetaroja} nombre="Roque" carrera="Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9" />
      <Perfil 
      estiloEXT={styles.tarjetaverde}
      nombre="Josue" 
      carrera="Hola" 
      materia="PM" cuatrimestre="67">
      </Perfil>
      <Perfil estiloEXT={styles.tarjetaroja} nombre="Roque" carrera="Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9" />
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
  tarjetaroja: {backgroundColor: '#FF6B6B'},
  tarjetaverde: {backgroundColor: '#6BCB77',}
});


