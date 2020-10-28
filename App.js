import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

class ChatScreen extends React.Component {
  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text>Chat with {this.props.route.params.name}</Text>
      </View>
    );
  }
}

class ChatsListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={[ {name: "Person1", key: "1"}, {name: "Person2", key: "2"}]}
          renderItem={(data) => {
            return (
              <View key={data.item.key} style={{ margin: 10 }}>
                <Button
                  title={data.item.name}
                  onPress={() => this.props.navigation.navigate("Chat", { name: data.item.name })}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const ChatsStack = createStackNavigator();

class ChatsScreenStack extends React.Component {
  constructor(props) {
    super(props);

    if (props.route && props.route.params && props.route.params.name) {
      this.pendingReroute = props.route.params.name;
    }
  }

  componentDidMount() {
    if (this.pendingReroute) {
      this.props.navigation.navigate("Chat", { name: this.pendingReroute });
    }
  }

  componentDidUpdate(prevProps) {
    let updated = false;
    if (this.props.route && this.props.route.params.name) {
      updated = true;
      if (prevProps.route && prevProps.route.params && prevProps.route.params.name == this.props.route.params.name) {
        updated = false;
      }
    }
    if (updated) {
      this.props.navigation.navigate("Chat", { name: this.props.route.params.name });
    }
  }

  render() {
    return (
      <ChatsStack.Navigator>
        <ChatsStack.Screen name="Chats" component={ChatsListScreen} />
        <ChatsStack.Screen name="Chat" component={ChatScreen} />
      </ChatsStack.Navigator>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Navigate to Person2"
          onPress={() => this.props.navigation.navigate("ChatsTab", { name: "Person2" })}
        />
      </View>
    );
  }
}

const Tabs = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="HomeTab" component={HomeScreen} />
          <Tabs.Screen name="ChatsTab" component={ChatsScreenStack} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}
