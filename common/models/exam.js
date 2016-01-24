module.exports = function(Exam) {
    Exam.createMultiple = function(id, cb) {
        var examMethod = Exam.app.models.ExamMethode;
        cb(null, id);
    };
    Exam.remoteMethod(
        'createMultiple', {
            http: {
                path: '/createMultiple',
                verb: 'post'
            },
            accepts: {
                arg: 'id',
                type: 'number'
            },
            returns: {
                arg: 'status',
                type: 'string'
            }
        }
    );
};
