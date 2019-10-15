import React from 'react';
import{
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
export default class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
          <Text>Xin chào các bạn</Text>
          <View style={styles.viewContain}>
            <TouchableOpacity style={styles.btnOption} onPress={()=>this.props.navigation.navigate("Login",{type: "signin"})}>
              <Text style={styles.textBtn}>Đăng Ký</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOptionLogin} onPress={()=>this.props.navigation.navigate("Login",{type: "login"})}>
              <Text style={styles.textBtn}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  viewContain:{
    flexDirection: "row",
  },
  btnOption:{
    height: 40,
    width: 100,
    margin: 30,
    backgroundColor: 'tomato',
    justifyContent: "center",
    borderRadius: 10,
  },
  btnOptionLogin:{
    height: 40,
    width: 100,
    margin: 30,
    backgroundColor: '#3dbf3b',
    justifyContent: "center",
    borderRadius: 10,
  },
  textBtn:{
    
    textAlign: "center",
    color: "#FFF",
  }
});