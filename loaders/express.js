const express = require('express')
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/test', (req, res) => {
    res.status(200).send('.');
});

//APIS

app.use('/users', require("../routes/users"))

app.listen(process.env.PORT ?? 3000, ()=>{
    console.log(`listening on port`, process.env.PORT,   new Date());
});