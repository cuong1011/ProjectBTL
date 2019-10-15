import React,{Component} from 'react';
import {View} from 'react-native';
async function loginUserServer(username,pwd){
    const login_User = "http://10.0.3.2:3005/login_user?username="+username+"&pwd="+pwd;
    try{
        let response = await fetch(login_User);
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(err);
    }
}
async function getAllUserServer(){
    const get_all_user = "http://10.0.3.2:3005/get_all_user";
    try{
        const response = await fetch(get_all_user);
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(err);
    }
}
async function insertUserServer(params){
    const insert_new_user = "http://10.0.3.2:3005/insert_new_user";
    try{
        const response = await fetch(insert_new_user,{
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        let responseJson = await response.json();
        return responseJson.status;
    }catch(err){
        console.log(err);
    }
}
module.exports = {loginUserServer,getAllUserServer,insertUserServer};