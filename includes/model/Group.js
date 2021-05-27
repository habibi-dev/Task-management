import {Select, Update} from '../functions/Sqlite';

export default class Group {

    async pinToggle(item) {
        let new_state = !item.pin ? 1 : 0;

        return await Update('Groups', `id = ${item.id}`, {pin: new_state});
    }

    async TaskCount(id) {
        let resT = await Select('Tasks', 'count(id) as count', `group_id = ${id}`),
            resC = await Select('Tasks', 'count(id) as count', `group_id = ${id} and complete = 'true'`);

        resT = resT.length && resT[0].hasOwnProperty('count') ? resT[0].count : 0;
        resC = resC.length && resC[0].hasOwnProperty('count') ? resC[0].count : 0;

        return {total: resT, complete: resC};
    }
}
