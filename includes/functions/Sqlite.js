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

export const GetVersion = async () => {

    return await ExecuteQuery(`select sqlite_version();`, []).then((selectQuery) => {
        return selectQuery.rows.raw();
    });
};

export const RenameTable = async (oldTable, newTable) => {

    return await ExecuteQuery(`ALTER TABLE ${oldTable} RENAME TO ${newTable}`, []).then((selectQuery) => {
        return selectQuery.rows.raw();
    });
};

export const TableExist = async (TableName) => {
    return await ExecuteQuery(`PRAGMA table_info(${TableName})`, []).then((selectQuery) => {
        return !!selectQuery.rows.length;
    });
};

export const CreateTable = async (TableName, Data = {}, primary = '"id" AUTOINCREMENT') => {

    const keys = Object.keys(Data);
    let query = '';

    keys.map(key => {
        query += `"${key}" ${Data[key]},`;
    });

    query += ` PRIMARY KEY (${primary})`;

    return await ExecuteQuery(`CREATE TABLE "${TableName}"
                               (
                                   ${query}
                               );`, []).then((selectQuery) => {
        return TableExist(TableName);
    });
};

export const DropTable = async (TableName) => {
    return await ExecuteQuery(`DROP TABLE ${TableName};`, []).then((selectQuery) => {
        return !TableExist(TableName);
    });
};

export const EmptyTable = async (TableName) => {
    return await ExecuteQuery(`DELETE
                               FROM ${TableName};`, []).then((selectQuery) => {
        return selectQuery.rows.hasOwnProperty('length') && !selectQuery.rows.length;
    });
};

export const CreateIndex = async (IndexName, TableName, fields = []) => {

    fields = `'` + Object.values(fields).join(`','`) + `'`;

    return await ExecuteQuery(`CREATE
    INDEX "${IndexName}" ON "${TableName}" ("${fields}");`, []).then((selectQuery) => {
        return selectQuery.rows;
    });
};

export const InsertFromAnotherTable = async (From, To, fields = {from_field: 'to_field'}) => {

    const from_key = Object.keys(fields).toString(), to_key = Object.values(fields).toString();

    return await ExecuteQuery(`INSERT INTO ${To} (${to_key})
                               SELECT ${from_key}
                               FROM ${From};`, []).then((selectQuery) => {
        return selectQuery.rows;
    });
};

