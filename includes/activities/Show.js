import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';
import {Text, View} from 'react-native';
import Language from '../config/Language';
import HeaderShow from './section/HeaderShow';
import {Default} from '../config/Stylesheet';
import Fab from './Elements/Show/Fab';
import Date from './Elements/Show/Date';

class Show extends Component {
    _isMounted = false;

    style = {
        Content: {
            marginTop: -60,
            backgroundColor: '#ffffff',
            borderRadius: 30,
        },
        Description: {
            view: {
                margin: 15,
            },
            text: {
                fontFamily: Default.fontFamilyLight,
                lineHeight: 30,
                textAlign: 'right',
                color: '#444444',
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    render() {
        const {item} = this.props;

        return (
            <Container>
                <HeaderShow title={Language.global.name} item={item}/>
                <Content style={this.style.Content}>
                    <View style={this.style.Description.view}>
                        <Text style={this.style.Description.text}>{item.description}</Text>
                    </View>
                    <Date item={item}/>
                </Content>
                <Fab item={item}/>
            </Container>
        );
    }
}

const StateToProps = (state) => {
    return {
        setting: state.setting,
    };
};

export default connect(StateToProps)(Show);
