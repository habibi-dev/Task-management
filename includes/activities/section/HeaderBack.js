import {StatusBar, Text} from 'react-native';
import {Header, Icon} from 'native-base';
import React from 'react';
import {Default} from '../../config/Stylesheet';
import {Actions} from 'react-native-router-flux';

const style = {
    header: {
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontFamily: Default.fontFamily,
        color: '#666666',
        fontSize: 15,
    },
    icon: {
        color: '#666666',
        marginLeft: 10,
    },
};


export default (props) => {
    const {title = '', StatusBarColor = '#fff', noShadow = true} = props;
    return (
        <Header style={[style.header, props.hasOwnProperty('style') ? props.style : {}]} noShadow={noShadow}>
            <StatusBar backgroundColor={StatusBarColor} barStyle={'dark-content'}/>
            <Icon name={'arrow-right'} style={style.icon} type={'Feather'} onPress={() => Actions.pop()}/>
            <Text style={style.title}>{title}</Text>
        </Header>
    );
}
