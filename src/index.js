require('./models/User');
require('./models/Track');

const express = require ('express');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const tracksRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const app = express();


app.use(bodyParser.json());
app.use(authRoutes);
app.use(tracksRoutes);


const mongoUri= 'mongodb+srv://PlayerOne:PlayerOne@cluster0.egecv.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('connected to mongoose')
});

mongoose.connection.on('error',(err)=>{
    console.log('Error connecting to monogo',err)
});




app.get('/',requireAuth,(req,res)=>{
res.send(`your email: ${req.user.email}`)
});

app.listen(3000,()=>{
    console.log('listen on port 3000');
    console.log('hello')
}) 