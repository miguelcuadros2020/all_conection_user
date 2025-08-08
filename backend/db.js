require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
port = process.env.PORT || 3000;


const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {rejectUnauthorized: false}
});

app.use(cors());
app.use(express.json());

pool.query('SELECT NOW()', err => {
    if (err){
        console.error('Error connecting to the database', err)
    }else{
        console.log('connected to the database')
    }
});

//CRUDs de los endpoints
app.get('/users', async(req,res) => {
    try{
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al obtener los usuarios'})
    }
})
app.get('/task')
//CREATE crear usuarios
app.post('/users', async(req,res) => {
    const {name, email, password} = req.body;
    try{
        const result = await pool.query('INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al crear el usuario'})
    }
});

app.get('/users/:id', async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('SELECT u.username, u.email, u.password_hash, ')
    }
})

app.listen(port,() =>{
    console.log(`Server running on http://localhost:${port}`)
})