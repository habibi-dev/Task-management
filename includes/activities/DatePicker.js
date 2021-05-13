import React, {useState} from 'react';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {Default} from '../config/Stylesheet';
import {Button} from 'native-base';
import Language from '../config/Language';
import {Text} from 'react-native';
import moment from 'moment-jalaali';
import LightBox from './LightBox';
import {Actions} from 'react-native-router-flux';
import Notification from './section/Notification';

const style = {
    Btn: {
        main: {
            backgroundColor: '#1f79ff',
        },
        text: {
            fontFamily: Default.fontFamily,
            fontSize: 17,
            color: '#ffffff',
        },
    },
};

export default (props) => {
    let {onChangeText} = props;
    const [date, setDate] = useState(), [time, setTime] = useState('00:00');

    return (
        <LightBox>
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
                style={style.DatePicker}
                onDateChange={setDate}
                onTimeChange={setTime}
            />
            <Button style={style.Btn.main} onPress={() => {
                if (!date) {
                    return Notification(Language.message.SelectDate, 'danger');
                }
                onChangeText('date', {
                    fa: `${date} ${time}`,
                    en: moment(`${date} ${time}`, 'jYYYY/jMM/jDD HH:mm').format('YYYY-MM-DD HH:mm'),
                });

                Actions.pop();
            }} transparent full>
                <Text style={style.Btn.text}>{Language.datePicker.title}</Text>
            </Button>
        </LightBox>
    );
}
