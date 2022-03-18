const session = require('express-session');
const app = require('../app')
const connection = require('../database/db');

const dbCtrl = {}

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

dbCtrl.getAdmin = app.get('/administracion', (req, res) => {
    if (req.session.loggedin && req.session.id_user == 1) {
        connection.query('SELECT usr.username, hist.numero1, hist.numero2, hist.tipo, hist.resultado, hist.fecha FROM historial hist INNER JOIN usuarios usr ON hist.id_usuario = usr.id WHERE id_usuario != 1', async(error, results) => {
            res.render('pages/administracion', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                consult: results
            });
        })
    } else {
        res.render('pages/login', {
            login: false
        });
    }
})
dbCtrl.getLogin = app.get('/login', (req, res) => {
    if (req.session.loggedin) {
        id_usuario = req.session.id_user;
        connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_usuario], async(error, results) => {
            res.render('pages/index', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                operaciones: results
            });
        })
    } else {
        res.render('pages/login', {
            login: false
        });
    }
})

dbCtrl.getRegister = app.get('/register', (req, res) => {
    if (req.session.loggedin) {
        id_usuario = req.session.id_user;
        connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_usuario], async(error, results) => {
            res.render('pages/index', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                operaciones: results
            });
        })
    } else {
        res.render('pages/register', {
            login: false
        });
    }
})
dbCtrl.getHistory = app.get('/my-history', (req, res) => {
    if (req.session.loggedin) {
        id_usuario = req.session.id_user;
        connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_usuario], async(error, results) => {
            res.render('pages/historial', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                operaciones: results
            });
        })
    } else {
        res.render('pages/index', {
            login: false,
            name: 'Crea una cuenta y/o inicia sesión para comenzar'
        });
    }
})


dbCtrl.getHome = app.get('/', (req, res) => {
    if (req.session.loggedin) {
        id_usuario = req.session.id_user;
        connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_usuario], async(error, results) => {
            res.render('pages/index', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                operaciones: results
            });
        })
    } else {
        res.render('pages/index', {
            login: false,
            name: 'Crea una cuenta y/o Inicia sesión para comenzar a realizar tus operaciones',
        });
    }
});


dbCtrl.postRegister = app.post('/register', async(req, res) => {
    const { nombre, username, pass } = req.body;
    var date = new Date();

    connection.query('SELECT * FROM usuarios WHERE username = ?', [username], async(error, results) => {
        if (results.length > 0) {
            res.render('pages/register', {
                login: false,
                alert: true,
                alertTitle: "¡Espera!",
                alertMessage: "¡El nombre de usuario " + username + " no esta disponible o ya esta en uso!",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 5000,
                ruta: 'register'
            });
        } else {
            connection.query('INSERT INTO usuarios(nombre, username, pass, rol, fecha) VALUES(?,?,?,?,?)', [nombre, username, pass, "user", date], async(error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.render('pages/register', {
                        login: false,
                        alert: true,
                        alertTitle: "Listo",
                        alertMessage: "¡Te has registrado!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: 5000,
                        ruta: 'login'
                    });
                }
            });
        }
    })
})


dbCtrl.postLogin = app.post('/auth', async(req, res) => {
    const { username, pass } = req.body;
    connection.query('SELECT * FROM usuarios WHERE username = ? and pass = ?', [username, pass], async(error, results, fields) => {
        if (error) {
            console.log('El error es: ', error)
        } else if (results.length > 0) {
            //creamos una var de session y le asignamos true si INICIO SESSION
            req.session.loggedin = true;
            req.session.id_user = results[0].id;
            req.session.name = results[0].nombre;
            req.session.username = results[0].username;
            res.render('pages/login', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                alert: true,
                alertTitle: "Hola " + results[0].username,
                alertMessage: "¡Comienza a realizar tus operaciones!",
                alertIcon: 'success',
                showConfirmButton: true,
                timer: 5000,
                ruta: ''
            });
        } else {
            res.render('pages/login', {
                login: true,
                id: req.session.id_user,
                name: req.session.name,
                username: req.session.username,
                alert: true,
                alertTitle: "Credenciales incorrectas",
                alertMessage: "Usuario y/o contraseña incorrectos",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 5000,
                ruta: 'login'
            });
        }
        res.end();
    });
});


dbCtrl.postSaveResult = app.post('/save-result', async(req, res) => {
    const date = new Date();
    const fecha = date.toLocaleString();
    const { tipo, num1, num2, result, id_usuario } = req.body;

    connection.query('INSERT INTO historial(id_usuario, tipo, numero1, numero2, resultado, fecha) VALUES(?,?,?,?,?,?)', [id_usuario, tipo, num1, num2, result, fecha], async(error, results) => {
        if (error) {
            console.log('Error en', error)
        } else {
            connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_usuario], async(error, rows) => {
                res.render('pages/index', {
                    login: true,
                    id: req.session.id_user,
                    name: req.session.name,
                    username: req.session.username,
                    operaciones: rows,

                    alert: true,
                    alertTitle: "¡Operación Almacenada!",
                    alertMessage: "Tu Operación con resultado se ha almacenado con éxito",
                    alertIcon: 'success',
                    showConfirmButton: true,
                    timer: 5000,
                    ruta: ''
                });
            })
        }
    })
})


dbCtrl.postUpdateUser = app.post('/update-user', async(req, res) => {
    const { nombre, password } = req.body;
    const id_user = req.session.id_user;
    const date = new Date();
    connection.query('UPDATE usuarios SET nombre = ? WHERE id = ? and pass = ?', [nombre, id_user, password], async(error, results) => {
        if (error) {
            throw error;
        } else {
            connection.query('SELECT * from usuarios WHERE nombre = ? AND id = ?', [nombre, id_user], async(err, results) => {
                if (results.length > 0) {
                    connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_user], async(error, results) => {
                        res.render('pages/index', {
                            login: true,
                            id: req.session.id_user,
                            name: req.session.name,
                            username: req.session.username,
                            operaciones: results,

                            alert: true,
                            alertTitle: "¡Información Actualizada!",
                            alertMessage: "Tu nombre ha sido modificada el " + date,
                            alertIcon: 'success',
                            showConfirmButton: true,
                            timer: 5000,
                            ruta: ''
                        });
                    })
                } else {
                    connection.query('SELECT tipo, numero1, numero2, resultado, fecha FROM historial WHERE id_usuario = ?', [id_user], async(error, results) => {
                        res.render('pages/index', {
                            login: true,
                            id: req.session.id_user,
                            name: req.session.name,
                            username: req.session.username,
                            operaciones: results,

                            alert: true,
                            alertTitle: "¡Algo no cuadra!",
                            alertMessage: "Verifica tu contraseña y/o intenenta más tarde",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: 5000,
                            ruta: ''
                        });
                    })
                }
            })
        }
    })
})

dbCtrl.useClearCache = app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

dbCtrl.getLogout = app.get('/logout', function(req, res) {
    req.session.destroy(() => {
        res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
    })
});

module.exports = dbCtrl