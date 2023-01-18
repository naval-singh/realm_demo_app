import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Keyboard, TextInput, StatusBar} from 'react-native';
import {Todo} from './models/Todo';
import {Task} from './models/Task';
import RealmContext from './models';
const {RealmProvider, useRealm, useQuery} = RealmContext;

const Header = ({username, handleLogout}) => {
  return (
    <View style={s.header}>
      <Text style={s.headerTitle}>Hi, {username}</Text>
      <Button title={'logout'} onPress={handleLogout} />
    </View>
  );
};

const Home = ({username, handleLogout}) => {
  const realm = useRealm();
  const realmTodos = useQuery(Todo);
  const realmTasks = useQuery(Task);
  const [text, setText] = useState('');
  console.log(realmTodos);
  console.log(realmTasks);

  const addTodo = text => {
    realm.write(() => {
      realm.create('Todo', Todo.generate(text));
    });
  };

  const addTask = text => {
    realm.write(() => {
      realm.create('Task', Task.generate(text));
    });
  };

  const deleteObject = obj => {
    realm.write(() => {
      realm.delete(obj);
    });
  };

  const handleAddTodo = () => {
    addTodo(text);
    Keyboard.dismiss();
    setText('');
  };

  const handleAddTask = () => {
    addTask(text);
    Keyboard.dismiss();
    setText('');
  };

  const handleUpdate = t => {
    console.log('clicked');
    realm.write(() => {
      t.isComplete = !t.isComplete;
    });
  };

  return (
    <View style={s.container}>
      <Header username={username} handleLogout={handleLogout} />
      <View style={s.homeContainer}>
        <View style={s.todoList}>
          {realmTodos?.map((t, key) => (
            <View key={key} style={s.todoContainer}>
              <Text style={s.todo}>{t.desc}</Text>
              <Text style={s.delete} onPress={() => deleteObject(t)}>
                x
              </Text>
            </View>
          ))}
        </View>
        <View style={s.todoList}>
          {realmTasks?.map((t, key) => (
            <View key={key} style={s.todoContainer}>
              <Text
                onPress={() => handleUpdate(t)}
                style={[s.todo, {color: t.isComplete ? 'green' : 'red'}]}>
                {t.desc}
              </Text>
              <Text style={s.delete} onPress={() => deleteObject(t)}>
                x
              </Text>
            </View>
          ))}
        </View>
        <View style={{height: 80, justifyContent: 'space-between'}}>
          <TextInput
            style={[s.input, {marginLeft: 10}]}
            value={text}
            onChangeText={setText}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <Button title={'Add Todo'} onPress={handleAddTodo} />
            <Button title={'Add Task'} onPress={handleAddTask} />
          </View>
        </View>
      </View>
    </View>
  );
};

const Login = ({handleLogin}) => {
  const [text, setText] = useState('');
  return (
    <View style={s.container}>
      <View style={s.loginContainer}>
        <TextInput style={s.input} onChangeText={setText} />
        <Button title={'login'} onPress={() => handleLogin(text)} />
      </View>
    </View>
  );
};

const App = () => {
  const [username, setUsername] = useState('');
  const handleLogin = async text => {
    setUsername(text);
  };

  const handleLogout = () => {
    setUsername('');
  };

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={'cyan'} barStyle={'dark-content'} />
      {username ? (
        <RealmProvider>
          <Home username={username} handleLogout={handleLogout} />
        </RealmProvider>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
  loginContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    flex: 1,
    paddingVertical: 0,
    marginRight: 10,
    color: '#000',
    borderRadius: 5,
    fontSize: 18,
  },
  homeContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  todoList: {
    paddingHorizontal: 10,
  },
  todoContainer: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    elevation: 5,
  },
  todo: {
    fontSize: 18,
    color: '#000',
  },
  delete: {
    fontSize: 30,
    lineHeight: 25,
    height: '80%',
    width: 30,
    borderRadius: 5,
    backgroundColor: 'red',
    paddingVertical: 9,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default App;
