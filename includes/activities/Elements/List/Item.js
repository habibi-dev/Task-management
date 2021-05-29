import {Text, TouchableOpacity, View} from 'react-native';
import {CheckBox, Icon} from 'native-base';
import React from 'react';
import {Default} from '../../../config/Stylesheet';
import {Actions} from 'react-native-router-flux';
import moment from 'moment-jalaali';

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
    },
    title: {
        fontFamily: Default.fontFamily,
        fontSize: 15,
        textAlign: 'right',
        color: '#828599',
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
    informationWrap: {
        flexDirection: 'row-reverse',
    },
    informationBox: {
        flexDirection: 'row-reverse',
        marginTop: 5,
        marginRight: 10,

    },
    informationIcon: {
        color: '#bbbbbb',
        fontSize: 15,
        width: 'auto',
        marginTop: 2,

    },
    informationText: {
        color: '#bbbbbb',
        width: 'auto',
        marginRight: 5,
        fontFamily: Default.fontFamilyLight,
        fontSize: 12,
    },
};

const _onPress = (item) => {
    Actions.push('Show', {item: item});
};

const information = (item) => {
    return (
        <View style={style.informationWrap}>
            <View style={style.informationBox}>
                <Icon name={'folder-o'} type={'FontAwesome'} style={style.informationIcon}/>
                <Text style={style.informationText}>{item.group_name}</Text>
            </View>
            <View style={style.informationBox}>
                <Icon name={'clock'} type={'Feather'} style={style.informationIcon}/>
                <Text style={style.informationText}>{moment(item.date, 'X').format('HH:mm')}</Text>
            </View>
        </View>
    );
};

export default (item, index, Checked, is_home = false) => {
    index = index + 1;
    const {complete, color, title} = item,
        checked = (complete === 'true' || complete === true);

    let ElChecked = null;
    if (checked) {
        ElChecked = (
            <TouchableOpacity activeOpacity={.8} style={style.ElChecked} onPress={() => Checked(index)}>
                <View/>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[style.item, is_home ? {flex: 1} : {}]} key={index}>
            {ElChecked}
            <CheckBox checked={checked} style={style.CheckBox} color={color}
                      onPress={() => Checked(index)}/>
            <TouchableOpacity style={style.titleTouchableHighlight} key={index} activeOpacity={.5}
                              underlayColor={'transparent'} onPress={() => _onPress(item)}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={[style.title, checked ? style.titleChecked : {}]}
                          numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                    {is_home ? information(item) : null}
                </View>
            </TouchableOpacity>
        </View>
    );
}
