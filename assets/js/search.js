$(document).ready(() => {
	$('#search_submit').click(() => {
		window.location.href = '/search?q=' + $('#search').val();
	});
})