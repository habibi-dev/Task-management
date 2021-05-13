import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'native-base';
import React from 'react';
import {Default} from '../../../config/Stylesheet';
import {Actions} from 'react-native-router-flux';

const style = {
    item: {
        position: 'relative',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
        elevation: 1,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        height: 75,
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#ffffff',
    },
    titleTouchableHighlight: {
        marginRight: 20,
        width: '90%',
    },
    title: {
        fontFamily: Default.fontFamily,
        fontSize: 16,
        textAlign: 'right',
        color: '#5e637f',
        paddingLeft: 10,
    },
    titleChecked: {
        textDecorationLine: 'line-through',
    },
    CheckBox: {
        marginRight: 10,
        borderRadius: 22,
        padding: 0,
        paddingTop: .5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 22,
        height: 22,
    },
    ElChecked: {
        backgroundColor: 'rgba(255,255,255,.5)',
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 5,
        borderRadius: 20,
    },
};

const _onPress = (item) => {
    Actions.push('Show', {item: item});
};

export default (item, index, Checked) => {
    index = index + 1;
    const {complete, color, title} = item,
        checked = (complete === 'true' || complete === true);

    let ElChecked = null;
    console.log(checked);
    if (checked) {
        ElChecked = (
            <TouchableOpacity activeOpacity={.8} style={style.ElChecked} onPress={() => Checked(index)}>
                <View/>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[style.item]}>
            {ElChecked}
            <CheckBox checked={checked} style={style.CheckBox} color={color}
                      onPress={() => Checked(index)}/>
            <TouchableOpacity style={style.titleTouchableHighlight} key={index} activeOpacity={.5}
                              underlayColor={'transparent'} onPress={() => _onPress(item)}>
                <Text style={[style.title, checked ? style.titleChecked : {}]}
                      numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </TouchableOpacity>
        </View>
    );
}
