import {Button, Fab, Icon, Spinner} from 'native-base';
import React, {useState} from 'react';
import {Actions} from 'react-native-router-flux';
import moment from 'moment-jalaali';

export default (props) => {
    const {item, Checked, loading = false} = props;
    const [fabActive, setFabActive] = useState(false);

    return (
        <Fab
            style={{backgroundColor: item.color}} onPress={() => setFabActive(!fabActive)}
            position="bottomRight" active={fabActive} direction="up">
            {loading ? <Spinner color={'#ffffff'}/> :
                <Icon name={'tools'} type={'FontAwesome5'} style={{color: '#ffffff'}}/>}

            <Button style={{backgroundColor: '#666666'}} onPress={() => Checked()}>
                <Icon name="check" type={'Feather'}/>
            </Button>
            <Button onPress={() => Actions.jump('CreateTask', {
                item: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    date: {
                        fa: item.date.length ? moment(item.date, 'YYYY-MM-DD HH:mm').format('jYYYY/jMM/jDD HH:mm') : '',
                        en: item.date,
                    },
                    group: {
                        name: item.group_name,
                        id: item.group_id,
                        color: item.color,
                    },
                },
            })} style={{backgroundColor: '#666666'}}>
                <Icon name="edit" type={'MaterialIcons'}/>
            </Button>
        </Fab>
    );
}
