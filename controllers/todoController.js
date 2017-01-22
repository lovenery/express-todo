const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// dummy data
// let data = [ { item: 'mail' }, { item: 'run' }, { item: 'coding'} ]

const mongoose = require('mongoose')
mongoose.Promise = global.Promise // use native mongoose promises﻿
mongoose.connect('mongodb://test:test@ds039860.mlab.com:39860/todo')
const todoSchema = new mongoose.Schema({
  item: String
})
let Todo = mongoose.model('Todo', todoSchema)
// var testdata = Todo({item: 'test'}).save(function (err) {
//   if (err) { throw err }
//   console.log('item saved');
// })

module.exports = function (app) {

app.get('/todo', function (req, res) {
  Todo.find({}, function (err, data) {
    if (err) throw err
    res.render('todo', {
      todos: data
    })
  })
  // res.render('todo', {
  //   todos: data
  // })
})

app.post('/todo', urlencodedParser, function (req, res) {
  var newTodo = Todo(req.body).save(function (err, data) {
    if (err) throw err
    res.json(data)
  })
  // data.push(req.body)
  // res.json(data)
})

app.delete('/todo/:item', function (req, res) {
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
    if (err) throw err
    res.json(data)
  })
  // data = data.filter(function (todo) {
  //   return todo.item.replace(/ /g, '-') !== req.params.item
  // })
  // res.json(data)
})

}
