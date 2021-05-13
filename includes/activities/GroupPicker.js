import React, {useEffect, useState} from 'react';
import {Default} from '../config/Stylesheet';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import LightBox from './LightBox';
import {Actions} from 'react-native-router-flux';
import {Select} from '../functions/Sqlite';
import Language from '../config/Language';
import {Button} from 'native-base';

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
    noGroups: {
        btn: {
            width: '100%',
            marginTop: 15,
            backgroundColor: '#1f79ff',
        },
        text: {
            fontFamily: Default.fontFamilyLight,
            color: '#474747',
            fontSize: 14,
        },
        textBtn: {
            fontFamily: Default.fontFamilyLight,
            color: '#fff',
            fontSize: 14,
        },
        view: {
            margin: 10,
            alignItems: 'center',
        },
    },
};

const noGroups = () => {
    return (
        <View style={style.noGroups.view}>
            <Text style={style.noGroups.text}>{Language.message.noGroups}</Text>
            <Button style={style.noGroups.btn} onPress={() => Actions.jump('CreateGroup')} transparent full>
                <Text style={style.noGroups.textBtn}>{Language.group.create}</Text>
            </Button>
        </View>
    );
};

export default (props) => {
    const {onChangeText} = props;
    const [groups, setGroups] = useState([]);
    const [status, setStatus] = useState(true);

    if (!groups.length && status) {
        setStatus(false);
        Select('Groups').then(r => setGroups(r));
    }

    const background = require('../assets/images/header-show.png');

    return (
        <LightBox>
            <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'center'}}>
                {groups.length ? groups.map((item, index) => (
                    <TouchableOpacity style={[style.TouchableOpacity]} onPress={() => {
                        onChangeText('group', item);
                        Actions.pop();
                    }} key={index} activeOpacity={1}>
                        <ImageBackground style={[style.ImageBackground, {backgroundColor: item.color}]}
                                         source={background}>
                            <Text style={style.Text} numberOfLines={1}>{item.name}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )) : noGroups()}
            </View>
        </LightBox>
    );
}
