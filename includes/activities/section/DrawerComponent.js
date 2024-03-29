import {ImageBackground, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content, Footer, Header, Icon} from 'native-base';
import Language from '../../config/Language';
import {Default} from '../../config/Stylesheet';
import Notification from './Notification';
import {Actions} from 'react-native-router-flux';
import {Select} from '../../functions/Sqlite';
import Group from '../../model/Group';
import {SetSetting} from '../../redux/actions';
import {connect} from 'react-redux';

const style = {
    Content: {
        main: {
            margin: 5,
            backgroundColor: '#f9faff',
        },
        Text: {
            fontSize: 14,
            marginRight: 10,
            marginLeft: 10,
            textAlign: 'right',
            flex: 1,
            color: '#ffffff',
            fontFamily: Default.fontFamilyLight,
        },
        TouchableOpacity: {
            height: 50,
            margin: 5,
        },
        ImageBackground: {
            padding: 10,
            paddingBottom: 12,
            paddingTop: 12,
            borderRadius: 5,
            height: 50,
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 2,
        },
        pin: {
            flex: 0,
            fontSize: 22,
            color: '#ffffff',
        },
    },
    Footer: {
        main: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
        },
        text: {
            fontFamily: Default.fontFamilyLight,
            color: '#474747',
            fontSize: 14,
        },
    },
    noGroups: {
        text: {
            fontFamily: Default.fontFamilyLight,
            color: '#474747',
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
        </View>
    );
};

const DrawerComponent = (props) => {
    const background = require('../../assets/images/header-show.png');
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        Select('Groups').then(r => setGroups(r));
    });

    return (
        <Container>
            <StatusBar backgroundColor={'#f9faff'} barStyle={'dark-content'}/>
            <Content style={style.Content.main}>
                <View>
                    {groups.length ? groups.map((item, index) => (
                        <TouchableOpacity style={[style.Content.TouchableOpacity]} onPress={() => {
                            Actions.push('GroupTask', {item});
                        }} key={index} activeOpacity={1}>
                            <ImageBackground resizeMode={'cover'}
                                             style={[style.Content.ImageBackground, {backgroundColor: item.color}]}
                                             source={background}>
                                <Text style={style.Content.Text} numberOfLines={1}>{item.name}</Text>
                                <Icon type={'AntDesign'}
                                      onPress={() => (new Group()).pinToggle(item).then(r => props.SetSetting({
                                              ...props.setting,
                                              loading: true,
                                          }),
                                      )}
                                      name={item.pin ? 'star' : 'staro'}
                                      style={[style.Content.pin, item.pin ? {color: '#f1c40f'} : {}]}/>
                            </ImageBackground>
                        </TouchableOpacity>
                    )) : noGroups()}
                </View>
            </Content>
            <Footer style={style.Footer.main}>
                <TouchableOpacity onPress={() => Actions.CreateGroup()}>
                    <Text style={style.Footer.text}>{Language.group.create}</Text>
                </TouchableOpacity>
            </Footer>
        </Container>
    );
};


const StateToProps = (state) => {
    return {
        setting: state.setting,
    };
};

const DispatchInProps = dispatch => {
    return {
        SetSetting: data => {
            dispatch(SetSetting(data));
        },
    };
};

export default connect(StateToProps, DispatchInProps)(DrawerComponent);
