const {mongoose, db} = require('./mongooseConnect');

let accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    credits: Number
});

let User = db.model('users', accountSchema);
User.on('error', function(error) {
    console.log(error);
});

module.exports = {
    find: function (email, cb) {
        User.findOne({email: email}, null, (err, user) => {
            if (err) {console.log(err)}
            cb(user);
        });
    },
    save: function (userData, cb) {
        let user = new User(userData);
        user.save((err, result) => {
            if(err){console.log(err)}
            if (cb) {cb(userData)}
        });
    },
    topUp: function (email, credits, cb) {
        User.update({email: email}, { $inc: { credits: credits }}, (err, result) => {
            if (err){console.log(err)}
            if (cb) {cb(result)}
        });
    }
};