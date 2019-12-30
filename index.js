const express=require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors')

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" })); 
app.use(cors())
/*===================== Engin ======================================*/
app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutsDir:__dirname + '/views/layouts',
    partialDir:__dirname + '/views/partials'
}))

app.set('view engine','hbs')

/*===================== Css==================================*/
app.set('/css',express.static(__dirname + '/public/css'))

/*==========================================================*/
const jsonParser=bodyParser.json()
/*===================== Port ==============================*/
const port=process.env.port || 3001;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


/*====================== route =======================================*/
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/add_node',(req,res)=>{
    res.render('add_node')
})

app.post('/add_node',(req,res)=>{
    // var title=req.body.title;
    
    fetch('http://localhost:3008/msg',{
        method:'POST',
        body:JSON.stringify(req.body),
        headers:{
            'Content-Type': "application/json"
        }
    }).then((response)=>{
        fetch('http://localhost:3008/msg')
        .then(
            response=>{response.json().then(json=>{

                res.send(json)
            })
            }
        )}
        

)})
