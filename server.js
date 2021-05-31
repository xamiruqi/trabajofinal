const express = require('express')
const mysql = require('mysql')
const app = express()
const port = process.env.PORT || 3000
const nodemailer = require('nodemailer')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

app.get('/start', (req, res) => res.render('pages/index'))
app.get('/models', (req, res) => res.render('pages/models'))
app.get('/apply', (req, res) => res.render('pages/apply'))
app.get('/news', (req, res) => res.render('pages/news'))
app.get('/aboutUs', (req, res) => res.render('pages/abtus'))


//conexion
const connection = mysql.createConnection({
    host: 'freedb.tech',
    user: 'freedbtech_xamiralp',
    password: 'agenciasXami',
    database: 'freedbtech_trabajoFinalXamiDB'
})

//check connect
connection.connect(error => {
    if (error) throw error;
    console.log('Database running ');
})

app.get('/applied', (req, res) => {
    const sql = 'SELECT * FROM models'; 

    connection.query(sql, (error, results) => {
        if (error) { 
            throw error;
        }
        res.render('pages/applied', {
            'results': results
        })
    })
});


app.get('/register', (req, res) => res.render('pages/form'))

app.post('/register', (req, res) => {
    const sql = `SELECT * FROM models WHERE email = '${req.body.email}'`;
    const sql2 = 'INSERT INTO models SET ?';

    const {
        name,
        last_name,
        email,
        gender,
        city,
        bio,

    } = req.body;

    contentHTML = `
    <h1> there's a new application! </h1>


        <ul>
            <li> Name: ${name}</li>
            <li>Last Name: ${last_name}</li>
            <li>E-Mail: ${email}</li>
            <li>Gender: ${gender}</li>
            <li>City: ${city}</li>
        </ul>

        <p>${bio}</p>
`

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alaskanebraskarrrg@gmail.com',
            pass: '@#1234aaa'
        }
    })

    const info = {
        from: 'alaskanebraskarrrg@gmail.com',
        to: 'xamira06@gmail.com',
        subject: 'Applying Form',
        html: contentHTML
    }

    connection.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        if (!results.length > 0) {
            const modelsObj = {
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                city: req.body.city
            }

            connection.query(sql2, modelsObj, error => {
                if (error) {
                    throw error;
                }


            });

        }
        // enviar correo
        transporter.sendMail(info, error => {
            if (error) {
                throw error;
            } else {
                console.log('email enviado')
            }
        })
    })
    res.render('pages/index')
})



app.listen(port, () => console.log('sever running'))