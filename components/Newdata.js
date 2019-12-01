import React,{Component} from 'react'
import {View, Text,TextInput,ActivityIndicator, Button, StyleSheet} from 'react-native'
import {ThemeProvider} from 'react-native-elements'

import Firebase from './Firebase'

import Myheader from './Myheader'

export default class Newdata extends Component{
    constructor(props){
        super(props)
        this.state=({
            name:'',
            email:'',
            address:'',

            showError:false,
            error:'',
            showMessage:false,
            message:'',

            showLoading:false
            
        })
        this.emailRef=React.createRef();
        this.addressRef=React.createRef();
    }

    clearError=()=>{
        setTimeout(()=>{
            this.setState({error:"",showError:false,message:"",showMessage:false})
        },2000)
    }

    saveData(){
        if(this.state.name.length <=0){
            this.setState({showError:true,error:'The name field is required.'})
            this.clearError()
            return;
        }
        if(this.state.email.length <=0){
            this.setState({showError:true,error:'The email field is required.'})
            this.clearError()
            return;
        }
        if(this.state.address.length <=0){
            this.setState({showError:true,error:'The address field is required.'})
            this.clearError() 
            return;
        }
        this.setState({showLoading:true})

        const stu={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address
        }
        Firebase.database().ref("students").push(stu)
        .then((res)=>{
            this.setState({showLoading:false})
            this.setState({
                name:'',
                email:'',
                address:'',
                showMessage:true,
                message:"The user have been created."
            })
            this.clearError()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <ThemeProvider>
                <Myheader center="Add New Data"></Myheader>
                {
                    this.state.showError && (
                    <View style={styles.errorBody}>
                        <Text style={styles.errorText}>{this.state.error}</Text>
                    </View>
                    )
                }
                {
                    this.state.showMessage && (
                    <View style={styles.messageBody}>
                        <Text style={styles.messageText}>{this.state.message}</Text>
                    </View>
                    )
                }
                {
                    this.state.showLoading && (
                        <ActivityIndicator
                        color="royalblue"
                        size={50}
                        >
                        </ActivityIndicator>
                    )
                }
                <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text>Name</Text>
                    <TextInput
                    onSubmitEditing={()=>this.emailRef.current.focus()}
                    style={styles.formControl}
                    onChangeText={(t)=>this.setState({name : t})}
                    value={this.state.name}
                    returnKeyType="next"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text>Email</Text>
                    <TextInput
                    ref={this.emailRef}
                    onSubmitEditing={()=>this.addressRef.current.focus()}
                    style={styles.formControl}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(t)=>this.setState({email : t})}
                    value={this.state.email}
                    returnKeyType="next"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text>Address</Text>
                    <TextInput
                    ref={this.addressRef}
                    multiline={true}
                    style={styles.formControl}
                    onChangeText={(t)=>this.setState({address : t})}
                    value={this.state.address}
                    returnKeyType="done"
                    onSubmitEditing={()=>this.saveData()}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Button title="save" onPress={()=>this.saveData()}></Button>
                </View>
                </View>
            </ThemeProvider>
        )
    }
}

const styles=StyleSheet.create({
    formContainer:{
        padding:40
    },
    formGroup:{
        marginBottom:20
    },
    formControl:{
        borderBottomColor:"#000",
        borderBottomWidth:1
    },
    errorBody:{
        borderColor:'red',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff',
        padding:10,
        margin:10
    },
    errorText:{
        color:"red"
    },
    messageBody:{
        borderColor:'green',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff',
        padding:10,
        margin:10
    },
    messageText:{
        color:"green"
    }
})