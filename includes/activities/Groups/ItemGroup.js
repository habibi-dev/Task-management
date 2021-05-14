import React from 'react';
import {Default} from '../../config/Stylesheet';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import LightBox from '../LightBox';
import {Actions} from 'react-native-router-flux';

const style = {
    Text: {
        fontSize: 14,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        textAlign: 'right',
        color: '#ffffff',
        fontFamily: Default.fontFamilyLight,
    },
    TouchableOpacity: {
        width: '47%',
        height: 100,
        margin: 5,
    },
    ImageBackground: {
        padding: 10,
        paddingBottom: 12,
        paddingTop: 12,
        borderRadius: 20,
        height: 100,
        justifyContent: 'flex-end',
        elevation: 1,
    },
    Footer: {
        text: {
            fontFamily: Default.fontFamilyLight,
            color: '#474747',
            fontSize: 14,
        },
    },
};
export default (item, index) => {
    const background = require('../../assets/images/header-show.png');

    return (
        <TouchableOpacity style={[style.TouchableOpacity]} onPress={() => {
            Actions.push('GroupTask', {item});
        }} key={index} activeOpacity={1}>
            <ImageBackground style={[style.ImageBackground, {backgroundColor: item.color}]}
                             source={background}>
                <Text style={style.Text} numberOfLines={1}>{item.name}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}
