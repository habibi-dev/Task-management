import SQLite from 'react-native-sqlite-storage';

export const init = () => {
    SQLite.enablePromise(true);

    SQLite.openDatabase({name: 'database', createFromLocation: '~database.db'}).then((DB) => {
        global.db = DB;
    }).catch((error) => {
        console.log(error);
    });
};

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    global.db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
            (error) => {
                reject(error);
            });
    });
});

export const Select = async (TableName, Select = '*', Where = '', Order = '', join = '') => {

    Where = Where.length ? `where ${Where}` : '';

    return await ExecuteQuery(`SELECT ${Select}
                               FROM ${TableName} ${join} ${Where} ${Order}`, []).then((selectQuery) => {
        return selectQuery.rows.raw();
    });
};

export const Insert = async (TableName, Data = {}) => {

    const keys = Object.keys(Data).toString(), values = `'` + Object.values(Data).join(`','`) + `'`;

    return await ExecuteQuery(`INSERT INTO ${TableName} (${keys})
                               VALUES (${values})`);
};

export const Update = async (TableName, Where, Data = {}) => {

    const keys = Object.keys(Data);
    let Set = [];

    keys.map(item => Set.push(`${item} = '${Data[item]}'`));

    return await ExecuteQuery(`UPDATE ${TableName}
                               SET ${Set.toString()}
                               WHERE ${Where}`);
};


export const Delete = async (TableName, Id, WhereType = 'id') => {
    return await ExecuteQuery(`DELETE
                               FROM ${TableName}
                               WHERE ${WhereType} = ${Id}`);
};

