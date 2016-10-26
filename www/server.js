var http = require('http');
var fs = require('fs');
var url = require('url');
var path=require('path');


var types={
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "mp3": "audio/mpeg"
};

// ����������
http.createServer( function (request, response) {
    // �������󣬰����ļ���
    var pathname = url.parse(request.url).pathname;

    //console.log(realPath);
    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';

    // ���������ļ���
    console.log("Request for " + pathname + " received.");

    // ���ļ�ϵͳ�ж�ȡ������ļ�����
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP ״̬��: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }
        else{
            // HTTP ״̬��: 200 : OK
            response.writeHead(200, {'Content-Type': types[ext] || "text/plain"});

            // ��Ӧ�ļ�����
            response.write(data,"binary");
        }
        //  ������Ӧ����
        response.end();
    });
}).listen(3000);

// ����̨�����������Ϣ
console.log('Server running at http://127.0.0.1:3000/');
