(function() {
    "use strict";

    angular.module('app.equipment')
        .service('EquipmentService', EquipmentService);

    function EquipmentService(Rest, $state) {
        var equipmentType = Rest.all("equipmentTypes");
        var equipment = Rest.all("equipment");

        return {
            equipmentTypeList: Rest.all("equipmentTypes").getList(),
            addNewEquipmentType: addNewEquipmentType,
            equipmentList: equipmentList,
            equipmentListDetails: equipmentListDetails,
            count: count,
            addNewEquipment: addNewEquipment
        }

        function addNewEquipmentType(et) {
            return equipmentType.post(et).then(function(response) {
                equipmentType.getList().push(response);
                //console.log(response);
                $state.go('app.setting.equipment-type');

            }, function(response) {
                console.log("Error with status code", response.status);
            });
        }

        function addNewEquipment(eq) {
            return equipment.post(eq).then(function(response) {
                equipment.getList().push(response);
                //console.log(response);
                $state.go('app.setting.equipment');

            }, function(response) {
                console.log("Error with status code", response.status);
            });
        }

        function equipmentList() {
            return equipment.getList();
        }

        function equipmentListDetails(query) {
            if (query != undefined) {
                //console.log(query);
                return equipment.customGET('?filter[include]=room&filter[include]=equipmentType&filter[limit]=' + query.limit + '&filter[skip]=' + (query.limit * (query.page - 1)) + '&filter[order]=' + query.order + '&filter[where][name][options]=i&filter[where][name][like]=' + '.*' + query.filter + '.*').then(function(equipments) {
                    return equipments;
                }, function(error) {

                });
            } else {

                return equipment.customGET('?filter[limit]=5').then(function(equipments) {
                    return equipments;
                }, function(error) {

                });
            }
        }

        function count() {
            return equipment.customGET('count').then(function(equipment) {
                return equipment.count;
            }, function(error) {

            });
        }
    }
})();
