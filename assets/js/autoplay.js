$(document).ready(function () {
	if (localStorage.getItem('autoplay') === 'true') {
		$('#autoplay').prop("checked", true);
		document.getElementById('player').addEventListener('ended', () => {
			setTimeout(() => {
				window.location.href = '/video?v=' + document.getElementById('recommendations').firstChild.nextSibling.id.split('_')[1];
			}, 5000)
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