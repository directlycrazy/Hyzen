$(document).ready(function () {
	if (localStorage.getItem('subscribe')) {
		var a = JSON.parse(localStorage.getItem('subscribe'));
		if (a.includes(document.getElementById('creator_data').innerHTML)) {
			document.getElementById('subscribe').classList.remove('btn-light');
			document.getElementById('subscribe').classList.add('btn-dark');
			document.getElementById('subscribe').innerHTML = 'Unsubscribe';
		}
	}
	$('#subscribe').click(() => {
		var a;
		if (localStorage.getItem('subscribe')) {
			a = JSON.parse(localStorage.getItem('subscribe'));
		} else {
			a = [];
		}
		if (a.includes(document.getElementById('creator_data').innerHTML)) {
			const index = a.indexOf(document.getElementById('creator_data').innerHTML);
			if (index > -1) {
				a.splice(index, 1);
				localStorage.setItem('subscribe', JSON.stringify(a));
			}
			document.getElementById('subscribe').classList.remove('btn-dark');
			document.getElementById('subscribe').classList.add('btn-light');
			document.getElementById('subscribe').innerHTML = 'Subscribe';
			return;
		} else {
			a.push(document.getElementById('creator_data').innerHTML);
			localStorage.setItem('subscribe', JSON.stringify(a));
			document.getElementById('subscribe').classList.remove('btn-light');
			document.getElementById('subscribe').classList.add('btn-dark');
			document.getElementById('subscribe').innerHTML = 'Unsubscribe';
			return;
		}
	});
});