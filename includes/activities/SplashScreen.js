import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import {Actions} from 'react-native-router-flux';
import {AppState, Platform, TouchableOpacity} from 'react-native';
import {CreateIndex, CreateTable, DropTable, init, InsertFromAnotherTable, RenameTable} from '../functions/Sqlite';
import BackgroundFetch from 'react-native-background-fetch';
import ServiceTaskChecker from '../service/ServiceTaskChecker';
import UpdateDatabase from '../classes/UpdateDatabase';
import Language from '../config/Language';

class SplashScreen extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            updating: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;

        // init sqlite
        init();

        // Update Database
        setTimeout(() => this.DBUpdate().then(), 500);

        // init services
        this.initBackgroundFetch().then();

        if (Platform.OS === 'android' && AppState._eventHandlers.change.size === 0) {
            AppState.addEventListener('focus', this.handleAppStateChange.bind(this));
        }
    }

    // Update Database
    async DBUpdate() {
        const Database = new UpdateDatabase();

        const v3 = async () => {
            this.setState({updating: Language.message.Updating});

            // Create new
            await CreateTable('new_Tasks', {
                id: 'INTEGER UNIQUE',
                title: 'TEXT',
                description: 'TEXT DEFAULT null',
                group_id: 'INTEGER',
                ex_date: 'INTEGER DEFAULT 0',
                complete: 'INTEGER DEFAULT 0',
                notification: 'INTEGER DEFAULT 0',
                pin: 'INTEGER DEFAULT 0',
                daily: 'INTEGER DEFAULT 0',
            });

            await CreateTable('new_Groups', {
                id: 'INTEGER UNIQUE',
                name: 'TEXT',
                color: 'TEXT',
                pin: 'INTEGER DEFAULT 0',
            });

            await CreateIndex('Tasks_ex_date', 'new_Tasks', ['ex_date']);
            await CreateIndex('Tasks_ex_date_complete_notification', 'new_Tasks', ['ex_date', 'complete', 'notification']);
            await CreateIndex('Tasks_group', 'new_Tasks', ['group_id']);
            await CreateIndex('Tasks_pin_complete', 'new_Tasks', ['pin', 'complete']);
            await CreateIndex('Groups_pin', 'new_Groups', ['pin']);


            await InsertFromAnotherTable('Groups', 'new_Groups', {id: 'id', name: 'name', color: 'color'});
            await InsertFromAnotherTable('Tasks', 'new_Tasks', {
                id: 'id',
                title: 'title',
                description: 'description',
                group_id: 'group_id',
                complete: 'complete',
            });

            await DropTable('Groups');
            await DropTable('Tasks');

            await RenameTable('new_Groups', 'Groups');
            await RenameTable('new_Tasks', 'Tasks');

            return true;
        };

        Database.Add(3, v3.bind(this));


        await Database.run();

        this.setState({update: true});
    }

    async initBackgroundFetch() {

        await BackgroundFetch.configure({
            minimumFetchInterval: 1,
            enableHeadless: true,
            stopOnTerminate: false,
            forceAlarmManager: true,
            delay: 60000,
            periodic: true,
            startOnBoot: true,
        }, async (taskId) => {  // <-- Event callback
            await ServiceTaskChecker(taskId);
            BackgroundFetch.finish(taskId);
        }, async (taskId) => {  // <-- Task timeout callback
            // This task has exceeded its allowed running-time.
            // You must stop what you're doing and immediately .finish(taskId)
            BackgroundFetch.finish(taskId);
        });
    }

    addEvent(taskId) {
        // Simulate a possibly long-running asynchronous task with a Promise.
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    componentWillUnmount() {
        this._isMounted = false;

        AppState.removeEventListener('focus', this.handleAppStateChange.bind(this));
    }

    componentDidUpdate() {
        if (this.props.rehydrated && this.state.update) {
            return this.goToHome();
        }
    }

    goToHome() {
        setTimeout(() => Actions.replace('drawer'), 500);
    }

    handleAppStateChange() {
        if (this._isMounted && this.props.name === 'SplashScreen' && this.props.rehydrated) {
            return this.goToHome();
        }
    }

    render() {

        return (
            <>
                <Loading text={this.state.updating}/>
            </>

        );
    }
}

const StateToProps = (state) => {
    return {
        setting: state.setting,
        rehydrated: state.rehydrated,
    };
};

export default connect(StateToProps)(SplashScreen);
