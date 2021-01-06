/**
 * @format
 */

import {AppRegistry} from 'react-native'
import AppProvider from './AppProvider'
import {name as appName} from './app.json'
import {LogBox} from 'react-native'
LogBox.ignoreLogs(['Remote debugger'])
LogBox.ignoreWarnings([""]);

AppRegistry.registerComponent(appName, () => AppProvider)
