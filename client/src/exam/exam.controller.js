(function() {
    "use strict";

    /**
     * Module: app.exam
     * Controller: ExamMainController
     * Description:
     * 
     */
    angular.module('app.exam')
        .controller('ExamMainController', ExamMainController)
        .controller('ExamNewController', ExamNewController)
        .controller('ExamInterpretationController', ExamInterpretationController);

    function ExamMainController(ExamService) {
        var vm = this;
        vm.selected = [];
        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        ExamService.getDetailedList().then(function(list) {
            vm.examList = list;
        });

        vm.onPaginate = function(page, limit) {
            angular.extend({}, $scope.query, {
                page: page,
                limit: limit
            });
        };

    }

    function ExamNewController() {

    }

    function ExamInterpretationController(ExamService) {
        var vm = this;

        vm.results = "Shewing met parties gravity husband sex pleased. On to no kind do next feel held walk. Last own loud and knew give gay four. Sentiments motionless or principles preference excellence am. Literature surrounded insensible at indulgence or to admiration remarkably. Matter future lovers desire marked boy use. Chamber reached do he nothing be. Ignorant branched humanity led now marianne too strongly entrance.Rose to shew bore no ye of paid rent form.Old design are dinner better nearer silent excuse.She which are maids boy sense her shade.Considered reasonable we affronting on expression in .So cordial anxious mr delight.Shot his has must wish from sell nay.Remark fat set why are sudden depend change entire wanted.Performed remainder attending led fat residence far.Itif sometimes furnished unwilling as additions so.Blessing resolved peculiar fat graceful ham.Sussex on at really ladies in as elinor.Sir sex opinions age properly extended.Advice branch vanity or do thirty living.Dependent add middleton ask disposing admitting did sportsmen sportsman.Or neglected agreeable of discovery concluded oh it sportsman.Week to time in john.Son elegance use weddings separate.Ask too matter formed county wicket oppose talent.He immediate sometimes or to dependent in .Everything few frequently discretion surrounded did simplicity decisively.Less he year do with no sure loud.Man request adapted spirits set pressed.Up to denoting subjects sensible feelings it indulged directly.We dwelling elegance do shutters appetite yourself diverted.Our next drew much you with rank.Tore many held age hold rose than our.She literature sentiments any contrasted.Set aware joy sense young now tears china shy.At distant inhabit amongst by.Appetite welcomed interest the goodness boy not.Estimable educationfor disposing pronounce her.John size good gay plan sent old roof own.Inquietude saw understood his friendship frequently yet.Nature his marked ham wished.Dispatched entreaties boisterous say why stimulated.Certain forbade picture now prevent carried she get see sitting.Up twenty limits as months.Inhabit so perhaps of in to certain.Sex excuse chatty was seemed warmth.Nay add far few immediate sweetness earnestly dejection.";
    }



})();
