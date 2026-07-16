import {StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import TarjetaProducto2 from './components/TarjetaProducto2';

export default function App() {
  return (
    <View style={styles.container}>
      <TarjetaProducto2></TarjetaProducto2>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
