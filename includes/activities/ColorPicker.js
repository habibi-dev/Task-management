import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container, Content} from 'native-base';
import HeaderBack from './section/HeaderBack';
import Language from '../config/Language';

const style = {
    TouchableOpacity: {
        width: '47%',
        height: 100,
        margin: 5,
    },
    ImageBackground: {
        padding: 10,
        paddingBottom: 12,
        paddingTop: 12,
        borderRadius: 20,
        height: 100,
        justifyContent: 'flex-end',
        elevation: 1,
    },
};

export default (props) => {
    const {onChangeText} = props;
    const colors = [
        '#0db972', '#d70fe5', '#2980b9', '#e74c3c', '#16a085', '#8e44ad', '#d35400', '#2c3e50', '#22a6b3',
        '#30336b', '#535c68', '#eb4d4b', '#8c7ae6', '#e1b12c', '#f368e0', '#009432', '#B53471', '#ED4C67',
        '#EE5A24', '#58B19F',
    ];
    const background = require('../assets/images/header-show.png');

    return (
        <Container>
            <HeaderBack title={Language.group.colorTemplate}/>
            <Content>
                <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {colors.map((item, index) => (
                        <TouchableOpacity style={[style.TouchableOpacity]} onPress={() => {
                            onChangeText('color', item);
                            Actions.pop();
                        }} key={index} activeOpacity={1}>
                            <ImageBackground style={[style.ImageBackground, {backgroundColor: item}]}
                                             source={background}>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            </Content>
        </Container>
    );
}
