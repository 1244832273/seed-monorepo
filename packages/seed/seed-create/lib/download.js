const download = require('download-git-repo');

function downloadFun({ url, dir }) {
  download(url, dir, function (err) {
    console.log(err ? 'Error' : 'Success');
  });
}

module.export = downloadFun;
