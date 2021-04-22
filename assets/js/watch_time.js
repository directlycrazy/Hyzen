$('#player').ready(() => {
	var query = new URLSearchParams(window.location.search).get('v');
	var date = new Date();
	var d = date.getTime();
	if (localStorage.getItem('watch_date')) {
		if (!isNaN(localStorage.getItem('watch_date'))) {
			if ((d - localStorage.getItem('watch_date')) >= 2678400000) {
				localStorage.removeItem('watch_history');
				localStorage.setItem('watch_date', d);
			}
		} else {
			localStorage.setItem('watch_date', d);
		}
	} else {
		localStorage.setItem('watch_date', d);
	}
	const update = (id, value) => {
		var a = localStorage.getItem('watch_history');
		if (!a) {
			localStorage.setItem('watch_history', `{"${id}": ${value}}`);
		} else {
			var b = JSON.parse(a);
			b[id] = value;
			localStorage.setItem('watch_history', JSON.stringify(b));
		}
	};
	if (localStorage.getItem('watch_history')) {
		if (JSON.parse(localStorage.getItem('watch_history'))[query]) {
			document.getElementById('player').currentTime = JSON.parse(localStorage.getItem('watch_history'))[query];
		}
	}
	setInterval(() => {
		return update(query, document.getElementById('player').currentTime);
	}, 5000);
})