const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://stdnt-cl_pudou:Mongo7mg2Us3r_@stdnt-cl-cfp6k.mongodb.net/omnistack?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// HTTP METHODS - Get (browser standard), Post (dbConnection or forms that does it), 
// req.query = Acess query params (filters)
// req.params = Acess routes params (for edition and deletion)
// req.body = Acces de requisition's body (to creation or edition)

app.use(cors());// by passing an argv with an obj which the prop is "origin", and the value the whitelisted domain . 
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
