var waffle = require('waffle-app');

waffle.channel.on('core:setup', function () {

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {

		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

			setTimeout(function () {

				waffle.channel.emit('loader:data', JSON.parse(xmlHttp.responseText));
				waffle.hideLoader();
				waffle.showApp();

			}, 1500) //Emulate some delay


		} else if (xmlHttp.readyState === 0) {

			alert('Failed to fetch ' + type);

		}

	}

	xmlHttp.open("GET", 'http://www.mocky.io/v2/54769609a665b85c170a7e48' , false);
	xmlHttp.send();

});

