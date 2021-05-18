import React from 'react';
import { StyleSheet, Text, View, Picker, Alert, FlatList, Button, MaskedViewComponent} from 'react-native';
import {MyHeader} from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import db from '../config';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Hyperlink from 'react-native-hyperlink'

export default class ViewingScreen extends React.Component{

    constructor(){
        super();
        this.state = {
           day:'Monday',
           isFlatlistVisible:false,
           eventsList:[],
           displayText:'',
           isViewDisabled:false,
        }
    }

    async getEvents(day){
        
        db.collection(day).get().then((snapshot) => {
            
            if(snapshot.docs.length === 0){
                this.setState({
                    isFlatlistVisible:false,
                    displayText:'You have not scheduled any events for ' + this.state.day
                })
            }
            
            snapshot.forEach((doc) => {
                
                this.setState({
                    eventsList:[...this.state.eventsList,doc.data()],
                    isFlatlistVisible:true
                })
            })
        })
    }

    redirectToUrl(url){
        window.open(url, '_blank');
    }

    deleteEvent(day,title){
        db.collection(day).doc(title).delete();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, i}) => {
        var info = [item.title,item.description,item.time,item.link, this.state.day]
        return(
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'blue'},{marginVertical:25}]}
                onPress={() => this.props.navigation.navigate('RedirectScreen',{'item':info})}>
                    <Text style={[styles.text,{color:'white'},{fontSize:18}]}>{item.title}</Text>
                </TouchableOpacity>
                <Icon name='bars' type='font-awesome' style={{marginVertical:35,marginHorizontal:30}}
                onPress={ () => {
                    this.checkTime();
                    // Alert.alert(
                    //     'Delete?',
                    //     'Do you want to delete this event?',
                    //     [
                    //         {
                    //             text:'Cancel',
                    //             onPress:() => alert('Event has not been deleted!'),
                    //             style:'cancel'
                    //         },
                    //         {
                    //             text:'Confirm',
                    //             onPress:async() => {
                    //                 this.deleteEvent(this.state.day,item.title);
                    //                 alert('Event deleted');
                    //                 await this.setState({
                    //                     eventsList:[]
                    //                 })
                    //                 this.getEvents(this.state.day);
                    //             },
                    //             style:'default'
                    //         }
                    //     ]
                    // );
                }}/>
            </View>
        );
    }    

    componentDidMount(){

        var day = this.props.navigation.getParam('day');
        
        if(this.props.navigation.getParam('isVisible') === true){
            this.setState({
                isFlatlistVisible:true
            })
        }else{
            this.setState({
                isFlatlistVisible:false
            })
        }
        this.setState({
            displayText:'Loading...'
        })
        
        if(day === undefined){
            this.getEvents(this.state.day);
        }else{
            this.setState({
                day:day
            });
            this.getEvents(day);

        }
        this.checkTime();
    }

    checkTime(){
    var date = new Date;
    date.setDate(date.getDate());
    date.setHours(9, 0);


    if(date.getMinutes() === 0){
        date = date.getHours() + ':' + '00';
    }



    this.state.eventsList.map((item) => {
        var item = item

        var time = item.time.split(':');

        if(time[1] === 0){
            alert('YO');
        }else{
            time = time[0] + ':' + '00'

        }
        
        if(item.link !== '' && time === date){
            this.redirectToUrl('https://' + item.link);
        }else{
            alert('Did Not Work');
        }
    })

    // if(){

    // }

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
                        await this.setState({
                            day:value,
                            displayText:'Loading...',
                            eventsList:[],
                            isFlatlistVisible:false
                        })

                        this.getEvents(this.state.day);
                    }}>
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>

                    {this.state.isFlatlistVisible === true
                        ?(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.eventsList}
                            renderItem={this.renderItem}/>
                        )
                        :(
                            <Text style={styles.text}>{this.state.displayText}</Text>
                        )
                    }
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('ScheduleScreen',{'day':this.state.day});
                    }}>
                        <Text style={{fontWeight:'bold',color:'#444444',fontSize:24}}>Plan Schedule</Text>
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
        fontSize:20,
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
  