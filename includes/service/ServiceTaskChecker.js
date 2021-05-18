import {NotificationSend} from './Notification/Notification';
import {Select, Update} from '../functions/Sqlite';
import Language from '../config/Language';

export default async (taskId) => {

    const time = new Date().getTime() / 1000,
        Tasks = await Select('Tasks', 'Tasks.id as id,title,description,ex_date as date ,group_id,complete,color,name as group_name',
            `complete = 0 And notification = 0 And ex_date < ${time} And ex_date != 0`, 'ORDER BY id DESC'
            , 'LEFT JOIN Groups on Groups.id = group_id');

    Tasks.map(task => {
        NotificationSend(task.id, task.title + ' - ' + Language.global.Expired, Language.message.Expired.replace('%1', task.title).replace('%2', task.group_name), Language.global.Expired, task.color, task);

        // Update
        Update('Tasks', `id = ${task.id}`, {notification: 1});
    });

};
