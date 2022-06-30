const download = require('./lib/download.js');

const TEMPLATE = {
  'react-manage-cli': 'github:1244832273/seed-webpack#seed-react-cli',
  'react-app-cli': '歪比巴卜!',
};

function seedCreate(projectName, template) {
  const url = TEMPLATE[template];
  return new Promise((resove, reject) => {
    download(url, projectName, (err) => {
      err ? reject(err) : resove('下载成功!');
    });
  });
}

module.exports = seedCreate;
module.exports.TEMPLATE = TEMPLATE;
