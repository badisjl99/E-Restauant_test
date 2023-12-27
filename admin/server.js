
const express = require('express') ;
const cors = require('cors');
const bodyparser = require('body-parser') ;
const adminroutes = require('./routes/adminroutes');

const port = 9999 ;

const app = express() ;

app.use(cors());
app.use(express.json());


app.use('/admin',adminroutes);

app.listen(port,()=>{

console.log(`Server is Running or port : ${port}`);

});







