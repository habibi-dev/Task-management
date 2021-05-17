import React, {useEffect, useRef} from 'react';
import {Animated, BackHandler, ScrollView, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

const style = {
    Container: {
        main: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.3)',
            justifyContent: 'flex-end',

        },
    },
    Content: {
        main: {
            position: 'relative',
            zIndex: 33,
            elevation: 3,
            backgroundColor: '#ffffff',
            padding: 15,
            flex: 0,
            height: 'auto',
            maxHeight: '70%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
        },
    },
    Close: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
        zIndex: 1,
    },
};

const animateIn = (setOpacityAnimate, setMarginBottomAnimate) => {
    Animated.timing(setOpacityAnimate, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
    }).start();

    Animated.timing(setMarginBottomAnimate, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
    }).start();
};

const animateOut = (setOpacityAnimate, setMarginBottomAnimate) => {
    Animated.timing(setMarginBottomAnimate, {
        toValue: -500,
        duration: 800,
        useNativeDriver: false,
    }).start(() => {
        Animated.timing(setOpacityAnimate, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start(() => Actions.pop());
    });
};


export default (props) => {
    const {closeBox = false} = props;
    const opacityAnimate = useRef(new Animated.Value(0)).current;
    const marginBottomAnimate = useRef(new Animated.Value(-500)).current;

    let status = true;

    useEffect(() => {
        animateIn(opacityAnimate, marginBottomAnimate);
        BackHandler.addEventListener('hardwareBackPress', () => close());

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => close());
        };
    });

    const close = () => {
        if (!status) {
            return null;
        }

        status = false;

        animateOut(opacityAnimate, marginBottomAnimate);

        return true;
    };

    if (closeBox) {
        close();
    }

    return (
        <Animated.View style={[style.Container.main, {opacity: opacityAnimate}]}>
            <TouchableOpacity onPress={() => close()} style={style.Close}/>
            <Animated.View style={[style.Content.main, {marginBottom: marginBottomAnimate}]}>
                <ScrollView style={{flex: 0}}>
                    {props.children}
                </ScrollView>
            </Animated.View>
        </Animated.View>
    );
}
