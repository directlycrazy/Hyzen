$(document).ready(function () {
	fetch('/dislikes?v=' + document.getElementById('vid_id').innerHTML).then(res => res.json()).then(data => {
		console.log(data);
		document.getElementById('dislikes').innerHTML = data.dislikes;
	});
});