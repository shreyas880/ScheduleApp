import React from 'react';
import { StyleSheet, Text, View, Picker, Alert} from 'react-native';
import {MyHeader} from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import db from '../config';
import {TimePicker} from 'react-native-simple-time-picker';

export default class ScheduleScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            day:'Monday',
            title:'',
            hours:0,
            minutes:0,
            description:'',
            link:'',
        }
    }
    
    addEvent(hours,minutes){
        // // console.log(hours + ':' + minutes);
        
        if(this.state.day !== '' && this.state.title !== '' && this.state.hours !== 0){
            db.collection(this.state.day).doc(this.state.title).set({
                'title':this.state.title,
                'description':this.state.description,
                'time':this.state.hours + ':' + this.state.minutes,
                'link':this.state.link
            })

            alert('Event added!');

            this.setState({
                title:'',
                hours:0,
                minutes:0,
                description:'',
                link:'',
            })
        }else{
            alert('Please enter the title and time for your event!');
        }
        
        // console.log(this.state.day);
        // console.log(this.state.title);
        // console.log(this.state.hours);
        // console.log(this.state.minutes);
        // console.log(this.state.description);
        // console.log(this.state.link);
    

    }
    
    componentDidMount(){
        var day = this.props.navigation.getParam('day');
        
        // console.log(day);

        this.setState({
            day:day
        })
    }

    render(){
        return(
            <SafeAreaProvider style={{flex:1}}>
                <MyHeader title='Schedule App'/>
                
                <View style={styles.container}>
                    <Picker
                    selectedValue={this.state.day}
                    style={{ height: 75, width: 350,marginVertical:15}}
                    onValueChange={async(value) => {
                        // console.log(value);
                        await this.setState({
                            day:value
                        })
                    }}>
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>

                    <TextInput placeholder={'Title'}
                    value={this.state.title}
                    style={styles.textBox}
                    onChangeText={(text) => {
                        this.setState({
                            title:text
                        })
                    }}/>

                    <TextInput placeholder={'Description'}
                    value={this.state.description}
                    style={styles.textBox}
                    onChangeText={(text) => {
                        this.setState({
                            description:text
                        })
                    }}/>

                    <TextInput placeholder={'Link(Optional)'}
                    value={this.state.link}
                    style={styles.textBox}
                    onChangeText={(text) => {
                        this.setState({
                            link:text
                        })
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

                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.addEvent(this.state.hours,this.state.minutes);
                    }}>
                        <Text style={{fontWeight:'bold',color:'#444444',fontSize:24}}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('ViewingScreen',{'day':this.state.day});
                    }}>
                        <Text style={{fontWeight:'bold',color:'#444444',fontSize:22}}>View Schedule</Text>
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
        width:250,
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
  