var path = require('path');
var fs = require('fs');

function es6DelEs5 () {

}
es6DelEs5.prototype.apply = function (compiler) {
    compiler.plugin('done', function(compilation) {
        var htmlStr = fs.readdirSync(path.join(__dirname, '../../dist/static/js'), 'utf8');
        for(var i = 0 ; i < htmlStr.length; i++ ){
            if(htmlStr[i].match(/vendor.*js$/img)){
                var vendorPath = path.join(__dirname, '../../dist/static/js/',htmlStr[i]);
                var vendor = fs.readFileSync(vendorPath, 'utf8');
                vendor = vendor.replace(/\(t.e.r\)\=\>/img,"function(t,e,r)");
                vendor = vendor.replace(/\(e.n.r\)\=\>/img,"function(e,n,r)");
                fs.writeFileSync(vendorPath, vendor);
                break;
            }
        }
    })
}
module.exports = es6DelEs5;