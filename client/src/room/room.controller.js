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

    function RoomMainController(RoomService, $scope) {
        var vm = this;
        var bookmark;
        vm.rooms = [];
        vm.selected = [];
        vm.filter = {
            options: {
                debounce: 500
            }
        };
        vm.query = {
            order: 'name',
            limit: 5,
            page: 1,
            filter: ''
        };

        vm.roomList = roomList;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.removeFilter = removeFilter;
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

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if (vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

        function activate() {
            roomList();
            roomCount();
        }

        $scope.$watch('roomVm.query.filter', function(newValue, oldValue) {
            if (!oldValue) {
                bookmark = vm.query.page;
            }

            if (newValue !== oldValue) {
                vm.query.page = 1;
            }

            if (!newValue) {
                vm.query.page = bookmark;
            }

            activate();
        });


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
