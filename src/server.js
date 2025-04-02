import express from 'express';
import client from './db.js';

const app = express();

app.use(express.json());



app.get('/user', async(req, res, next) => {
    try{
        const query = `SELECT * from users`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});



app.post('/user', async(req, res, next) => {
    try{
        const body = req.body;

        const query = `insert into 
            users (
                first_name, 
                email, 
                password, 
                phone_number, 
                address
            ) 
            values(
                $1, 
                $2,
                $3,
                $4,
                $5
            ) returning *` 

        const result = await client.query(query, 
            [
                body.first_name, 
                body.email, 
                body.password, 
                body.phone_number, 
                body.address
            ]);
            res.status(201).json(result.rows); 

    } catch (e){
        res.send(e.mesaage);
    }
});


app.listen(3000, () => {
    console.log('Server is running on 3000');
});