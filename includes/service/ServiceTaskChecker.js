import moment from 'moment';

export default () => {
    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm'));
}
