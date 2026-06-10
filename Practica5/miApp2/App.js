/* Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';

import { Perfil } from './components/Perfil';

/* Zona 2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>----React Native----</Text>
      <Image source={require('./assets/wave.png')}/>
      <Text> Hola Mundo React Native </Text>
      <Text>----Componente Propio simple----</Text>
      <Saludo></Saludo>
      <Text>----Componente Propio Compuesto----</Text>
      <Saludo2></Saludo2>

      <Text>----Componente Perfil----</Text>
      <Perfil></Perfil>
      
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
    justifyContent: 'center',
  },
});
