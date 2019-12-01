import React,{Component} from 'react'
import {View, Text,FlatList,ActivityIndicator,TouchableOpacity,Alert} from 'react-native'
import {ThemeProvider,ListItem,Card} from 'react-native-elements'

import Firebase from './Firebase'

import Myheader from './Myheader'
import Icon  from 'react-native-vector-icons/FontAwesome5'

class Students extends Component{
    render(){
        return(
            <View>
                <ListItem
                title={this.props.name}
                subtitle={this.props.email}
                rightSubtitle={this.props.address}
                rightIcon={
                    <TouchableOpacity onPress={()=>{this.props.dData()}}>
                        <Text>
                            <Icon name="trash" color="black" size={16}></Icon>
                        </Text>
                    </TouchableOpacity>
                }
                bottomDivider
                ></ListItem>
            </View>
        )
    }
}

export default class Showdata extends Component{
constructor(props){
    super(props)
    this.state=({
        students:[],
        showLoading:false
    })
}
confirmDelete(id){
   // alert(id)
   Firebase.database().ref("students/"+id).remove()
   .then((res)=>{
       this.fetchStudents();
   })
   .catch((err)=>{

   })
}
deleteData(id){
    //alert(id)
    Alert.alert(
        "Confrim",
        "The Selected student will delete permanently.",
        [
            {text:"No",style:"cancel"},
            {text:"Yes",style:"destructive" ,onPress:()=>this.confirmDelete(id)}
        ]
    )
}
componentDidMount=()=>{
    this.fetchStudents();
    this.setState({showLoading:true})
}
fetchStudents=()=>{
    this.setState({showLoading:true})
    Firebase.database().ref("students").once("value")
    .then((res)=>{
        this.setState({showLoading:false})
        //console.log(res.val)
        const d=res.val();
        const stus=[];
        for(s in d){
            //console.log(d[s].name)
            let stu={
                id:s,
                name:d[s].name,
                email:d[s].email,
                address:d[s].address,
                }
                stus.unshift(stu)
        }
        //console.log(stus)
        this.setState({students:stus})
    })
    .catch((err)=>{
        console.log(err)
    })
}

    render(){
        return(
            <ThemeProvider>
                <Myheader center="Show Data"></Myheader>
                {
                    this.state.showLoading && (
                        <ActivityIndicator
                    color="royalblue"
                    size={20}
                    ></ActivityIndicator>
                    )
                }
                <View>
                    <FlatList
                    refreshing={this.state.showLoading}
                    onRefresh={()=>this.fetchStudents()}
                    keyExtractor={(s)=>s.id.toString()}
                    data={this.state.students}
                    renderItem={(s)=>{
                        //console.log(s)
                        return(
                        <Students
                        dData={()=>this.deleteData(s.item.id)}
                        name={s.item.name}
                        email={s.item.email}
                        address={s.item.address}
                        ></Students>
                        )
                    }}
                    />
                </View>
            </ThemeProvider>
        )
    }
}