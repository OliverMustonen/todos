const app = require('./app');
mongoose = require('mongoose');

const PORT = process.env.PORT || 9999;

const serverURI = 'http://localhost:' + PORT;
const mongoURI = 'mongodb+srv://Oliver:mongoDB99@clusterlearning.qz768bv.mongodb.net/test';

app.listen(PORT, () => console.log('Webserver running at: ' + serverURI));

mongoose
.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Connected to the database'));