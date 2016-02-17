var async = require('async');

module.exports = function(Patient) {
    Patient.new = function(patient, exams, cb) {
        var exam = Patient.app.models.Exam;
        var examMethod = Patient.app.models.ExamMethod;
        // console.log(patient.id);
        var id = patient.id;
        delete patient.id;
        if (id == undefined) {
            id = "-1";
        }
        // console.log(id);

        Patient.findOrCreate({ where: { id: id, firstName: patient.firstName, lastName: patient.lastName } }, patient, function(err, result) {
            if (err) {
                cb(err, {});
            }
            // console.log(result.id);
            //if exams list not empty
            if (exams.length > 0) {
                //console.log(exams.length);
                var ex = {};
                //for each exam complete the data
                async.each(exams, function(ex, callback) {
                    console.log(ex);
                    ex.creationDate = Date.now();
                    ex.patientId = result.id;

                    examMethod.findOne({
                        where: {
                            id: ex.examMethodId
                        }
                    }, function(err, eMethod) {
                        if (err) {
                            cb(err, {});

                        };

                        ex.interpretation = eMethod.defaultResultModel;
                        ex.isInterpreted = false;
                        ex.isPaid = true;
                        ex.status = "NEW";
                        exam.create(ex, function(error, exm) {
                            if (error) {
                                cb(error, {});
                            }
                            // console.log(exm);
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
