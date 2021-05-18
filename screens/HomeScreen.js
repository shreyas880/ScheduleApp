import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {MyHeader} from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <SafeAreaProvider style={{flex:1}}>
                <MyHeader title='Schedule App'/>

                <Text style={[styles.text,{marginVertical:50},{color:'orange'},{fontSize:38}]}>Home</Text>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.Button}
                    onPress={() => {
                        this.props.navigation.navigate('ScheduleScreen')
                    }}>
                        <Text style={styles.text}>Plan Schedule</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button}
                    onPress={() => {
                        this.props.navigation.navigate('ViewingScreen')
                    }}>
                        <Text style={styles.text}>View Schedule</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Button:{
        width:'50%',
        height:75,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
        backgroundColor:'#ff2122',
        shadowColor: '#000',
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20,
        textAlign:'center'
    },
    text:{
        fontSize:22,
        color:'black',
        fontWeight:'bold',
        textAlign:'center'
    }
  });
  