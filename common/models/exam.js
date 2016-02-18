module.exports = function(Exam) {
    Exam.saveInterpretation = function(exam, cb) {



        cb(null, id);
    };
    Exam.remoteMethod(
        'saveInterpretation', {
            accepts: [{
                arg: 'exam',
                type: 'object'
            }],
            returns: {
                arg: 'user',
                type: 'object'
            },
            http: {
                path: '/process',
                verb: 'post'
            },
            description: 'Updates the interpretation and conclusion of an exam and changes the status to ONGOING INTERPRETATION',
        }
    );
};
