const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bt1o7g8l3mxcb7lqln7q-mysql.services.clever-cloud.com',
    user: 'up6mriwwo9mone7c',
    password: 'xfkmiq2M920UGy7BD9LW',
    database: 'bt1o7g8l3mxcb7lqln7q'
});

connection.connect(function(error) {
    if (error) {
        console.log(error.message);
        return;
    } else {
        console.log('Data Base Connection success!');
    }
});

module.exports = connection;