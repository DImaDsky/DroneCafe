const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//heroku config:get MONGODB_URI
const heroku_url = 'mongodb://heroku_7bgdqq7d:eo2nlajh0bqhgr6jl9ccrdlgam@ds153652.mlab.com:53652/heroku_7bgdqq7d';

const url = 'mongodb://localhost:27017/droneCafe';
mongoose.connect(heroku_url);
let db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.once('open', () => {
    console.log('');
});

module.exports = {
    mongoose:mongoose,
    db:db
};