import {connect} from 'moongose';
import { config } from '../config/index.js';

export async function connectionDB() {
    try {
        await connect(config.db.url);
        console.log('Mongoodb connectedd!!!!!');
    } catch (error) {
        console.log('DB connection fail');
        process.exit(1);
    }
}