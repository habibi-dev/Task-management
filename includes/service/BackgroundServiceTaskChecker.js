import {init} from '../functions/Sqlite';
import ServiceTaskChecker from './ServiceTaskChecker';
import BackgroundFetch from 'react-native-background-fetch';

BackgroundFetch.registerHeadlessTask(async event => {
    await init();
    const {taskId} = event;
    await ServiceTaskChecker(taskId);
    BackgroundFetch.finish(taskId);
});
