import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

export default function TaskItem({ data, handleDelete }) {
    return(
        <Animatable.View 
            style={ styles.container }
            animation='bounceIn'
            useNativeDriver
        >
            <TouchableOpacity onPress={() => { handleDelete(data) }}>
                <Ionicons
                    name='md-checkmark-circle'
                    size={ 30 }
                    color='#121212'    
                />
            </TouchableOpacity>
            <Text style={ styles.text }>{ data.task }</Text>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 7,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text:{
        color: '#000',
        paddingLeft: 8,
        paddingRight: 8
    }

})