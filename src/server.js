const express = require("express");
const bodyParser = require('body-parser');
const app = express();


const login = require('./backendroutes/login');
const register = require('./backendroutes/registerUser');
const userData = require('./backendroutes/getData');
const addEmployee = require('./backendroutes/addEmployee');
const getEmp = require('./backendroutes/getEmployee');
const updateEmp = require('./backendroutes/updateEmployee');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/login', login);
app.post('/register', register);
app.post('/addEmp', addEmployee);
app.get('/userData', userData);
app.get('/getEmployee/:id', getEmp);
app.post('/updateEmployee/:id', updateEmp);

//404 page pending

const port = 8000;

app.listen(port, () => console.log(`Server started on ${port}`));