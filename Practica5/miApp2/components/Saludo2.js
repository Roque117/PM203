import { View, Text, Button, Image } from "react-native";

export const Saludo2 = () => {
    return(
        <View>
        <Image source={require('../assets/wave.png')}/>
        <Text> Soy un Componente Compuesto </Text>
        <Button title = "Hola 203"> </Button>
        
        </View>
    )
};


