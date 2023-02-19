import { createContext, useContext, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";


const MyContext = createContext(null);

export const MyProvider = ({ children }) => {


    const initialState = {
        id: '',
        desc: null,
        doneAt: '',
        estimateAt: new Date(),
        showDatePicker: false
    }
    const [deletionMode, setDeletionMode] = useState(false)
    const [selecteds, setSelecteds] = useState([])
    const [listTask, setListTask] = useState([]);
    const [filter, setFilter] = useState('')

    const filteredList = listTask?.filter(e => e.title.toUpperCase().includes(filter.toUpperCase()))

    const addSelected = (id) => {        
        setSelecteds([...selecteds, id])
        console.log('array depois de adicionar: ',selecteds, selecteds.length);
    }

    const removeSelected = (id) => {
        console.log('array antes: ', selecteds);
        selecteds.length > 1 ?
        setSelecteds(selecteds.splice(selecteds.indexOf(id), 1))
        :
        setSelecteds((prev) => ([]))
        console.log('array depois: ',selecteds, selecteds.length);
    }

    const cancelDeletionMode = () => {
        setSelecteds([])
        setDeletionMode(false)
    }

    const deleteTask = async () => {
        const tasks = listTask.filter(element => !selecteds.find(e => element.id === e))
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
        setListTask(tasks)
        setSelecteds([])
        setDeletionMode(false)
    }

    async function getTasks() {
        try {
            const value = await AsyncStorage.getItem('tasks')
            if (value === null) {
                return []
            } else {
                return JSON.parse(value)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addTask(newTask) {
        if (!newTask.desc || !newTask.desc.trim() || !newTask.title || !newTask.title.trim() ) {
            Alert.alert('Dados invalidos', 'Favor informar uma descrição')
            return false
        }

        
        const data = await getTasks()
        data.push({
            id: Math.random(),
            desc: newTask.desc,
            title: newTask.title,
            createdAt: newTask.createdAt,
            color: newTask.color
        })
        await AsyncStorage.setItem('tasks', JSON.stringify(data))
        setListTask(data)
        return true
    }
    
    const editTask = async (updatedTask) => {
        let tasks = await getTasks()
        
        if (!updatedTask.desc || !updatedTask.desc.trim()) {
            Alert.alert('Dados invalidos', 'Favor informar uma descrição')
            return
        }
        if (!updatedTask.title || !updatedTask.title.trim()) {
            Alert.alert('Dados invalidos', 'Favor informar um titulo')
            return
        }
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === updatedTask.id) {
                console.log('entrou no if')
                tasks[i].desc = updatedTask.desc
                tasks[i].title = updatedTask.title
                tasks[i].color = updatedTask.color
            }
        }

        console.log(updatedTask);
        console.log(tasks);
        setListTask(tasks)
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    }

    return (
        <MyContext.Provider value={{
            listTask,
            filteredList,
            selecteds,
            deletionMode,
            addSelected,
            removeSelected,
            setDeletionMode,
            cancelDeletionMode,
            setFilter,
            deleteTask,
            setListTask,
            addTask,
            editTask,
            addTask,
            getTasks
        }}>
            {children}
        </MyContext.Provider>
    )
}

export const useApi = () => {
    return useContext(MyContext);
}