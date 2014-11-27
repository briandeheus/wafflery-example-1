var waffle = require('waffle-app')
waffle.addModule('loader', require('components/loader'));
waffle.addModule('umbrella', require('components/umbrella'));
require('views/welcome');
waffle.setup()