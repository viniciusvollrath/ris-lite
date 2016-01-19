(function() {
    "use strict";

    angular.module('app.equipment')
        .service('EquipmentService', EquipmentService);

    function EquipmentService(Rest, $state) {
        var equipmentType = Rest.all("equipmentTypes");
        var equipment = Rest.all("equipment");

        return {
            equipmentTypeList: Rest.all("equipmentTypes").getList(),
            addNewEquipmentType: function(et) {
                return equipmentType.post(et).then(function(response) {
                    equipmentType.getList().push(response);
                    console.log(response);
                    $state.go('dashboard.admin.equipment-type');

                }, function(response) {
                    console.log("Error with status code", response.status);
                });
            },
            equipmentList: Rest.all("equipment").getList(),
            addNewEquipment: function(eq) {
                return equipment.post(eq).then(function(response) {
                    equipment.getList().push(response);
                    console.log(response);
                    $state.go('dashboard.admin.equipment');

                }, function(response) {
                    console.log("Error with status code", response.status);
                });
            }
        }
    }
})();
