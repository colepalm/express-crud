const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://polecalm:polecalm1@ds023530.mlab.com:23530/crud-people', (err, database) => {
  if (err) return console.log(err)
  db = database

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('people').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {people: result})
  })
})

app.post('/people', (req, res) => {
  db.collection('people').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('post complete')
    res.redirect('/')
  })
})

app.put('/people', (req, res) => {
  db.collection('people')
  .findOneAndUpdate({firstName: 'Yoda'}, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/people', (req, res) => {
  db.collection('people').findOneAndDelete({firstName: req.body.firstName},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('A spanish inquisition got deleted')
  })
})
