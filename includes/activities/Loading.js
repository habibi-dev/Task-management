import React from 'react';
import {StatusBar, View} from 'react-native'
import {Spinner} from 'native-base';
import {Default} from "../config/Stylesheet";

const Style = {
    Loading: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
};

export const Loading = (props) => {

    return (
        <>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
            <View style={Style.Loading}>
                <Spinner color={Default.colorPrimary}/>
            </View>
        </>
    )
};