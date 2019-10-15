import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
export default class DetailUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  componentDidMount(){
    this.setState({
      username: this.props.navigation.getParam("item").username,
      password: this.props.navigation.getParam("item").pwd,
    })
  }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: "center", backgroundColor: "#1bd65d"}}>
          <Text>Chi Tiết User</Text>
            <Image style={{height: 80, width: 80,borderRadius: 100,marginTop: 5,marginLeft: 10,}} source={{uri: 'http://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/10/02/ngoctrinh89697725435800155392038828600891602293127371n-15699386356261194744823.jpg'}}/>
            <Text style={{color: "#FFF"}}>{this.state.username}</Text>
            <Text style={{color: "#FFF"}}>{this.state.password}</Text>
        </View>
      );
    }
  }