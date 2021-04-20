$(document).ready(() => {
	document.getElementById('format').addEventListener('change', (e) => {
		var time = Math.floor(document.getElementById('player').currentTime);
		localStorage.setItem('preferred_quality', document.getElementById('format').options[document.getElementById('format').selectedIndex].text);
		document.getElementById('player').src = $('#format').val();
		$('#player').ready(() => {
			document.getElementById('player').currentTime = time;
			return;
		});
	});
	if (localStorage.getItem('preferred_quality')) {
		var b = document.getElementById('format').options;
		Array.from(b).forEach((a, i) => {
			if (a.text === localStorage.getItem('preferred_quality')) {
				document.getElementById('player').src = a.value;
				$('#format').val(a.text);
				return;
			}
			if ((i === b.length - 1) && !(document.getElementById('player').src)) {
				document.getElementById('player').src = $('#format').val();
				return;
			}
		});
	} else {
		document.getElementById('player').src = $('#format').val();
	}
})