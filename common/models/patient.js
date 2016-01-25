module.exports = function(Patient) {
    Patient.new = function(patient, exams, cb) {
        //console.log(patient);
        var exam = Patient.app.models.Exam;
        var examMethode = Patient.app.models.ExamMethode;
        Patient.create(patient, function(err, result) {
            if (err) {
                cb(err, {});
            }
            if (exams.length > 0) {
                for (var i = exams.length - 1; i >= 0; i--) {
                    exams[i].creationDate = Date.now();
                    exams[i].patientId = result.id;
                    var ex = exams[i];
                    examMethode.findOne({
                        id: ex.examMethodeId
                    }, function(err, eMethod) {
                        if (err) {
                            cb(err, {});

                        };
                        ex.interpretation = eMethod.reportModel;
                        ex.conclusion = eMethod.conclusionModel;
                        ex.isInterpreted = false;
                        ex.isPaid = false;
                        exam.create(ex, function(error, exm) {
                            if (error) {
                                cb(error, {});
                            }
                            console.log(exm);
                        });
                    });
                    // console.log(exams[i]);

                }
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
