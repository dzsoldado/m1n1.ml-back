const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')

const redirector = require('./routes/redirector')
const api = require('./routes/api')

// Initialization 
const port = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(cors({origin: '*'}))
app.use(bodyParser.json())

// Routes
app.use('/', redirector)
app.use('/api', api)



app.get('/favicon.ico', (req,res)=>{
  res.send()
})
app.get('*', (req, res)=>{
  res.send('404 Page Not Found')
})

app.listen(port, () => console.log(`App app listening on port ${port}!`));