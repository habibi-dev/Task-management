// Requires Sqlite.js library
import {CreateTable, GetItem, Insert, Select, TableExist, Update} from '../functions/Sqlite';
import DeviceInfo from 'react-native-device-info/src/index';

export default class UpdateDatabase {
    version = {};
    last_version_db = 0;

    constructor() {
        this.last_version_db = DeviceInfo.getBuildNumber();
    }

    Add(version, fnc) {
        this.version[version] = fnc;
    }

    async GenerateConfigTable() {

        if (!await TableExist('Config')) {
            await CreateTable('Config', {
                meta_key: 'TEXT NOT NULL UNIQUE',
                meta_value: 'TEXT',
            }, '"meta_key"');
        }
    }

    async SetUpdateDBVersion() {

        if (await TableExist('Config')) {
            const ver = await GetItem('Config', 'last_version_db', 'meta_key');
            if (ver.hasOwnProperty('meta_value')) {
                this.last_version_db = ver.meta_value;
            }
        }

    }

    async UpdateDBVersion(version) {

        if (await Select('Config', '*', 'meta_key = "last_version_db"').length) {
            Update('Config', 'meta_key = "last_version_db"', {
                meta_value: version,
            }).then();
        } else {
            Insert('Config', {
                meta_key: 'last_version_db',
                meta_value: version,
            }).then();
        }
    }

    async run() {
        await this.SetUpdateDBVersion();
        await this.GenerateConfigTable();

        await Object.keys(this.version).map(async (key) => {
            if (parseInt(key) > this.last_version_db) {

                // Run Functions Update
                await this.version[key]();

                // Update last version
                await this.UpdateDBVersion(key);


            }
        });

        return true;
    }
}
