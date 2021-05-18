import React from 'react';
import { StyleSheet, Text, View, Picker, Alert} from 'react-native';
import {MyHeader} from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import db from '../config';
import {TimePicker} from 'react-native-simple-time-picker';

export default class RedirectScreen extends React.Component{
    
    constructor(){
        super();
        this.state = {
            description:'',
            link:'',
            hours:0,
            minutes:0,
            title:'',
            time:'0:0',
            day:''
        }
    }

    editEvent(){

        var item = this.props.navigation.getParam('item');

        if(this.state.day !== '' && this.state.title !== '' && this.state.hours !== 0){
            db.collection(this.state.day).doc(item[0]).delete();
    
            db.collection(this.state.day).doc(this.state.title).set({
                title:this.state.title,
                description:this.state.description,
                time:this.state.hours + ':' + this.state.minutes,
                link:this.state.link
            })
    
            alert('Your edits have been saved');
        }else{
            alert('Please enter the title and time for your event!');
        }


    }

    async componentDidMount(){

        var item = this.props.navigation.getParam('item');

        console.log(item[1]);
        console.log(item[2]);
        console.log(item[3]);
        console.log(item[4]);
        
        var timeSplit = item[2].split(':');

        if(item[3] !== ''){
            await this.setState({
                description:item[1],
                link:item[3],
                time:item[2],
                title:item[0],
                hours:timeSplit[0],
                minutes:timeSplit[1],
                day:item[4]           })
            console.log(this.state.day);
        }else{
            await this.setState({
                description:item[1],
                link:'No link given',
                time:item[2],
                title:item[0],
                hours:timeSplit[0],
                minutes:timeSplit[1],
                day:item[4]
            })
        }
        
    }
    
    render(){
        return(
            <SafeAreaProvider style={{flex:1}}>
                <MyHeader title='Schedule App'/>

                <View style={[styles.container,{justifyContent:'space-evenly'}]}>

                    <TextInput value={this.state.title}
                    style={styles.textBox}
                    placeholder={'title'}
                    onChangeText={(text) => {
                        this.setState({
                            title:text
                        });
                    }}/>

                    <TextInput value={this.state.description}
                    style={styles.textBox}
                    placeholder={'descripton'}
                    onChangeText={(text) => {
                        this.setState({
                            description:text
                        });
                    }}/>

                    <TextInput value={this.state.link}
                    style={styles.textBox}
                    placeholder={'link'}
                    onChangeText={(text) => {
                        this.setState({
                            link:text
                        });
                    }}/>

                    <View style={{flexDirection:'row',marginVertical:25}}>
                        <Text style={[styles.text,{marginRight:25}]}>Time</Text>
                        <TimePicker value={{hours:this.state.hours, minutes:this.state.minutes}}
                        // minutesInterval={5}
                        hoursUnit={'hours'}
                        minutesUnit={'minutes'}
                        onChange={(value) => {
                            this.setState({
                                hours:value.hours,
                                minutes:value.minutes
                            })
                        }}
                        style={{width:'80%',height:'125%'}}/>
                    </View>
                    
                    <TouchableOpacity onPress={() => {
                        this.editEvent();
                    }}
                    style={styles.button}>
                        <Text style={styles.text}>Save Edits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewingScreen',{'isvisible':true})}
                    style={styles.button}>
                        <Text style={styles.text}>Back</Text>
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
    },
    textBox:{
        marginVertical:15,
        width: 350,
        height: 75,
        borderBottomWidth: 1.5,
        borderColor:'#ff8a65',
        fontSize: 20,
    },
    text:{
        fontSize:22,
        color:'black',
        fontWeight:'bold',
        textAlign:'center',
    },
    button:{
        width:200,
        height:50,
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
  });
  