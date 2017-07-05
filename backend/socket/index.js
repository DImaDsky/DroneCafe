let order,
    io,
    droneApi,
    socketsUsers = {},
    connected = 0;

module.exports.init = function (httpServer) {
    io = require('socket.io').listen(httpServer);
    order = require('../mongodb/order');
    module.exports.io = io;
    droneApi = require('netology-fake-drone-api');

    function statusChange(dish) {//TODO:  dishoperation module
        order.change(dish, () => {
            let user = socketsUsers[dish.email];
            if(user) { // user could be offline
                io.sockets.sockets[user].emit('status-change', dish);
            }
        });
    }
    function deliverDish(dish) { //TODO:  dishoperation module
        droneApi.deliver()
            .then(() => {
                dish.status = 'Served';
                statusChange(dish);
                deleteDish(dish);
            })
            .catch(() => {
                dish.status = 'Some difficulties';
                statusChange(dish);
                deleteDish(dish);
            });
    }
    function deleteDish(dish) { //TODO:  dishoperation module
        setTimeout(() => {
            order.remove(dish, () => {
                let user = socketsUsers[dish.email];
                if(user) { // user could be offline
                    io.sockets.sockets[user].emit('dish-delete', dish);
                }
            });
        }, 120000);
    }

    io.sockets.on('connection', function(socket){
        console.log("connected", ++connected);

        socket.on("new-user", function(user){
          socketsUsers[user.email] = this.id;
        });

        socket.on("status-change", function(dish){
            statusChange(dish);
            if(dish.status == 'On the way'){
                deliverDish(dish);
            }
        });

        socket.on('disconnect', function() {
            for(let i in  socketsUsers){
              if(socketsUsers.hasOwnProperty(i) && socketsUsers[i] == this.id){
                  delete socketsUsers[i];
                  break;
              }
            }
            console.log("connected", --connected);
        });
    });
};