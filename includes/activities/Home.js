import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Fab, Icon} from 'native-base';
import {BackHandler, FlatList, StatusBar, Text, View} from 'react-native';
import Header from './section/Header';
import Language from '../config/Language';
import Notification from './section/Notification';
import {Actions} from 'react-native-router-flux';
import {Select, Update} from '../functions/Sqlite';
import {SetSetting} from '../redux/actions';
import {Default} from '../config/Stylesheet';
import ItemGroup from './Groups/ItemGroup';
import Item from './Elements/List/Item';
import moment from 'moment';
import Group from '../model/Group';

class Home extends Component {
    _isMounted = false;

    style = {
        Container: {
            backgroundColor: '#f9faff',
        },
        Fab: {
            btn: {
                backgroundColor: '#1f79ff',
            },
            icon: {
                color: '#ffffff',
            },
        },
        noGroups: {
            btn: {
                width: '100%',
                marginTop: 15,
                backgroundColor: '#1f79ff',
            },
            text: {
                fontFamily: Default.fontFamilyLight,
                color: '#474747',
                fontSize: 14,
            },
            textBtn: {
                fontFamily: Default.fontFamilyLight,
                color: '#fff',
                fontSize: 14,
            },
            view: {
                width: '100%',
                margin: 10,
                alignItems: 'center',
            },
        },
        Content: {
            main: {
                flex: 1,
                padding: 15,
                marginTop: 0,
                marginBottom: 5,
            },
            wrap: {
                marginBottom: 25,
            },
            title: {
                fontFamily: Default.fontFamilyBold,
                color: '#8e8e8f',
                marginRight: 5,
                fontSize: 16,
            },
            wrapBoxGroup: {
                flexDirection: 'row-reverse',
                flexWrap: 'wrap',
                marginTop: 10,
            },
        },
        space: {
            paddingTop: 75,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            Group: [],
            Tasks: [],
            countBack: Date.now(),
        };
    }

    async componentDidMount() {
        this._isMounted = true;

        this.getData();

        if (global.hasOwnProperty('itemShow')) {
            Actions.push('Show', {item: global.itemShow});
        }

        BackHandler.addEventListener('hardwareBackPress', this.Exit.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;

        BackHandler.removeEventListener('hardwareBackPress', this.Exit.bind(this));
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        if (this.props.setting.loading) {
            await this.props.SetSetting({...this.props.setting, loading: false});

            this.getData();
        }
    }

    getData() {
        this.setState({refreshing: true});

        let array = [];

        Select('Groups', '*', 'pin = 1').then((r) => {
            let i = 0;
            r.map(group => {
                group.count = {complete: 0, total: 0};
                array.push(group);
                this.count(group.id, i);
                i++;
            });
        });

        this.setState({Group: array});

        let start = new Date(), end = new Date();
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);

        moment(start).format('X');

        Select('Tasks', 'Tasks.id as id,title,description,ex_date as date ,group_id,complete,color,name as group_name',
            `ex_date >= ${moment(start).format('X')} and ex_date <= ${moment(end).format('X')}`,
            'ORDER BY id DESC',
            'LEFT JOIN Groups on Groups.id = group_id').then(r => this.setState({
            Tasks: r,
            refreshing: false,
        }));

    }

    count(id, i) {
        let groups = this.state.Group;

        (new Group()).TaskCount(id).then(r => {
            groups[i] = {...groups[i], count: r};

            this.setState({Group: groups});
        });

    }

    Exit() {
        if (!this._isMounted) {
            return null;
        }

        if (!this.props.navigation.isFocused()) {
            return false;
        }

        if ((this.state.countBack) > Date.now()) {
            this._isMounted = false;
            BackHandler.exitApp();
            return true;
        }

        Notification(Language.message.Exit);

        this.setState({countBack: Date.now() + 1500});

        return false;

    }

    async reloadHome() {
        await this.props.SetSetting({...this.props.setting, loading: true});
    }

    Checked(index) {
        let Tasks = this.state.Tasks;

        index = --index;
        let newComplete = !(Tasks[index].complete === 'true' || Tasks[index].complete === true);

        Tasks[index].complete = newComplete;

        this.setState({Tasks});

        Update('Tasks', `id = ${Tasks[index].id}`, {complete: newComplete}).then();

        this.reloadHome().then();
    }

    noGroups = () => {
        return (
            <View style={this.style.noGroups.view}>
                <Text style={this.style.noGroups.text}>{Language.message.noGroups}</Text>
            </View>
        );
    };
    noTasks = () => {
        return (
            <View style={this.style.noGroups.view}>
                <Text
                    style={this.style.noGroups.text}>{Language.message.noTasksToday}</Text>
            </View>
        );
    };

    GroupBox() {
        return (
            <View style={this.style.Content.wrap} key={'group'}>
                <Text style={this.style.Content.title}>{Language.group.special}</Text>
                <View style={this.style.Content.wrapBoxGroup}>
                    {this.state.Group.length ?
                        this.state.Group.map((item, index) =>
                            ItemGroup(item, index + 'group', true, this.props.SetSetting, this.props.setting)) :
                        this.noGroups()
                    }
                </View>
            </View>
        );
    }

    TasksBox() {
        return (
            <View style={this.style.Content.wrap} key={'task'}>
                <Text style={this.style.Content.title}>{Language.tasks.today}</Text>
                <View style={this.style.Content.wrapBoxGroup}>
                    {this.state.Tasks.length ?
                        this.state.Tasks.map((item, index) => Item(item, index, this.Checked.bind(this), true)) :
                        this.noTasks()
                    }
                </View>
            </View>
        );
    }

    render() {
        return (
            <Container style={this.style.Container}>
                <StatusBar backgroundColor={'#f9faff'} barStyle={'dark-content'}/>
                <Header/>
                <Content style={this.style.Content.main}>
                    {this.GroupBox()}
                    {this.TasksBox()}
                    <View style={this.style.space}/>
                </Content>
                <Fab
                    style={this.style.Fab.btn}
                    position="bottomRight"
                    onPress={() => Actions.CreateTask({group_select: true})}>
                    <Icon name={'plus'} type={'Entypo'} style={this.style.Fab.icon}/>
                </Fab>
            </Container>
        );
    }
}

const StateToProps = (state) => {
    return {
        setting: state.setting,
    };
};

const DispatchInProps = dispatch => {
    return {
        SetSetting: data => {
            dispatch(SetSetting(data));
        },
    };
};

export default connect(StateToProps, DispatchInProps)(Home);
