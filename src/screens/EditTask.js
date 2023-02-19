import React, { useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useApi } from '../api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default props => {
    const params = props.route.params
    const {color, id} = params
    const [editMode, setEditMode] = useState(false)
    const [desc, setDesc] = useState(params.desc)
    const [title, setTitle] = useState(params.title);
    const areaRef = useRef(false)

    const api = useApi();

    const close = () => {
        props.navigation.navigate('Home')
    }

    const save = () => {
        api.editTask({title, desc, color, id})
        props.navigation.goBack();
    }

    const reset = () => {
        setDesc('')
        setTitle('')
    }

    const handleInputFocus = () => {
        setTimeout(() => areaRef.current?.scrollToEnd({ animated: true }), 200)
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            ref={areaRef}
        >
            <View style={styles.buttons}>
                <TouchableOpacity onPress={close} style={styles.button}>
                    <Icon name="arrow-left" size={20} color={'#fff'} />
                </TouchableOpacity>
                {editMode ?
                    <TouchableOpacity
                        onPress={save}
                        style={styles.button}>
                        <Icon name="save" size={25} color={'#fff'} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setEditMode(true)} style={styles.button}>
                        <Icon name="pencil" size={20} color={'#fff'} />
                    </TouchableOpacity>
                }

            </View>
            <ScrollView style={styles.inputArea}>
                <View>

                    <TextInput
                        style={styles.titleInput}
                        value={title}
                        onChangeText={e => setTitle(e)}
                        placeholder="Titulo"
                        editable={editMode}
                        multiline
                        placeholderTextColor='#9A9A9A'
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="Informe a descrição..."
                        placeholderTextColor='#9A9A9A'
                        editable={editMode}
                        scrollEnabled={true}
                        onFocus={handleInputFocus}
                        multiline
                        value={desc}
                        style={styles.descInput}
                        onChangeText={e => setDesc(e)} />

                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#252525',
        paddingLeft: 15,
    },
    header: {
        backgroundColor: commonStyles.colors.today,
        textAlign: 'center',
        padding: 18,
        color: commonStyles.colors.secondary
    },
    inputArea: {
        height: '90%',
        // display: 'flex',
    },
    titleInput: {
        color: '#fff',
        fontSize: 35,
        marginBottom: 30,
        fontWeight: '400'
    },
    descInput: {
        fontFamily: "normal",
        flex: 1,
        color: '#fff',
        lineHeight: 31,
        fontSize: 20,
        textAlignVertical: 'top',
        fontWeight: '400',
        // overflow: 'scroll',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#3B3B3B',
        width: 40,
        height: 40,
        marginRight: 20,
        color: commonStyles.colors.today
    }
})