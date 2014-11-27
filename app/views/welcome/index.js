var waffle = require('waffle-app');
var view = waffle.addView('welcome', document.getElementById('welcomeView'), true);

waffle.channel.on('loader:data', function (data) {

	view.setVar('where', data.hide);

	var ellas = waffle.umbrella(data.ella);
	view.elm.appendChild(ellas)

});