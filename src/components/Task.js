import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Button
} from 'react-native'
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/Ionicons'

import moment from 'moment'
import 'moment/locale/pt-br'

import { useApi } from "../api";
import { useNavigation } from "@react-navigation/native";

export default props => {

    const { title, desc, createdAt, id, color } = props;
    const [selected, setSelected] = useState(false)

    const api = useApi()
    const navigation = useNavigation();

    useEffect(() => {
        !api.deletionMode ? setSelected(false) : false
    }, [api.deletionMode])


    const formattedDate = moment(createdAt).locale('pt-br').
        format("ddd, D [de] MMMM")

    const handler = () => {
        api.deletionMode ? markSelection() : show()
    }

    const show = () => {
        navigation.navigate('Edit', { title, id, desc, createdAt, color })
    }

    const markSelection = () => {
        if (!selected) {
            setSelected(true)
            api.addSelected(id)
        } else {
            setSelected(false)
            api.removeSelected(id)
        }
    }

    const getRadios = () => {
        if (selected) {
            return (<Icons style={styles.radioButton} name="radio-button-on" size={25} color={'#717070'} />)
        }
        return (<Icons style={styles.radioButton} name="radio-button-off" size={25} color={'#fff'} />)
    }

    return (
        <GestureHandlerRootView>
            <TouchableOpacity
                onPress={handler}
                onLongPress={() => { api.setDeletionMode(true); markSelection() }}>
                <View style={[styles.container, api.deletionMode && selected ? { backgroundColor: '#3B3B3B' } : { backgroundColor: color }]}>
                    <View style={styles.main}>
                        <Text
                            style={styles.mainText}
                            numberOfLines={2}>
                            {title}</Text>
                        <Text
                            numberOfLines={2}
                            style={styles.mainDesc}>{desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                    {api.deletionMode && getRadios()}
                </View>
            </TouchableOpacity>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 15,
        borderBottomWidth: 1,
        alignItems: 'center',
        minHeight: 80,
        marginBottom: 15,
        backgroundColor: '#ff7847'
    },
    main: {
        flex: 4,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20,
    },
    radioButton: {
        marginRight: 20,
        // backgroundColor: 'rgba(113, 112,112, 0.05)',
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        borderRadius: 15,
        elevation: 15
    },
    mainText: {
        fontSize: 24,
        paddingTop: 5,
        paddingBottom: 2,
        lineHeight: 25,
    },
    mainDesc: {
        fontSize: 15,
        paddingBottom: 2
    },
    date: {
        color: "#3B3B3B",
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10
    },
    excludeText: {
        color: '#fff',
        margin: 10,
        fontSize: 20
    },
    excludeIcon: {
        marginLeft: 10
    }
})