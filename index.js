/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import router from "./router";

AppRegistry.registerComponent(appName, () => router);
