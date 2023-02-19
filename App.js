import { StatusBar, StyleSheet, View } from 'react-native';
import { MyProvider } from './src/api';
import 'react-native-gesture-handler'
import TaskList from './src/screens/TaskList'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditTask from './src/screens/EditTask';
import AddTask from './src/screens/AddTask';
import Preview from './src/screens/Preview';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';
import Login from './src/screens/login';
import Signup from './src/screens/signup';


export default function App() {

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();


  function DrawerContent() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TaskList} 
          options={{headerShown: false}}/>
        <Drawer.Screen name="Feed" component={Login}
          options={{headerShown: false}} />
        <Drawer.Screen name="Messages" component={Signup}
          options={{headerShown: false}} />
      </Drawer.Navigator>
    );
  }

  return (
    <MyProvider>
      <View style={{ flex: 1, backgroundColor: '#252525' }}>
        <NavigationContainer style={styles.container}>
          <StatusBar
            backgroundColor={'#252525'}
          />
          <Stack.Navigator >
            <Stack.Screen name="Home"
              options={{ headerShown: false }}
              component={DrawerContent} />
            <Stack.Screen name="Edit"
              options={{ headerShown: false, }}
              component={EditTask} />
            <Stack.Screen name="Add"
              options={{ headerShown: false }}
              component={AddTask} />
            <Stack.Screen name="Preview"
              options={{ headerShown: false }}
              component={Preview} />
          </Stack.Navigator>
          {/* <TaskList /> */}
        </NavigationContainer>
      </View>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
