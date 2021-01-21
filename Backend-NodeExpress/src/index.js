require('dotenv').config();

const app = require('./app');
require('./database');


async function main() {
    await app.listen(app.get('port'));
    console.log('Sever running on port ' + app.get('port'));
}

main();
