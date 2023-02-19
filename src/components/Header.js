import React, { useRef, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useApi } from "../api";

export default function SearchBar() {
    const api = useApi();

    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');

    const open = () => {
        setTyping(true);
    }

    const close = () => {
        setTyping(false)
        setInput('')
    }

    const searchNotes = (e) => {
        setInput((prev) => (e))
        api.setFilter(e)
    }

    const SelectionText = () => {
        const size = api.selecteds.length
        if (size === 0) {
            return <Text style={styles.deletionText}>Selecinar itens</Text>
        } else if (size === 1) {
            return <Text style={styles.deletionText}>1 item selecionado</Text>
        } else {
            return <Text style={styles.deletionText}>{size} itens selecionados</Text>
        }
    }


    return (
        <View style={styles.container}>
            {api.deletionMode ?
                <View style={styles.deletionArea}>
                    <SelectionText />
                    <Icon style={styles.deletionIcon} onPress={api.cancelDeletionMode} name="close" size={25} color="#fff" />
                </View>
                :
                <View style={styles.searchArea}>
                    <Text style={styles.title}>Notas</Text>
                    {!typing &&
                        <Icon name="search" style={styles.search} onPress={open} size={15} color="#FFF" />
                    }
                </View>
            }
            {typing &&
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquise sua nota"
                        autoFocus={true}
                        placeholderTextColor="#ccc"
                        value={input}
                        onChangeText={e => searchNotes(e)}
                    />
                    <Icon onPress={close} style={styles.close} name="close" size={15} color="#CCC" />
                </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        //   alignItems: 'center',
        marginTop: 30,
        marginBottom: 15

    },
    deletionArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20
    },
    deletionIcon: {
        marginRight: 25
    },
    deletionText: {
        marginLeft: 20,
        color: '#fff',
        fontSize: 25,
    },
    input: {
        width: '85%',
        paddingLeft: 15,
        backgroundColor: '#3B3B3B',
        color: '#fff',
        height: 40,
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    close: {
        backgroundColor: '#3B3B3B',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingRight: 20,
        lineHeight: 40
    },
    searchArea: {
        backgroundColor: '#252525',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    search: {
        backgroundColor: '#3B3B3B',
        borderRadius: 50,
        padding: 15,
        marginRight: 20
    },
    inputArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        // fontFamily: 'Nunito',
        fontWeight: '600',
        // fontSize: 43,
        fontSize: 50,
        color: '#fff',
        marginBottom: 10,
        marginLeft: 28
    },
})