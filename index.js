/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import router from './router';
SQLite.enablePromise(true);

require('./includes/service/Notification/Config');
import BackgroundFetch from 'react-native-background-fetch';
import {init} from './includes/functions/Sqlite';
import ServiceTaskChecker from './includes/service/ServiceTaskChecker';
import SQLite from 'react-native-sqlite-storage';

BackgroundFetch.registerHeadlessTask(async event => {
    await init();
    const {taskId} = event;
    console.log(taskId);
    await ServiceTaskChecker(taskId);
    BackgroundFetch.finish(taskId);
});

AppRegistry.registerComponent(appName, () => router);

