(function() {
    "use strict";

    angular.module('app.equipment')
        .service('EquipmentService', EquipmentService);

    function EquipmentService(DevRestangular) {
        var equipmentType = DevRestangular.all("equipmentTypes").getList().$object;;

        return {
            equipmentTypeList: equipmentType
        }
    }
})();
