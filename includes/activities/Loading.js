import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Spinner} from 'native-base';
import {Default} from '../config/Stylesheet';
import Language from '../config/Language';

const Style = {
    Loading: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    Text: {
        textAlign: 'center',
        fontFamily: Default.fontFamilyLight,
        color: '#5f5f5f',
        fontSize: 14,
        marginTop: 10,
    },
};

export const Loading = (props) => {
    const {text = ''} = props;

    return (
        <>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
            <View style={Style.Loading}>
                <Spinner color={Default.colorPrimary}/>
                {text === '' ? null : <Text style={Style.Text}>{text}</Text>}
            </View>
        </>
    );
};
