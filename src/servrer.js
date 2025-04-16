import * as a from './app.js';
import { config } from 'config/index.js';
import { connectionDB } from './db/index.js';

function bootstrap(){
    try {
        connectionDB();
        appendFile.listen(config.api.port, () => {
            console.log(`Server running on port ${config.api.port}`);
        });
    } catch (e) {
        console.log('Exit: ', e.message);
        process.exit(1);
    }
}


bootstrap();