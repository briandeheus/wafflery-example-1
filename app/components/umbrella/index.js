module.exports = function (ellas) {

	var wrapper = document.createElement('div');

	for (var i = 0, l = ellas.length; i < l; i++) {
		var ella = document.createElement('div');
		ella.textContent = ellas[i];
		wrapper.appendChild(ella);
	}

	return wrapper;
	
}