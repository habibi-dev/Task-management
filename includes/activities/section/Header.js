import {StatusBar, Image, Text} from 'react-native';
import {Body, Button, Header, Icon, Left, Right} from 'native-base';
import React from 'react';
import {Actions} from 'react-native-router-flux';
import Notification from './Notification';
import Language from '../../config/Language';
import {Default} from '../../config/Stylesheet';

const style = {
        header: {
            backgroundColor: '#f9faff',
        },
        body: {
            flexDirection: 'row-reverse',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        Text: {
            fontFamily: Default.fontFamilyLight,
            fontSize: 17,
            width: 200,
            textAlign: 'center',
            color: '#5e5e5e',
        },
        title: {
            width: 110,
        },
        icon: {
            color: '#939393',
        },
    },
    setting = () => {
        Notification(Language.message.ComingSoon);
    };


export default (props) => {
    const {
        title, leftIconName = 'settings', leftIconType = 'SimpleLineIcons',
        leftIconOnPress = setting,
    } = props;
    return (
        <Header style={style.header} noShadow>
            <StatusBar backgroundColor={'#f9faff'} barStyle={'dark-content'}/>
            <Body style={style.body}>
                <Right>
                    <Button transparent onPress={() => Actions.drawerOpen()}>
                        <Icon name={'menu'} style={style.icon} type={'SimpleLineIcons'}/>
                    </Button>
                </Right>
                <Button transparent>
                    {title ? <Text style={style.Text} numberOfLines={1}>{title}</Text> : (
                        <Image source={require('../../assets/images/title-logo.png')} style={style.title}
                               resizeMode={'contain'}/>
                    )}
                </Button>
                <Left>
                    <Button transparent onPress={() => leftIconOnPress()}>
                        <Icon name={leftIconName} style={style.icon} type={leftIconType}/>
                    </Button>
                </Left>
            </Body>
        </Header>
    );
}
