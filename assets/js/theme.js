$(document).ready(() => {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	document.getElementsByTagName('HEAD')[0].appendChild(link);
	if (localStorage.getItem('theme') === 'dark') {
		link.href = '/bootstrap/css/bootstrap-dark.min.css';
	} else {
		link.href = '/bootstrap/css/bootstrap.min.css';
	}
	$('#toggle_night_mode').click(() => {
		if (localStorage.getItem('theme') === 'dark') {
			link.href = '/bootstrap/css/bootstrap.min.css';
			localStorage.setItem('theme', 'light');
		} else {
			link.href = '/bootstrap/css/bootstrap-dark.min.css';
			localStorage.setItem('theme', 'dark');
		}
	});
})