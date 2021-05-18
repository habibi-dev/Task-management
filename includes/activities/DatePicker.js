import React, {useState} from 'react';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {Default} from '../config/Stylesheet';
import {Button, Container, Content, Footer} from 'native-base';
import Language from '../config/Language';
import {Text, View} from 'react-native';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import Notification from './section/Notification';
import HeaderBack from './section/HeaderBack';

const style = {
    DatePicker: {
        elevation: 2,
        backgroundColor: '#fff',
        paddingRight: 5,
        borderRadius: 5,
        margin: 5,
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
    let {onChangeText} = props;
    const [date, setDate] = useState(), [time, setTime] = useState('00:00');

    return (
        <Container>
            <HeaderBack title={Language.datePicker.title}/>
            <Content style={style.Content}>
                <View style={style.DatePicker}>
                    <DatePicker
                        isGregorian={false}
                        current={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
                        minimumDate={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
                        options={{
                            backgroundColor: '#ffffff',
                            textHeaderColor: '#666666',
                            textDefaultColor: '#363636',
                            selectedTextColor: '#fff',
                            mainColor: '#1f79ff',
                            textSecondaryColor: '#666666',
                            defaultFont: Default.fontFamilyLight,
                            headerFont: Default.fontFamily,
                        }}
                        dateFormat={'YYYY/MM/DD'}
                        onDateChange={setDate}
                        onTimeChange={setTime}
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
