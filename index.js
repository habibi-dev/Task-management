/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import router from './router';

require('./includes/service/Notification/Config');
require('./includes/service/BackgroundServiceTaskChecker');

AppRegistry.registerComponent(appName, () => router);

