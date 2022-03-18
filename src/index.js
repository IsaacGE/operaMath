const app = require('./app')
const dbCtrl = require('./controllers/db.ctrl')

app.listen(process.env.PORT, () => {
    console.log('Server running in PORT:', process.env.PORT);
});