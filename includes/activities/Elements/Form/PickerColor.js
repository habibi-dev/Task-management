import React from 'react';
import {Default} from '../../../config/Stylesheet';
import {TouchableOpacity} from 'react-native';
import {Icon, Text} from 'native-base';
import {Actions} from 'react-native-router-flux';

const style = {
    Input: {
        fontSize: 15,
        textAlign: 'right',
        color: '#ffffff',
        fontFamily: Default.fontFamilyLight,
    },
    Item: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        elevation: 1,
        backgroundColor: '#fff',
        margin: 5,
        padding: 10,
        height: 54,
        paddingBottom: 12,
        paddingTop: 12,
        borderRadius: 5,
    },
    Icon: {
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 22,
    },
};
export default (props) => {
    const {placeholder, jump, IconName, IconType, onChangeText, styleIcon = {}, color = '#2980b9'} = props;
    return (
        <TouchableOpacity style={[style.Item, {backgroundColor: color}]}
                          onPress={() => Actions[jump]({onChangeText: onChangeText})}
                          activeOpacity={.9}>
            <Icon name={IconName} type={IconType} style={[style.Icon, styleIcon]}/>
            <Text style={style.Input}>{placeholder}</Text>
        </TouchableOpacity>
    );
}
