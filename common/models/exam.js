module.exports = function(Exam) {
    Exam.createMultiple = function(id, cb) {
        var examMethod = Exam.app.models.ExamMethode;




        cb(null, id);
    };
    Exam.remoteMethod(
        'createMultiple', {
            accepts: [{
                arg: 'id',
                type: 'string'
            }, {
                arg: 'adminId',
                type: 'string'
            }, {
                arg: 'status',
                type: 'string'
            }],
            returns: {
                arg: 'user',
                type: 'object'
            },
            http: {
                path: '/process',
                verb: 'post'
            },
            description: 'Updates the status of the Invitation request to either Approved or Denied',
        }
    );
};
