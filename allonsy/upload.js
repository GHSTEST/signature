var http = require('http'),
    util = require('util'),
    formidable = require('formidable'),
    server;

server = http.createServer(function(req, res) {
  if (req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  } else if (req.url == '/upload') {
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.uploadDir = __dirname;
    var taille = 0
    form
      .on('error', function(){
        console.log('fichier trop gros')
        form.resume();
      })
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('fileBegin', function(b1, b2){
      })
      .on('progress', function(b1,b2){
        taille += b1;
        if (taille > 10000000){
            form.file.end();
            form.emit('error', Error());
          }
      })
      .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
      })
      .on('end', function() {
        console.log('-> upload done');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received fields:\n\n '+util.inspect(fields));
        res.write('\n\n');
        res.end('received files:\n\n '+util.inspect(files));
      });
    console.log(req.headers)
    console.log(Number(req.headers["Content-Length"]))
    if (true){
      form.parse(req);
      }
    else {
      req.resume()
      req.on('end', function(){console.log('fichier trop gros')});
    }
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});
server.listen(2000);

console.log('listening on http://localhost:'+2000+'/');
