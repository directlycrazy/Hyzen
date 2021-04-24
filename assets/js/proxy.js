$(document).ready(function () {
	if (localStorage.getItem('proxy_video') === 'true') {
		$('#proxy').prop("checked", true);
	}
	$('#proxy').click(function () {
		if ($(this).is(":checked")) {
			localStorage.setItem('proxy_video', true);
		} else if ($(this).is(":not(:checked)")) {
			localStorage.setItem('proxy_video', false);
		}
		window.location.reload();
	});
});