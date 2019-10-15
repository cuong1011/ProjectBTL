import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {getAllUserServer} from '../networking/server';
class ContentFlatList extends Component{
  render(){
    return(
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("DetailUser",{item: this.props.item})}>
        <View style={{flex: 1,flexDirection: "row",backgroundColor: "#23ce67", height: 50, width: 300,margin: 5,borderRadius: 10,}}>
        <Image style={{height: 30, width: 30,borderRadius: 100,marginTop: 5,marginLeft: 10,}} source={{uri: 'http://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/10/02/ngoctrinh89697725435800155392038828600891602293127371n-15699386356261194744823.jpg'}}/>
        <View style={{marginLeft: 40}}>
        <Text style={{color: "#FFF"}}>{this.props.item.username}</Text>
        <Text style={{color: "#FFF"}}>{this.props.item.pwd}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}
export default class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      userFromServer: [],
    };
  }
  componentDidMount(){
    this.loadListFromSerVer();
  }
  loadListFromSerVer  = ()=>{
    getAllUserServer().then((data)=>{
      this.setState({
        userFromServer: data,
      });
    }).catch((err)=>{
      console.log(`loi la ${err}`);
    })
  }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("App")} style={{backgroundColor: 'tomato',height: 60, width: 100,position: "absolute",right: 10, top: 10,borderRadius: 10,justifyContent:"center"}}>
            <Text style={{color: "#FFF",textAlign: "center"}}>Đăng Xuất</Text>
          </TouchableOpacity>
          <FlatList
          style={{marginTop: 100,}}
            data={this.state.userFromServer.data}
            renderItem ={({item,index})=>{
              return(
                <View>
                  <ContentFlatList navigation={this.props.navigation} parentFlatlist={this} item={item} keyy={item._id}/>
                </View>
              )
            }}
            keyExtractor={(item,index)=>item._id}
          />
        </View>
      );
    }
  }