(function() {
    "use strict";

    angular.module('app.room')
        .service('RoomService', RoomService);

    function RoomService(Rest, $state) {
        var room = Rest.all("rooms");

        return {
            roomList: Rest.all("rooms").getList(),
            addNewRoom: function(rm) {
                return room.post(rm).then(function(response) {

                }, function(error) {
                    console.log(error);

                });
            }



        }
    }


})();
