/* Perfil usando desestructuracion */
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export const Perfil = ({ nombre, carrera, materia, cuatrimestre }) => {
    const [mostrar, setMostrar] = useState(false);
    return (
        <View>
            <Text> {nombre}</Text>
            {/* rendeizado condicional */}
            {mostrar && 
            <>
            <Text> {carrera} </Text>
            <Text> {materia} </Text>
            <Text> {cuatrimestre} </Text>
            </>
            }

            <Button title="Mostrar Perfil" onPress={ ()=>setMostrar(!mostrar) }/>
        </View>
    );
}

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