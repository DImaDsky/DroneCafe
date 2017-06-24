cafeApp.factory('SocketService', function ($rootScope) {
    var socket = io.connect('http://127.0.0.1:3333',{
        AAdata:'!!!!!!!!!',
        extraHeaders: {
            Authorization: "EEmaiL"
        }
    });
    var email = sessionStorage.getItem('email');
    if (!email){
        socket.emit('new-user', {email:'A@A.re'});
    }

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () { callback.apply(socket, args); });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {  if (callback) { callback.apply(socket, args); }  });
            })
        }
    };
});