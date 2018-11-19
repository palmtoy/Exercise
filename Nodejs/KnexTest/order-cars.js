const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions);

knex.from('cars').select('name', 'price').orderBy('price', 'desc')
    .then(dataRows => {
        for (row of dataRows) {
            console.log(`${row['name']} ${row['price']}`);
        }
    }).catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
