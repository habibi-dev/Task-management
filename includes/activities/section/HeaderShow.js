import {StatusBar, ImageBackground, Text} from 'react-native';
import {Body, Header, Icon} from 'native-base';
import React from 'react';
import {Default} from '../../config/Stylesheet';
import {Actions} from 'react-native-router-flux';

const style = {
    header: {
        height: 200,
        backgroundColor: '#911af6',
    },
    imageBackground: {
        position: 'absolute',
        height: 130,
        right: 0,
        top: 0,
        left: '50%',
        flex: 1,
    },
    body: {
        width: '100%',
        height: 200,
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: Default.fontFamilyLight,
        fontSize: 18,
        color: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 90,
        width: '100%',
    },
    icon: {
        color: '#ffffff',
        marginTop: 10,
        marginLeft: 5,
    },
};


export default (props) => {
    const {item} = props;
    return (
        <Header style={[style.header, {backgroundColor: item.color}]} noShadow>
            <StatusBar backgroundColor={item.color} barStyle={'light-content'}/>
            <ImageBackground source={require('../../assets/images/header-show.png')} style={style.imageBackground}/>
            <Body style={style.body}>
                <Icon name={'arrow-left'} style={style.icon} type={'Feather'} onPress={() => Actions.pop()}/>
                <Text style={style.title} numberOfLines={1}>{item.title}</Text>
            </Body>
        </Header>
    );
}
