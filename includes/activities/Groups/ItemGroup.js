import React, {useEffect, useRef, useState} from 'react';
import {Default} from '../../config/Stylesheet';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Group from '../../model/Group';
import {Icon} from 'native-base';

const style = {
    Text: {
        fontSize: 14,
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
        padding: 15,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingTop: 12,
        borderRadius: 20,
        height: 100,
        justifyContent: 'space-between',
        elevation: 1,
    },
    Footer: {
        text: {
            fontFamily: Default.fontFamilyLight,
            color: '#474747',
            fontSize: 14,
        },
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    ViewCount: {
        backgroundColor: 'rgba(0,0,0,.3)',
        paddingRight: 8,
        paddingLeft: 8,
        borderRadius: 10,
    },
    TextCount: {
        fontFamily: Default.fontFamilyLight,
        color: '#ffffff',
        fontSize: 13,
    },
    star: {
        marginRight: -3,
        flex: 0,
        fontSize: 22,
        color: '#ffffff',
    },
};

const header = (group, SetSetting, setting) => {

    return (
        <View style={style.header}>
            <Icon type={'AntDesign'}
                  onPress={() => (new Group()).pinToggle(group).then(r => SetSetting({
                          ...setting,
                          loading: true,
                      }),
                  )}
                  name={group.pin ? 'star' : 'staro'}
                  style={[style.star, group.pin ? {color: '#f1c40f'} : {}]}/>
            <View style={style.ViewCount}>
                <Text style={style.TextCount}>
                    {group.count.complete}/{group.count.total}
                </Text>
            </View>
        </View>
    );
};

export default (item, index, is_home = false, SetSetting = null, setting = null) => {
    const background = require('../../assets/images/header-show.png');

    return (
        <TouchableOpacity style={[style.TouchableOpacity]} onPress={() => {
            Actions.push('GroupTask', {item});
        }} key={index} activeOpacity={1}>
            <ImageBackground style={[style.ImageBackground, {backgroundColor: item.color}]}
                             source={background}>
                {is_home ? header(item, SetSetting, setting) : null}
                <Text style={style.Text} numberOfLines={1}>{item.name}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}
