import {Text, View} from 'react-native';
import {Icon} from 'native-base';
import React from 'react';
import {Default} from '../../../config/Stylesheet';
import moment from 'moment-jalaali';
import fa from 'moment/src/locale/fa';

moment.locale('fa', fa);
moment.loadPersian({dialect: 'persian-modern'});

const style = {
    view: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 100,
    },
    view2: {
        borderRadius: 15,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    bg: {
        opacity: .2,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        borderRadius: 15,
        left: 0,
    },
    viewText: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    dateText: {
        color: '#808b9f',
        fontFamily: Default.fontFamily,
        fontSize: 15,
        textAlign: 'right',
    },
    timeText: {
        color: '#808b9f',
        fontFamily: Default.fontFamily,
        fontSize: 15,
        textAlign: 'right',
    },
};

export default (props) => {
    const {item} = props,
        date = moment(item.date, 'X').format('dddd, jDD jMMMM jYYYY - HH:mm').split(' - ');
    if (!item.date) {
        return null;
    }


    return (
        <View style={style.view}>
            <View style={style.viewText}>
                <Text style={style.dateText}>{date[0]}</Text>
                <Text style={style.timeText}>{date[1]}</Text>
            </View>
            <View style={[style.view2]}>
                <View style={[style.bg, {backgroundColor: item.color}]}/>
                <Icon name={'calendar'} type={'Feather'} style={{color: item.color}}/>
            </View>
        </View>
    );
}
