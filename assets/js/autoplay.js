$(document).ready(function () {
	if (localStorage.getItem('autoplay') === 'true') {
		$('#autoplay').prop("checked", true);
		const c = () => {
			document.getElementById('player').addEventListener('ended', () => {
				var seeked = false;
				var i = 0;
				var t = 8;
				var scrolled = false;
				var f = () => {
					if (document.getElementById('player').duration === document.getElementById('player').currentTime) {
						scrolled = false;
						if (i < 8) {
							document.getElementById('autoplaying').innerHTML = 'Playing in ' + t + '...';
							i++;
							return t = t - 1;
						} else {
							var id = document.getElementById('recommendations').firstChild.nextSibling.id;
							return window.location.href = '/video?v=' + id.slice(id.split('_')[0].length + 1, 26);
						}
					} else {
						seeked = true;
						document.getElementById('autoplaying').innerHTML = 'Up Next:';
						clearInterval(a);
					}
				};
				var a = setInterval(f, 1000);	
				window.onscroll = function (e) {
					if (seeked !== true) {
						if (scrolled === false) {
							scrolled = true;
							clearInterval(a);
							document.getElementById('autoplaying').innerHTML = 'Playing in 8...';
							setTimeout(() => {
								t = 8;
								i = 0;
								return a = setInterval(f, 1000);
							}, 2000);
						}
					}
				};
			});
		};
		c();
	}
	$('#autoplay').click(function () {
		if ($(this).is(":checked")) {
			localStorage.setItem('autoplay', true);
		} else if ($(this).is(":not(:checked)")) {
			localStorage.setItem('autoplay', false);
		}
		window.location.reload();
	});
});