const download = require('download-git-repo');

function downloadFun(url, dir, callBack) {
  download(url, dir, function (err) {
    callBack(err);
  });
}

module.exports = downloadFun;
