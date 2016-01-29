(function() {
    "use strict";

    /**
     * Module: app.room
     * Controller: RoomMainController
     * Description:
     * 
     */
    angular.module('app.room')
        .controller('RoomMainController', RoomMainController)
        .controller('RoomNewController', RoomNewController);

    function RoomMainController(RoomService) {
        var vm = this;
        vm.rooms = [];
        vm.selected = [];
        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        vm.roomList = roomList;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        activate();



        function onPaginate(page, limit) {
            vm.query.limit = limit;
            vm.query.page = page;
            roomList(vm.query);
        };

        function onReorder(order) {
            vm.query.order = order;
            roomList(vm.query);
        };


        function roomList() {
            RoomService.getDetailedList(vm.query).then(function(data) {
                vm.rooms = data;
            }, function(error) {

            });

        }

        function roomCount() {
            RoomService.count().then(function(data) {
                vm.count = data;
            }, function(error) {

            });
        }

        function activate() {
            roomList();
            roomCount();
        }


    }

    function RoomNewController(RoomService, $state) {
        var vm = this;
        vm.room = {};
        vm.addNewRoom = addNewRoom;

        function addNewRoom() {
            RoomService.addNewRoom(vm.room).
            then(function(data) {
                $state.go('app.setting.room');
            }, function(error) {

            });


        }

    }

})();
