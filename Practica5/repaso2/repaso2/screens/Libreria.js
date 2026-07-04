import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet,              
    Text,                    
    View,                    
    ImageBackground as RNImageBackground, 
    Modal,                   
    Button,                  
    Image,                   
    KeyboardAvoidingView,    
    TextInput,               
    Platform,                
    TouchableWithoutFeedback, 
    Keyboard,                
    ActivityIndicator,       
    Switch,                  
    Pressable,               
    Alert,                   
    FlatList,                
    SafeAreaView             
} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function ImageBackground() {
  const [fondo, setFondo] = useState(require('../assets/Fondo.jpeg'));
  const [splash, setSplash] = useState(true);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false); 
    }, 2000);
    return () => clearTimeout(timer); 
  }, []);

  const handleAgregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return; 
    }

    setIsSaving(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim()
      };

      setLibros([nuevoLibro, ...libros]);
      setIsSaving(false);

      setTitulo('');
      setAutor('');
      setGenero('');

      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (splash) {
        return (
            <View style={styles.splashContainer}>
                <Image source={require('../assets/Carga.jpg')} resizeMode="contain" style={styles.logo}/>
                <Text style={styles.carga}> repa2</Text>
                <StatusBar style="auto" />
            </View>
        );
    }

  return (
     <RNImageBackground source={fondo} style={styles.fondo} resizeMode="cover">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.overlay}>
                
                <Text style={styles.headerTitle}>Catálogo de Libros</Text>

                <KeyboardAvoidingView 
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={styles.formContainer}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Título del libro"
                    placeholderTextColor="#777"
                    value={titulo}
                    onChangeText={setTitulo}
                    editable={!isSaving} 
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Autor"
                    placeholderTextColor="#777"
                    value={autor}
                    onChangeText={setAutor}
                    editable={!isSaving}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Género"
                    placeholderTextColor="#777"
                    value={genero}
                    onChangeText={setGenero}
                    editable={!isSaving}
                  />

                  {isSaving ? (
                    <View style={styles.loadingWrapper}>
                      <View style={styles.recuadroGris}>
                        <Text style={styles.savingTextText}>Guardando...</Text>
                      </View>
                      <ActivityIndicator size="small" color="#A3D944" style={styles.spinner} />
                      <Text style={styles.savingSubtext}>Guardando libro...</Text>
                    </View>
                  ) : (
                    <Pressable style={styles.button} onPress={handleAgregarLibro}>
                      <Text style={styles.buttonText}>Agregar Libro</Text>
                    </Pressable>
                  )}
                </KeyboardAvoidingView>

                <Text style={styles.counterText}>Total de libros: {libros.length}</Text>

                <FlatList
                  data={libros} 
                  keyExtractor={(item) => item.id} 
                  renderItem={({ item }) => ( 
                    <View style={styles.bookCard}>
                      <Text style={styles.bookTitle}>{item.titulo}</Text>
                      <Text style={styles.bookDetails}>Autor: {item.autor}</Text>
                      <Text style={styles.bookDetails}>Género: {item.genero}</Text>
                    </View>
                  )}
                  style={styles.list}
                  showsVerticalScrollIndicator={false} 
                />

            </SafeAreaView>
          </TouchableWithoutFeedback>
          <StatusBar style="auto" />
      </RNImageBackground>
  );
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 10 : 30,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000000',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1565C0',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
    },
    recuadroGris: {
        backgroundColor: '#878787',
        borderRadius: 8,
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    savingTextText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    spinner: {
        marginBottom: 10,
        transform: [{ scale: 1.2 }] 
    },
    savingSubtext: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    },
    counterText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        alignSelf: 'flex-start',
    },
    list: {
        flex: 1,
        width: '100%',
    },
    bookCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: '100%',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },
    bookDetails: {
        fontSize: 14,
        color: '#333333',
        marginTop: 2,
    },
    splashContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carga:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
    },
    logo: {
        width: 150,
        height: 150,
    },
});

