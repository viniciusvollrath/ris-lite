(function() {
    "use strict";

    angular.module('app.room')
        .service('RoomService', RoomService);

    function RoomService(Rest, $state) {
        var room = Rest.all("rooms");


        return {
            count: count,
            roomList: room.getList(),
            getDetailedList: getDetailedList,
            addNewRoom: addNewRoom

        };

        function addNewRoom(rm) {
            rm.status = 'FREE';
            return room.post(rm).then(function(response) {
                return response
            }, function(error) {
                console.log(error);
                return error
            });
        }

        function getDetailedList(query) {
            if (query != undefined) {
                console.log(query);
                return room.customGET('?filter[include][equipment]&filter[limit]=' + query.limit + '&filter[skip]=' + (query.limit * (query.page - 1)) + '&filter[order]=' + query.order + '&filter[where][name][options]=i&filter[where][name][like]=' + '.' + query.filter + '.').then(function(rooms) {
                    return rooms;
                }, function(error) {

                });
            } else {

                return room.customGET('?filter[limit]=5').then(function(rooms) {
                    return rooms;
                }, function(error) {

                });
            }
        }

        function count() {
            return room.customGET('count').then(function(rooms) {
                console.log(rooms);
                return rooms.count;
            }, function(error) {

            });
        }
    }


})();
