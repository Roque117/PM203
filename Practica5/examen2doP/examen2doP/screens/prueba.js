import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  Switch,
  TextInput,
  Alert,
  FlatList,
  SectionList,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';

const SimularSplashScreen = {
  hideAsync: () => console.log("SplashScreen oculto"),
};

export default function AppYouTube() {
  const [cargandoVideo, setCargandoVideo] = useState(true); 
  const [like, setLike] = useState(false);                  
  const [autoplay, setAutoplay] = useState(true);           
  const [comentario, setComentario] = useState('');         
  const [modalVisible, setModalVisible] = useState(false);   

  useEffect(() => {
    setTimeout(() => {
      SimularSplashScreen.hideAsync();
      setCargandoVideo(false);
    }, 2000);
  }, []);

  const videosRecomendados = [
    { id: '1', titulo: 'Aprende React Native en 15 minutos', vistas: '120k vistas' },
    { id: '2', titulo: '¿Por qué usar Expo en 2026?', vistas: '85k vistas' },
    { id: '3', titulo: 'Creando clones de apps famosas', vistas: '250k vistas' },
  ];

  const seccionesAjustes = [
    { title: 'Video', data: ['Calidad: 1080p', 'Velocidad: Normal'] },
    { title: 'Extras', data: ['Subtítulos: CC desactivado', 'Reportar problema'] },
  ];

  const handleReportar = (item) => {
    if (item === 'Reportar problema') {
      Alert.alert(
        'Reportar Video',
        '¿Estás seguro de que quieres reportar este contenido?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Sí, reportar', onPress: () => console.log('Video reportado') },
        ]
      );
    }
  }; 

  return (
    // SAFEAREAVIEW ENGLOBA ABSOLUTAMENTE TODO
    <SafeAreaView style={styles.contenedorPrincipal}>
      
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}
        >

            {/* SCROLLVIEW ENGLOBA TODO EL CONTENIDO VISIBLE DE LA PANTALLA */}
            <ScrollView style={{ flex: 1 }}>
            
            <View style={styles.reproductorVideo}>
                {cargandoVideo ? (
                <ActivityIndicator size="large" color="#FF0000" />
                ) : (
                <Text style={styles.textoVideo}>► Reproduciendo: Curso de React Native</Text>
                )}
            </View>

            <View style={styles.zonaAcciones}>
                <Pressable 
                style={({ pressed }) => [styles.botonLike, { opacity: pressed ? 0.6 : 1 }]}
                onPress={() => setLike(!like)}
                >
                <Text style={{ color: like ? '#0033ff' : '#000' }}>
                    {like ? '👍 ¡Te gusta!' : '👍 Dar Like'}
                </Text>
                </Pressable>

                <View style={styles.filaAutoplay}>
                <Text>Autoplay: </Text>
                <Switch 
                    value={autoplay} 
                    onValueChange={(value) => setAutoplay(value)} 
                    trackColor={{ false: '#767577', true: '#ff8181' }}
                    thumbColor={autoplay ? '#FF0000' : '#f4f3f4'}
                />
                </View>
            </View>

            <View style={{ height: 40, marginVertical: 5 }}>

                {/* Este ScrollView es horizontal, por lo que no hace conflicto con el vertical que envuelve todo */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraTags}>
                {['Todos', 'Programación', 'JavaScript', 'Mobile Apps', 'Aprender código', 'Tecnología'].map((tag, index) => (
                    <View key={index} style={styles.tag}><Text>{tag}</Text></View>
                ))}
                </ScrollView>

                
            </View>

                <ImageBackground 
                    source={{ uri: 'https://picsum.photos/seed/picsum/600/200' }} 
                    style={styles.bannerCanal}
                >
                    
                    <View style={styles.overlayBanner}>
                    <Text style={styles.nombreCanal}>Canal: DevMaster Pro</Text>
                    </View>
                </ImageBackground>

                {/* FLATLIST DENTRO DE SCROLLVIEW */}
                <FlatList
                    data={videosRecomendados}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false} // <-- CLAVE: Apaga el scroll interno para que el ScrollView padre controle todo
                    ListHeaderComponent={<Text style={styles.tituloSeccion}>Videos recomendados</Text>}
                    renderItem={({ item }) => (
                    <View style={styles.tarjetaVideo}>
                        <Text style={styles.tituloVideo}>{item.titulo}</Text>
                        <Text style={styles.vistasVideo}>{item.vistas}</Text>
                    </View>
                    )}
                />

                <View style={styles.seccionComentarios}>
                    <TextInput 
                    style={styles.inputComentario}
                    placeholder="Añade un comentario público..."
                    value={comentario}
                    onChangeText={setComentario}
                    />
                    <Pressable 
                    style={styles.botonEnviar} 
                    onPress={() => {
                        setComentario('');
                        alert('Comentario publicado');
                    }}
                    >
                    <Text style={{color: 'white'}}>Enviar</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.botonAjustes} onPress={() => setModalVisible(true)}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>⚙️ Configuración del Video</Text>
                </Pressable>



                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                        >

                        <SafeAreaView style={{ flex: 1, padding: 20 }}>
                        <Text style={styles.tituloModal}>Configuración Avanzada</Text>

                        <SectionList
                            sections={seccionesAjustes}
                            keyExtractor={(item, index) => item + index}
                            scrollEnabled={false} // <-- CLAVE: Igual que el FlatList, para evitar conflictos si decides envolver el modal en otro ScrollView a futuro.
                            renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.encabezadoSeccion}>{title}</Text>
                            )}
                            renderItem={({ item }) => (
                            <Pressable onPress={() => handleReportar(item)} style={styles.celdaAjuste}>
                                <Text>{item}</Text>
                            </Pressable>
                            )}
                        />

                        <Pressable style={styles.botonCerrarModal} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: 'white' }}>Cerrar Ajustes</Text>
                        </Pressable>
                        </SafeAreaView>
                    </Modal>




            </ScrollView>
        </KeyboardAvoidingView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: { flex: 1, backgroundColor: '#FAFAFA' },
  reproductorVideo: { height: 220, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  textoVideo: { color: '#FFF', fontWeight: 'bold' },
  zonaAcciones: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  botonLike: { padding: 8, borderRadius: 20, backgroundColor: '#EAEAEA' },
  filaAutoplay: { flexDirection: 'row', alignItems: 'center' },
  barraTags: { flexDirection: 'row', paddingLeft: 10 },
  tag: { backgroundColor: '#EAEAEA', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, marginRight: 8, height: 30 },
  bannerCanal: { height: 60, justifyContent: 'center', marginVertical: 5 },
  overlayBanner: { backgroundColor: 'rgba(0,0,0,0.4)', flex: 1, justifyContent: 'center', paddingLeft: 15 },
  nombreCanal: { color: '#FFF', fontWeight: 'bold' },
  tituloSeccion: { fontSize: 16, fontWeight: 'bold', margin: 10 },
  tarjetaVideo: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', backgroundColor: '#FFF' },
  tituloVideo: { fontWeight: '600', fontSize: 14 },
  vistasVideo: { color: '#606060', fontSize: 12, marginTop: 4 },
  seccionComentarios: { flexDirection: 'row', padding: 10, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
  inputComentario: { flex: 1, backgroundColor: '#F0F0F0', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  botonEnviar: { backgroundColor: '#cc0000', marginLeft: 10, paddingHorizontal: 15, justifyContent: 'center', borderRadius: 20 },
  botonAjustes: { backgroundColor: '#333', padding: 12, alignItems: 'center', marginBottom: 30 },
  tituloModal: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  encabezadoSeccion: { backgroundColor: '#F0F0F0', padding: 8, fontWeight: 'bold', marginTop: 15 },
  celdaAjuste: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  botonCerrarModal: { backgroundColor: '#cc0000', padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 20 }
});