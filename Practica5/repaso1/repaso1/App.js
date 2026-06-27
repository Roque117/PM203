import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Switch, TextInput, Platform, Alert, Pressable } from 'react-native';
import { useState } from "react";
import RegistrodeEventoUniversitario from './screen/RegistrodeEventoUniversitario';

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrodeEventoUniversitario/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


