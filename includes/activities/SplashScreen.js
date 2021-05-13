import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import {Actions} from 'react-native-router-flux';
import {AppState, Platform} from 'react-native';
import {init} from '../functions/Sqlite';

class SplashScreen extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;

        // init sqlite
        init();

        if (Platform.OS === 'android' && AppState._eventHandlers.change.size === 0) {
            AppState.addEventListener('focus', this.handleAppStateChange.bind(this));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;

        AppState.removeEventListener('focus', this.handleAppStateChange.bind(this));
    }

    componentDidUpdate() {
        if (this.props.rehydrated) {
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
            <Loading/>
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
