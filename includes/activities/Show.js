import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';
import {Text, View} from 'react-native';
import Language from '../config/Language';
import HeaderShow from './section/HeaderShow';
import {Default} from '../config/Stylesheet';
import Fab from './Elements/Show/Fab';
import Date from './Elements/Show/Date';
import {Update} from '../functions/Sqlite';
import Notification from './section/Notification';
import {Actions} from 'react-native-router-flux';
import {SetSetting} from '../redux/actions';

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
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    async reloadHome() {
        await this.props.SetSetting({...this.props.setting, loading: true});
    }

    Checked() {
        this.setState({loading: true});

        let newComplete = !(this.props.item.complete === 'true' || this.props.item.complete === true);

        Update('Tasks', `id = ${this.props.item.id}`, {complete: newComplete}).then(
            res => {
                if (res.hasOwnProperty('rowsAffected') && res.rowsAffected) {
                    this.setState({loading: false});
                    this.reloadHome().then();
                    Notification(Language.message.Success, 'success');
                    return Actions.pop();
                } else {
                    this.setState({loading: false});
                    return Notification(Language.message.ErrorSave);
                }
            },
        );

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
                <Fab item={item} loading={this.state.loading} Checked={this.Checked.bind(this)}/>
            </Container>
        );
    }
}

const DispatchInProps = dispatch => {
    return {
        SetSetting: data => {
            dispatch(SetSetting(data));
        },
    };
};
const StateToProps = (state) => {
    return {
        setting: state.setting,
    };
};

export default connect(StateToProps, DispatchInProps)(Show);
