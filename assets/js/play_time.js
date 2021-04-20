$('#player').ready(() => {
	var query = new URLSearchParams(window.location.search).get('v');
	var time = localStorage.getItem(query);
	if (time) {
		document.getElementById('player').currentTime = time;
	}
	setInterval(() => {
		localStorage.setItem(query, document.getElementById('player').currentTime);
	}, 5000);
})