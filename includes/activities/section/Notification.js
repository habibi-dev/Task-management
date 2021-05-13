import {Toast} from 'native-base';
import {Default} from '../../config/Stylesheet';
import Language from '../../config/Language';
/*
 * Type Support : success,warning,danger
*/
export default (msg, type = {}, duration = 3000, position = 'bottom', Retry = false, FunctionClose, TextRetry = Language.global.retry) => {
    let Btn = {};
    if (Retry) {
        Btn = {
            buttonText: TextRetry,
            buttonTextStyle: {color: '#fff', fontFamily: Default.fontFamily, fontSize: 10},
            buttonStyle: {backgroundColor: '#c0392b'},
            onClose: FunctionClose,
        };
    }

    return Toast.show({
        text: msg,
        textStyle: {fontFamily: Default.fontFamily, fontSize: 13, textAlign: 'right'},
        style: {flexDirection: 'row-reverse'},
        duration,
        type,
        position,
        ...Btn,
    });
}
