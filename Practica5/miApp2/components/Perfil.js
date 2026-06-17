/* Perfil usando desestructuracion */
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export const Perfil = ({ nombre, carrera, materia, cuatrimestre, estiloEXT }) => {
    const [mostrar, setMostrar] = useState(false);
    return (
        <View style={[styles.tarjeta, estiloEXT]}>
            <Text style={styles.nombre}> {nombre}</Text>
            {/* rendeizado condicional */}
            {mostrar && 
            <>
            <Text style={styles.carrera}> {carrera} </Text>
            <Text style={styles.otroTexto}> {materia} </Text>
            <Text style={styles.otroTexto}> {cuatrimestre} </Text>
            </>
            }

            <Button title="Mostrar Perfil" onPress={ ()=>setMostrar(!mostrar) }/>
        </View>
    );
}

const styles = StyleSheet.create({
    nombre: {
        fontSize: 24,
        fontWeight:600,
        textTransform:'uppercase',
    },

        carrera: {
        fontSize: 18,
        color:'blue',
        fontFamily:'Roboto',
    },

        otroTexto: {
        fontSize: 12,
        color:'Courier',
        fontFamily:'italic',
    },
    
        tarjeta: {
        borderWidth: 2,
        padding: 25,
        margin: 15,
    },

})













/*Perfil usando Props*/

/*
import { View, Text } from "react-native";

export const Perfil = (props) => {
    return (
        <View>
            <Text> {props.nombre}</Text>
            <Text> {props.carrera} </Text>
            <Text> {props.materia} </Text>
            <Text> {props.cuatrimestre} </Text>
        </View>
    );
} */

/*Practica 6*/
/* import { View, Text } from "react-native";

export const Perfil = () => {
    return(
        <View>
            <Text> Nombre: Roque Josue Aguirre Viveros</Text>
            <Text> Carrera: Ingeniería en Sistemas Computacionales </Text>
            <Text> Materia: Programación Móvil </Text>
            <Text> Cuatrimestre: 9 </Text>
        </View>
    )
} */


