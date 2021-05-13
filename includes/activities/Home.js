import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Fab, Icon} from 'native-base';
import {BackHandler, FlatList, StatusBar, Text, View} from 'react-native';
import Header from './section/Header';
import Language from '../config/Language';
import Notification from './section/Notification';
import Item from './Elements/List/Item';
import {Actions} from 'react-native-router-flux';
import SQLite from 'react-native-sqlite-storage';
import {Select, Update} from '../functions/Sqlite';
import {SetSetting} from '../redux/actions';
import {Default} from '../config/Stylesheet';

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
        noItem: {
            text: {
                fontFamily: Default.fontFamilyLight,
                color: '#474747',
                fontSize: 14,
            },
            view: {
                margin: 10,
                alignItems: 'center',
            },
        },

    };

    constructor(props) {
        super(props);
        SQLite.DEBUG = true;
        this.state = {
            refreshing: false,
            Tasks: [],
            countBack: Date.now(),
        };
    }

    async componentDidMount() {
        this._isMounted = true;

        this.getData();

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

        Select('Tasks', 'Tasks.id as id,title,description,ex_date as date ,group_id,complete,color,name as group_name',
            '', 'ORDER BY id DESC'
            , 'LEFT JOIN Groups on Groups.id = group_id').then(r => {
            this.setState({Tasks: r, refreshing: false});
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

    Checked(index) {
        let Tasks = this.state.Tasks;

        index = --index;
        let newComplete = !(Tasks[index].complete === 'true' || Tasks[index].complete === true);

        Tasks[index].complete = newComplete;

        this.setState({Tasks});

        Update('Tasks', `id = ${Tasks[index].id}`, {complete: newComplete}).then(
            r => {
                console.log(r);
            },
        );

    }

    noItem = () => {
        return (
            <View style={this.style.noItem.view}>
                <Text style={this.style.noItem.text}>{Language.message.noItem}</Text>
            </View>
        );
    };

    render() {

        return (
            <Container style={this.style.Container}>
                <StatusBar backgroundColor={'#f9faff'} barStyle={'dark-content'}/>
                <Header/>
                <FlatList
                    data={this.state.Tasks}
                    removeClippedSubviews={true}
                    refreshing={this.state.refreshing}
                    onRefresh={this.getData.bind(this)}
                    ListEmptyComponent={this.noItem.bind(this)}
                    ListFooterComponent={<View style={{marginTop: 85}}/>}
                    style={{flex: 1, padding: 15, marginTop: 0, marginBottom: 5}}
                    numColumns={1}
                    onEndReachedThreshold={0.8}
                    key={'h'}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (Item(item, index, this.Checked.bind(this)))}
                />
                <Fab
                    style={this.style.Fab.btn}
                    position="bottomRight"
                    onPress={() => Actions.jump('CreateTask')}>
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
