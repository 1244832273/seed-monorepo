const download = require('./lib/download');

const TEMPLATE = {
  'react-manage-cli':
    'https://github.com/1244832273/seed-webpack#seed-react-cli',
  'react-app-cli': '歪比巴卜!',
};

function seedCreate({ newProjectName, template }) {
  download({ newProjectName, template });
}

module.exports = seedCreate;
module.exports.TEMPLATE = TEMPLATE;
