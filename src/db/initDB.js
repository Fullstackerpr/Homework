import path from "node:path";
import db from '../db/index.js';
import { readFileSync } from "node:fs";


function initDB() {
    try {
        const file = path.join('src/db/init.sql');
        const sql = readFileSync(file, 'utf-8');
        db.query(sql);
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

initDB();