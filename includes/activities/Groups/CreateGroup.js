import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, Form, Input, Spinner} from 'native-base';
import Language from '../../config/Language';
import {Default} from '../../config/Stylesheet';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import HeaderBack from './../section/HeaderBack';
import {Delete, Insert, Update} from '../../functions/Sqlite';
import PickerColor from '../Elements/Form/PickerColor';
import Notification from '../section/Notification';
import {Actions} from 'react-native-router-flux';
import {SetSetting} from '../../redux/actions';

class CreateGroup extends Component {
    _isMounted = false;

    style = {
        Header: {
            backgroundColor: '#f9faff',
        },
        Content: {
            padding: 5,
            backgroundColor: '#f9faff',
        },
        Form: {
            main: {
                marginTop: 5,
            },
            view: {
                margin: 15,
            },
            Input: {
                fontSize: 15,
                margin: 0,
                width: '100%',
                textAlign: 'right',
                color: '#575757',
                fontFamily: Default.fontFamilyLight,
            },
            Item: {
                elevation: 1,
                backgroundColor: '#fff',
                margin: 5,
                paddingRight: 5,
                borderRadius: 5,
            },
            Footer: {
                main: {
                    backgroundColor: '#1f79ff',
                },
                btn: {
                    flex: 1,
                    height: '100%',
                },
                text: {
                    fontFamily: Default.fontFamily,
                    fontSize: 17,
                    paddingTop: 5,
                    height: '100%',
                    color: '#ffffff',
                },
            },
        },
        Remove: {
            TouchableOpacity: {
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            },
            Text: {
                fontFamily: Default.fontFamily,
                fontSize: 14,
                color: '#E74C3CFF',
            },
            Text2: {
                fontFamily: Default.fontFamily,
                fontSize: 12,
                color: '#898989',
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            closeBox: false,
            id: 0,
            name: '',
            color: '#2980b9',
        };
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.props.hasOwnProperty('item')) {
            this.setState(this.props.item);
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange(fieldName, text, callBack = null) {
        let data = this.state;
        data[fieldName] = text;

        return this.setState(data, callBack);
    }

    validate() {
        const {name} = this.state;
        const {message, form} = Language;

        if (!name.length) {
            Notification(message.requiredField.replace('%s', form.title), 'danger', 3000, 'bottom');
            return false;
        }

        return true;
    }

    async reloadHome() {
        await this.props.SetSetting({...this.props.setting, loading: true});
    }

    async save() {
        const create = !this.props.hasOwnProperty('item');
        const {name, color, loading, id} = this.state;
        const {message} = Language;


        if (!this.validate() || loading) {
            return null;
        }

        // Start Loading
        this.setState({loading: true});

        if (create) {
            const res = await Insert('Groups', {
                name, color,
            });

            // End Loading
            this.setState({loading: false});

            if (res.hasOwnProperty('insertId') && res.insertId) {
                this.reloadHome().then();

                Notification(message.Success, 'success');

                Actions.pop();
                return Actions.drawerOpen();
            } else {
                return Notification(message.ErrorSave);
            }
        } else {
            // Edit
            const res = await Update('Groups', `id = ${id}`, {color, name});

            this.setState({loading: false});

            if (res.hasOwnProperty('rowsAffected') && res.rowsAffected) {
                this.reloadHome().then();

                Notification(message.Success, 'success');

                if (this.props.hasOwnProperty('isBackArchive')) {
                    this.props.ChangeName(name);
                    return Actions.pop();
                }

                Actions.pop();
                return Actions.drawerOpen();
            } else {
                return Notification(message.ErrorSave);
            }
        }

    }

    async remove() {
        const {id} = this.state;
        const {message, global} = Language;

        Alert.alert('', message.confirm, [
            {
                text: global.no,
            },
            {
                text: global.yesDelete,
                onPress: () => {
                    // Start Loading
                    this.setState({loading: true});

                    Delete('Groups', id).then(r => {

                        if (r.hasOwnProperty('rowsAffected') && r.rowsAffected) {

                            return Delete('Tasks', id, 'group_id').then((r) => {

                                if (r.hasOwnProperty('rowsAffected')) {
                                    // End Loading
                                    this.setState({loading: false});

                                    this.reloadHome().then();

                                    Notification(message.Success, 'success');

                                    if (this.props.hasOwnProperty('isBackArchive')) {
                                        Actions.pop();
                                        return Actions.pop();
                                    }

                                    Actions.pop();
                                    return Actions.drawerOpen();
                                } else {
                                    // End Loading
                                    this.setState({loading: false});
                                    return Notification(message.ErrorSave);
                                }
                            });

                        } else {
                            // End Loading
                            this.setState({loading: false});

                            return Notification(message.ErrorSave);
                        }
                    });
                },
            }]);

    }

    removeElement() {
        const create = !this.props.hasOwnProperty('item');

        if (create) {
            return null;
        }

        return (
            <TouchableOpacity style={this.style.Remove.TouchableOpacity} onPress={this.remove.bind(this)}>
                <Text style={this.style.Remove.Text}>{Language.group.delete}</Text>
                <Text style={this.style.Remove.Text2}>{Language.message.groupDelete}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {name, color, loading} = this.state;
        const title = this.props.hasOwnProperty('item') ? Language.group.edit : Language.group.create;
        const ButtonText = this.props.hasOwnProperty('item') ? Language.global.save : Language.global.create;

        return (
            <Container>
                <HeaderBack title={title} style={this.style.Header} StatusBarColor={'#f9faff'}/>
                <Content style={this.style.Content}>
                    <Form style={this.style.Form.main}>
                        <View style={this.style.Form.Item}>
                            <Input onChangeText={(text) => this.onChange('name', text)} style={this.style.Form.Input}
                                   placeholder={Language.form.title} value={name}/>
                        </View>
                        <View>
                            <PickerColor placeholder={Language.group.colorTemplate}
                                         color={color}
                                         onChangeText={this.onChange.bind(this)}
                                         IconName={'color-lens'} IconType={'MaterialIcons'}
                                         jump={'ColorPicker'}/>
                        </View>
                    </Form>
                    {this.removeElement()}
                </Content>
                <Footer style={this.style.Form.Footer.main}>
                    <Button onPress={this.save.bind(this)} transparent full style={this.style.Form.Footer.btn}>
                        {loading ? (<Spinner color={'#fff'}/>) : (
                            <Text style={this.style.Form.Footer.text}>{ButtonText}</Text>)}

                    </Button>
                </Footer>
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

export default connect(StateToProps, DispatchInProps)(CreateGroup);
