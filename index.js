/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry, View, Text,AsyncStorage} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import UserList from './components/UserList';
import Login from './components/Login';
import DetailUser from './components/DetailUser';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
const Stack =  createStackNavigator({
    App:{
        screen: App,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    UserList:{
        screen: UserList,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    Login:{
        screen: Login,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    DetailUser: {
        screen: DetailUser,
    }
    
},{
    initialRouteName: "App",
}); 
const MyApp = createAppContainer(Stack);                                             
AppRegistry.registerComponent(appName, ()=> MyApp);