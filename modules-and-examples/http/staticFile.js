var path = require('path'),
    fs = require('fs');

require('http').createServer(function(req, res) {

    var file = path.normalize('.' + req.url);
    console.log('Try to serve', file);

    function reportError(err) {
        consle.log(err);
        res.writeHead(500);
        res.end('Interval Sever Error');

    }

    fs.exists(file, function(exists) {

        if (exists) {
            fs.stat(file, function(err, stat) {
                var rs;
                if (err) {
                    return reportError(err);
                }

                if (stat.isDirectory()) {
                    res.writeHead(403);
                    res.end('Forbidden');

                } else {
                    rs = fs.createReadStream(file);
                    rs.on('error', reportError);
                    res.writeHead(200);
                    rs.pipe(res);
                }


            });

        } else {
            res.writeHead(404);
            res.end('Not found');
        }

    });

}).listen(4000);
