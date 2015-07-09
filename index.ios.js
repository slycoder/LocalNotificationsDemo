/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var LocalNotificationsDemo = React.createClass({
  getInitialState: function() {
    return {
      message: 'Welcome!',
    };
  },
  componentWillMount: function() {
    PushNotificationIOS.addEventListener('local_notification', this._onNotification);
  },
  componentWillUnmount: function() {
    PushNotificationIOS.removeEventListener('local_notification', this._onNotification);
  },
  _onNotification: function(notification) {
    this.setState({
      message: notification.getData().message,
    });
  },
  doPress: function(newLabel) {
    var notificationTime = new Date();
    // 10 seconds later...
    notificationTime.setTime(notificationTime.getTime() + 10 * 1000);
    PushNotificationIOS.scheduleLocalNotification({
      fireDate: notificationTime,
      alertBody: 'Test: ' + newLabel,
      userInfo: {
        message: newLabel,
      },
    });
  },
  render: function() {
    var buttons = [
      'foo',
      'bar',
      'baz',
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.message}
        </Text>
        {buttons.map((button) => (
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.doPress(button)}>
            <Text style={styles.button} key={button}>
              {button}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
  button: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

AppRegistry.registerComponent('LocalNotificationsDemo', () => LocalNotificationsDemo);
