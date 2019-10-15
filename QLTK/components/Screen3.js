import React,{Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import IconMenu from './buttonMenu';
export default class SettingsScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <IconMenu navigation={this.props.navigation}/>
          <Text>Screen3</Text>
        </View>
      );
    }
  }