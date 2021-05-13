import {Drawer, Lightbox, Router, Scene, Stack} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import store from './includes/redux/store';
import React from 'react';
import {Root} from 'native-base';
import Home from './includes/activities/Home';
import SplashScreen from './includes/activities/SplashScreen';
import Show from './includes/activities/Show';
import DatePicker from './includes/activities/DatePicker';
import CreateTask from './includes/activities/CreateTask';
import GroupPicker from './includes/activities/GroupPicker';
import DrawerComponent from './includes/activities/section/DrawerComponent';
import CreateGroup from './includes/activities/Groups/CreateGroup';
import ColorPicker from './includes/activities/ColorPicker';
import GroupTask from './includes/activities/GroupTask';

const RouterWithRedux = connect()(Router);

export default () => {

    return (
        <Root>
            <Provider store={store}>
                <RouterWithRedux>
                    <Lightbox>
                        <Scene hideNavBar key={'root'}>
                            <Scene key="SplashScreen" component={SplashScreen} initial/>
                            <Drawer key="drawer" drawerPosition={'right'} contentComponent={DrawerComponent}>
                                <Stack key="drawer" hideNavBar duration={0}>
                                    <Scene key="Home" component={Home}/>
                                    <Scene key="GroupTask" component={GroupTask}/>
                                    <Scene key="Show" component={Show} animationEnabled={false}/>
                                    <Scene key="CreateTask" component={CreateTask} back={false}/>
                                    <Scene key="CreateGroup" component={CreateGroup} back={false}/>
                                </Stack>
                            </Drawer>
                        </Scene>
                        <Scene key="DatePicker" component={DatePicker} back={false}/>
                        <Scene key="GroupPicker" component={GroupPicker} back={false}/>
                        <Scene key="ColorPicker" component={ColorPicker} back={false}/>
                    </Lightbox>
                </RouterWithRedux>
            </Provider>
        </Root>
    );
}
