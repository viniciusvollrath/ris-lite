var async = require('async');

module.exports = function(Patient) {
    Patient.new = function(patient, exams, cb) {
        var exam = Patient.app.models.Exam;
        var examMethod = Patient.app.models.ExamMethod;
        Patient.create(patient, function(err, result) {
            if (err) {
                cb(err, {});
            }
            //if exams list not empty
            if (exams.length > 0) {
                console.log(exams.length);
                var ex = {};
                //for each exam complete the data
                async.each(exams, function(ex, callback) {
                    console.log(ex);
                    ex.creationDate = Date.now();
                    ex.patientId = result.id;

                    examMethod.findOne({
                        id: ex.examMethodeId
                    }, function(err, eMethod) {
                        if (err) {
                            cb(err, {});

                        };
                        ex.interpretation = eMethod.reportModel;
                        ex.conclusion = eMethod.conclusionModel;
                        ex.isInterpreted = false;
                        ex.isPaid = false;
                        ex.status = "NEW";
                        exam.create(ex, function(error, exm) {
                            if (error) {
                                cb(error, {});
                            }
                            console.log(exm);
                            callback();
                        });
                    });
                }, function(err) {

                });

                cb(null, "totally nailed IT");

            } else {
                cb(null, "worked");

            }



        });



    };
    Patient.remoteMethod(
        'new', {
            accepts: [{
                arg: 'patient',
                type: 'object'
            }, {
                arg: 'exams',
                type: ['object']
            }],
            returns: {
                arg: 'status',
                type: 'string'
            },
            http: {
                path: '/new',
                verb: 'post'
            },
            description: 'Create new patient and its related exams',
        }
    );
};
