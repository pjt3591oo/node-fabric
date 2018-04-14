var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

exports.parse = function (str) {
    return new Promise( (resolve, reject) => {
        mod.ExecuteMorphModule(str, function (err, rep) {
            if (err) reject(err)
            resolve(rep)
        })
    })
}
