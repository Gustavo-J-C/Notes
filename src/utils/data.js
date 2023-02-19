import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

let editModal = false;

async function getTasks(cb) {
    try {
        const value = await AsyncStorage.getItem('tasks')
        if (typeof value === null) {
            cb([])
        } else {
            cb(JSON.parse(value))
        }
    } catch (error) {
        console.log(error);
    }
}

async function addTask (newTask) {
    if (!newTask.desc || !newTask.desc.trim()) {
        Alert.alert('Dados invalidos', 'descrição não informada')
        return
    }

    let list = [];
    getTasks(async (data) => {
        list = data
        list.push({
            desc: newTask.desc,
            id: Math.random(),
            estimateAt: newTask.date,
            doneAt: null
        })
        await AsyncStorage.setItem('tasks', JSON.stringify(list))
    });
}

let editInfos = {
    id: '',
    desc: '',
    doneAt: '',
    estimateAt: new Date()
}

const datas = {
    editModal: editModal,
    addTask: addTask ,
    editDatas: async (payload, id) => {
        if (payload === 'set') {
            getTasks(t => editInfos = {...t.filter(t => t.id === id)})
        } else {
            return editInfos;
        }
    },
    editTask: async (updatedTask) => {
        const tasks = []; 
        getTasks(t => tasks.push([...t.filter(t => t.id !== updatedTask.id)]));
        
        if (!updatedTask.desc || !updatedTask.desc.trim()) {
            Alert.alert('Dados invalidos', 'Favor informar uma descrição')
            return
        }

        tasks.push(updatedTask)

        await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
        return tasks
    },
    getTasks: getTasks
}

export default datas;