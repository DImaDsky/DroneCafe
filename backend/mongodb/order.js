const socketIo = require('../socket/index'),
    {mongoose, db} = require('./mongooseConnect');

let orderSchema = new mongoose.Schema({
    id: String,
    title: String,
    email: String,
    status: String,
});

let Orders = db.model('orders', orderSchema);
Orders.on('error', function(error) {
    console.log(error);
});

module.exports = {
    find: function (data, cb) {
        Orders.find(data, null, (err, orders) => {
            if(err){console.log(err)}
            cb(orders);
        });
    },
    add: function (email, orders, cb) {
        let promises = [];
        if(orders.length){
            orders.forEach(item => {
                item.email = email;
                item.status = 'Ordered';

                let order = new Orders(item);
                promises.push(new Promise(resolve => {
                    order.save((err, result)=>{
                        if(err){console.log(err)}
                        resolve();
                    });
                }));
            });
            Promise.all(promises).then(() => {
                cb();
            });
            socketIo.io.sockets.emit('new-order', orders);
        }
    },
    change: function (dish, cb) {//from  io
        Orders.update({email: dish.email, id: dish.id}, { $set: { status: dish.status }}, (err, result) => {
            if(err){console.log(err)}
            if(cb) {
                cb();
            }
        });
    },
    remove: function (dish, cb) {
        Orders.remove({email: dish.email, id: dish.id, status: dish.status}, (err, result) => {
            if(err){console.log(err)}
            if(cb) {
                cb();
            }
        });
    }
};