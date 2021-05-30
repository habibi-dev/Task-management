import React, {useEffect, useState} from 'react';
import {Default} from '../config/Stylesheet';
import {Button, Container, Content, Footer} from 'native-base';
import Language from '../config/Language';
import {Text, View} from 'react-native';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import Notification from './section/Notification';
import JalaliCalendarPicker from 'react-native-persian-jalali-calendar-picker';
import HeaderBack from './section/HeaderBack';

const style = {
    DatePicker: {
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        overflow: 'hidden',
    },
    Content: {
        padding: 5,
        backgroundColor: '#f9faff',
    },
    Footer: {
        main: {
            backgroundColor: '#1f79ff',
            justifyContent: 'center',
        },
        btn: {
            height: '100%',
            flex: 1,
        },
        text: {
            fontFamily: Default.fontFamily,
            fontSize: 17,
            color: '#ffffff',
        },
    },
    ComingSoon: {
        fontFamily: Default.fontFamily,
        fontSize: 12,
        color: '#898989',
        marginTop: 15,
        width: '100%',
        textAlign: 'center',
    },
};

export default (props) => {
    let {onChangeText, selected = null} = props;
    const [date, setDate] = useState(null), [time, setTime] = useState('00:00');

    useEffect(() => {
        if (selected && date === null) {
            const dateTime = selected.split(' ');
            setDate(dateTime[0]);
            setTime(dateTime[1]);
        }
    });

    return (
        <Container>
            <HeaderBack title={Language.datePicker.title}/>
            <Content style={style.Content}>
                <View style={style.DatePicker}>
                    <JalaliCalendarPicker
                        styleWrap={{}}
                        headerStyleWrap={{}}
                        headerStyleText={{}}
                        headerStyleTextCenter={{}}
                        headerStyleWrapCenter={{}}
                        weekStyleWrap={{}}
                        weekStyleText={{}}
                        maxY={1455}
                        minY={1400}
                        Time={true}
                        primaryColor={'#2980b9'}
                        selected={date}
                        currentTime={time}
                        min={moment().format('jYYYY/jMM/jDD')}
                        onDateChange={date => {
                            const dateTime = date.split(' ');
                            setDate(dateTime[0]);
                            setTime(dateTime[1]);
                        }}
                    />
                </View>

            </Content>
            <Footer style={style.Footer.main}>
                <Button style={style.Footer.btn} onPress={() => {
                    if (!date) {
                        return Notification(Language.message.SelectDate, 'danger');
                    }
                    onChangeText('date', {
                        fa: `${date} ${time}`,
                        en: parseInt(moment(`${date} ${time}`, 'jYYYY/jMM/jDD HH:mm').format('X')),
                    });

                    Actions.pop();
                }} transparent full>
                    <Text style={style.Footer.text}>{Language.datePicker.title}</Text>
                </Button>
            </Footer>
        </Container>

    );
}
