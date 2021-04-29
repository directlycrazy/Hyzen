$(document).ready(function () {
	if (localStorage.getItem('autoplay') === 'true') {
		$('#autoplay').prop("checked", true);
		document.getElementById('player').addEventListener('ended', () => {
			var i = 0;
			var t = 8;
			var scrolled = false;
			var f = () => {
				scrolled = false;
				if (i < 8) {
					document.getElementById('autoplaying').innerHTML = 'Playing in ' + t + '...';
					i++;
					return t = t - 1;
				} else {
					var id = document.getElementById('recommendations').firstChild.nextSibling.id;
					return window.location.href = '/video?v=' + id.slice(id.split('_')[0].length + 1, 26);
				}
			};
			var a = setInterval(f, 1000);
			window.onscroll = function (e) {
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
			};
		});
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