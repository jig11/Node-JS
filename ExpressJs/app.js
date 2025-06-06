const express = require('express')
const dateMiddleware = require('./requestDateMiddleware');
const morgan = require('morgan');
const pinologger = require('./pinoMiddleware');
const path = require('path')

const app = express()
const port = 3000

//To read data from request body
app.use(express.json());
// morgan middleware - Logging
app.use(morgan(':method :url :status - :response-time ms')); //morgan('dev'),morgan('combined'),morgan('tiny'), morgan(':method :url :status - :response-time ms')
//custom middleware
app.use(dateMiddleware);
// static file serving middleware
app.use(express.static(path.join(__dirname, 'public')));

// const port2 = 3005
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hi',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index1.html'));
})

app.get('/middleware', (req, res) => {
  res.send(`middleware page ${req.requestDate} ${req.name} ${res.value} ${req.myurl}`)
  //pino logger middleware
  pinologger.info(req.requestDate);
  pinologger.error(req.name); //get method
  pinologger.warn('This is a warning message');
  pinologger.fatal('This is a fatal message');
  //  pinologger.debug('This is a debug message');
  //   pinologger.trace('This is a trace message');
})

app.get('/test', (req, res) => {
  res.send('Hello Tests!!!')
})

app.get('/posts', (req, res) => {
    res.send('Hello Posts!')
})

app.get('/products/:prodid/:name/:price/:color', (req, res) => {
  const productId = req.params.prodid;
  const  prodname = req.params.name;
  const price = req.params.price;
  const color = req.params.color; 
  const product = {id:productId, name:prodname,price:price,color:color}
  res.json(product);
})

var userData = [];
app.post('/users', (req, res) => {
    const userParam = req.body;
    userParam.userId = 1;
    userData.push(req.body);
    
    res.send('user created successfully!');
  })

app.get('/users', (req, res) => {
   res.json(userData);
})

app.put('/users/:userId/:address', (req, res) => {
  var userId = req.params.userId;
  var address = req.params.address;

  userData[0]["address"] = address;
  res.send(`User with Id ${userId} has been updated with Address:${address} !`)
})

app.delete('/users/:userId', (req, res) => {
  var userId = req.params.userId;
  userData.pop();
  res.send(`User with Id ${userId} has been deleted !`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.listen(port2, () => {
//     console.log(`Example app listening on port ${port2}`)
//   })