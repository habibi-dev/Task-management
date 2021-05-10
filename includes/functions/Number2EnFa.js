export default (data, target = 'en') => {
    let find, replace;
    if (target === 'en') {
        replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    } else {
        find = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        replace = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    }
    data = String(data);
    let replaceString = data;
    let regex;
    for (let i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};
