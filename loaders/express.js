const express = require('express')




const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.listen(process.env.PORT ?? 3000, ()=>{
    console.log(`listening on port`, process.env.PORT,   new Date());
});