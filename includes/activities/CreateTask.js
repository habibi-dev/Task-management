import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, Form, Input, Spinner, Textarea} from 'native-base';
import Language from '../config/Language';
import {Default} from '../config/Stylesheet';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Picker from './Elements/Form/Picker';
import {Actions} from 'react-native-router-flux';
import HeaderBack from './section/HeaderBack';
import {Delete, Insert, Update} from '../functions/Sqlite';
import Notification from './section/Notification';
import {SetSetting} from '../redux/actions';

class CreateTask extends Component {
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
            closeBox: false,
            loading: false,
            title: '',
            description: '',
            date: {
                fa: '',
                en: '',
            },
            group: {
                name: '',
                id: 0,
                color: '',
            },
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
        const {title, date, group} = this.state;
        const {message, form} = Language;

        if (!title.length) {
            Notification(message.requiredField.replace('%s', form.title), 'danger', 3000, 'bottom');
            return false;
        }

        if (date.en.length) {
            if (new Date().getTime() / 1000 > new Date(date.en).getTime() / 1000) {
                Notification(message.ExDate, 'danger', 3000, 'bottom');
                return false;
            }
        }

        if (!group.id && !this.props.hasOwnProperty('group_id')) {
            Notification(message.requiredField.replace('%s', Language.group.title), 'danger', 3000, 'bottom');
            return false;
        }

        return true;
    }

    async save() {
        const create = !this.props.hasOwnProperty('item');
        const {title, description, date, group, id, loading} = this.state;
        const {message} = Language;


        if (!this.validate() || loading) {
            return null;
        }

        // Start Loading
        this.setState({loading: true});

        if (create) {
            const res = await Insert('Tasks', {
                title,
                description,
                ex_date: date.en,
                group_id: this.props.hasOwnProperty('group_id') ? this.props.group_id : this.state.group.id,
                complete: 0,
                notification: 0,
            });

            // End Loading
            this.setState({loading: false});

            if (res.hasOwnProperty('insertId') && res.insertId) {

                this.reloadHome().then();

                Notification(message.Success, 'success');

                return Actions.pop();
            } else {
                return Notification(message.ErrorSave);
            }
        } else {
            // Edit
            const res = await Update('Tasks', `id = ${id}`, {
                title, description, ex_date: date.en, group_id: group.id, complete: 0, notification: 0,
            });

            this.setState({loading: false});

            if (res.hasOwnProperty('rowsAffected') && res.rowsAffected) {
                this.reloadHome().then();

                Notification(message.Success, 'success');
                Actions.pop();
                return Actions.pop();
            } else {
                return Notification(message.ErrorSave);
            }
        }

    }

    async reloadHome() {
        await this.props.SetSetting({...this.props.setting, loading: true});
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

                    Delete('Tasks', id).then(r => {
                        if (r.hasOwnProperty('rowsAffected') && r.rowsAffected) {
                            // End Loading
                            this.setState({loading: false});

                            this.reloadHome().then();
                            Notification(message.Success, 'success');
                            Actions.pop();
                            return Actions.pop();

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
                <Text style={this.style.Remove.Text}>{Language.tasks.delete}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {title, description, date, group, loading} = this.state;
        const titleH = this.props.hasOwnProperty('item') ? Language.tasks.edit : Language.tasks.create;
        const ButtonText = this.props.hasOwnProperty('item') ? Language.global.save : Language.global.create;

        return (
            <Container>
                <HeaderBack title={titleH} style={this.style.Header} StatusBarColor={'#f9faff'}/>
                <Content style={this.style.Content}>
                    <Form style={this.style.Form.main}>
                        <View style={this.style.Form.Item}>
                            <Input onChangeText={(text) => this.onChange('title', text)} style={this.style.Form.Input}
                                   placeholder={Language.form.title} value={title}/>
                        </View>
                        <View style={this.style.Form.Item}>
                            <Textarea onChangeText={(text) => this.onChange('description', text)} rowSpan={5}
                                      style={this.style.Form.Input} placeholder={Language.form.description}
                                      value={description}/>
                        </View>
                        <View>
                            <Picker placeholder={date.fa.length ? date.fa : Language.datePicker.title}
                                    onChangeText={this.onChange.bind(this)}
                                    IconName={'calendar'} IconType={'Feather'}
                                    jump={'DatePicker'}/>
                        </View>
                        {this.props.hasOwnProperty('item') || this.props.hasOwnProperty('group_select') ? (
                            <View>
                                <Picker placeholder={group.name.length ? group.name : Language.group.title}
                                        onChangeText={this.onChange.bind(this)}
                                        styleIcon={group.color.length ? {color: group.color} : {}}
                                        IconName={'folder-o'} IconType={'FontAwesome'}
                                        jump={'GroupPicker'}/>
                            </View>
                        ) : null}

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

export default connect(StateToProps, DispatchInProps)(CreateTask);
