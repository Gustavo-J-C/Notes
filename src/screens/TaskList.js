import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Text
} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome'

import Task from '../components/Task'

import { useApi } from '../api'
import Header from '../components/Header';


export default props => {

    const [fetching, setFetching] = useState(true)
    const api = useApi();


    useEffect(() => {
        async function fetch() {
            const data = await api.getTasks()
            api.setListTask(data)
            setFetching(false)
        }
        fetch()
    }, [])

    const getAdd = () => {
        props.navigation.navigate('Add')
    }


    return (
        <SafeAreaView style={styles.container}>

            <Header />
            {fetching &&
                <View style={styles.fetchArea}>
                    <Text style={styles.fetching}>Carregando notas</Text>
                </View>
            }
            <View style={styles.taskList}>
                {api.listTask.length > 0 && <FlatList data={api.filteredList.length < 0 ? api.listTask : api.filteredList}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} />} />
                }

            </View>
            {api.deletionMode ?
                <TouchableOpacity onPress={api.deleteTask}
                    style={styles.addButton}
                    activeOpacity={0.7}>
                    <Icon name="trash" size={25}
                        color={'#fff'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={getAdd}
                    style={styles.addButton}
                    activeOpacity={0.7}>
                    <Icon name="plus" size={20}
                        color={'#fff'} />
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#252525',
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        backgroundColor: '#252525',
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    fetchArea: {
        // backgroundColor: 'red',
        marginBottom: 15,
        justifyContent: 'center'
    },
    fetching: {
        fontSize: 15,
        color: "#fff",
        fontWeight: '200',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontSize: 43,
        fontSize: 50,
        color: "#fff",
        marginTop: 47,
        marginLeft: 24
    },
    subtitle: {
        color: "#B13B44",
        fontSize: 20,
        marginBottom: 30,
        marginLeft: 20
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 40,
        justifyContent: 'flex-end'
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#B13B44",
        justifyContent: 'center',
        alignItems: 'center'
    }
})