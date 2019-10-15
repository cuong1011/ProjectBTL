import React,{Component} from 'react';
      import {
          View,
          Text,
          StyleSheet,
          TextInput,
          TouchableHighlight,
          TouchableOpacity
      } from 'react-native';
      import {loginUserServer,insertUserServer} from '../networking/server'; 
      export default class Login extends React.Component{
          constructor(){
              super();
              this.state = {
                  username: "",
                  pass: "",
                  checkFail: "",
              };
          }
          changeTextUsername = (username)=>{
              this.setState({
                  username: username,
                  checkFail: "",
              });
          }
          changeTextPassWord = (pass)=>{
              this.setState({
                  pass: pass,
                  checkFail: "",
              });
          }
          clickLogin = ()=>{
              if(this.state.username == "" || this.state.pass == ""){
                  this.setState({
                      checkFail: "Bạn không được bỏ trống",
                  })
              }else{
                  if(this.props.navigation.getParam("type") == "login"){
                       loginUserServer(this.state.username,this.state.pass).then((User)=>{
                      if(User.status == "fail"){
                          this.setState({
                              checkFail: "Bạn đã nhập sai tài khoản hoặc mật khẩu",
                          })
                      }else{
                        //   const auth = {
                        //       "id": User.data._id,
                        //       "level": User.data.level,
                        //   };
                        //   alert(User.data._id);
                          this.props.navigation.navigate("UserList");
                      }
                  })
                  }else{
                    const User = {
                        username: this.state.username,
                        pwd: this.state.pass,
                    };
                    insertUserServer(User).then((result)=>{
                        if(result == "ok"){
                            this.props.navigation.navigate("UserList");
                        }else{
                            this.setState({
                                checkFail: "Lỗi không thể tạo tài khoản",
                            });
                        }
                    })
                  }
              }
          }
          render(){
              return(
                  <View style={styles.container}>
                      <Text style={styles.textLogin}>{this.props.navigation.getParam('type') == "signin"?" Đăng ký": "Đăng nhập"}</Text>
                      <TextInput placeholder="Tài khoản" style={styles.textInput} onChangeText={(text)=>this.changeTextUsername(text)}/>
                      <TextInput secureTextEntry={true} placeholder="Mật khẩu" style={styles.textInput} onChangeText={(text)=>this.changeTextPassWord(text)}/>
                      <TouchableOpacity style={styles.btnLogin} onPress={this.clickLogin}>
                          <Text style={styles.textBtnLogin}>{this.props.navigation.getParam('type') == "signin"? "Đăng ký": "Đăng nhập"}</Text>
                      </TouchableOpacity>
                      <Text style={styles.checkFail}>{this.state.checkFail}</Text>
                  </View>
              )
          }
      }
      const styles = StyleSheet.create({
          textLogin:{
              color: "#0390C9",
              fontSize: 20,
              fontWeight: "bold",
          },  
          container:{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF",
          },
          textInput:{
              borderColor: "#84d4f4",
              width: 200,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              margin: 10,
              color: "#0390C9",
              backgroundColor: "#E6E6E6",
          },
          btnLogin:{
              backgroundColor: "#078FC9",
              width: 100,
              justifyContent: "center",
              height: 40,
              borderRadius: 10,
          },
          textBtnLogin:{
              color: "#FFF",
              textAlign: "center",
          },
          checkFail:{
              color: 'red',
              marginTop: 10,
          }
      });