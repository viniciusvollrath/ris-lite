module.exports = function(app) {
    var router = app.loopback.Router();
    router.get('/print', function(req, res) {
        var exam = app.models.exam;
        var id = req.query.id;
        console.log(id)
        exam.find({
            include: ['patient', 'examType'],
            where: { id: id }
        }).then(function(exams) {
            var p = exams[0].toJSON()
            console.log(p);
            var fs = require('fs');
            var pdf = require('html-pdf');

            var html2 = p.id + "<div id=\"pageHeader\">Default header</div><p style=\" padding-top:20px\">" + p.examType.name + " </p> <div style=\"width:70%;\"> <p>Nom: " + p.patient.firstName + " " + p.patient.lastName + "</p> <p>Age: " + p.patient.age + "</p> <p>Addresse: " + p.patient.address + "</p> <p>Medecin traitant:</p> </div> <h3>Resultat de l'examin</h3>" + p.interpretation + " <h3>Conclusion</h3> <p> eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis temp</p>";
            var html = fs.readFileSync('./boot/views/results.html', 'utf8');



            var options = {
                format: 'Letter',
                "border": "2cm",

                "phantomPath": "./../node_modules/phantomjs-prebuilt/bin/phantomjs"
            };

            pdf.create(html2, options).toStream(function(err, stream) {
                stream.pipe(fs.createWriteStream('./foo.pdf'));
                var tempFile = "./foo.pdf";
                setTimeout(function() {
                    fs.readFile(tempFile, function(err, data) {
                        res.contentType("application/pdf");
                        res.send(data);
                    });
                }, 300);

            });

        }, function(err) {});




    });
    app.use(router);
}
