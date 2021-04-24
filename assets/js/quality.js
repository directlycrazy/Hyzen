$(document).ready(() => {
	var proxy = localStorage.getItem('proxy_video');
	document.getElementById('format').addEventListener('change', (e) => {
		var time = Math.floor(document.getElementById('player').currentTime);
		localStorage.setItem('preferred_quality', document.getElementById('format').options[document.getElementById('format').selectedIndex].text);
		if (proxy === 'true') {
			document.getElementById('player').src = '/proxy/video?q=' + encodeURIComponent($('#format').val());
		} else {
			document.getElementById('player').src = $('#format').val();
		}
		$('#player').ready(() => {
			document.getElementById('player').currentTime = time;
			return;
		});
	});
	if (localStorage.getItem('preferred_quality')) {
		var b = document.getElementById('format').options;
		Array.from(b).forEach((a, i) => {
			if (a.text === localStorage.getItem('preferred_quality')) {
				if (proxy === 'true') {
					document.getElementById('player').src = '/proxy/video?q=' + encodeURIComponent(a.value);
				} else {
					document.getElementById('player').src = a.value;
				}
				$('#format').val(a.value);
				return;
			}
			if ((i === b.length - 1) && !(document.getElementById('player').src)) {
				if (proxy === 'true') {
					document.getElementById('player').src = '/proxy/video?q=' + encodeURIComponent($('#format').val());
				} else {
					document.getElementById('player').src = $('#format').val();
				}
				return;
			}
		});
	} else {
		if (proxy === 'true') {
			document.getElementById('player').src = '/proxy/video?q=' + encodeURIComponent($('#format').val());
		} else {
			document.getElementById('player').src = $('#format').val();
		}
	}
})