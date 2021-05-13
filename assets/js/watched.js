$(document).ready(() => {
	var b = Object.keys(JSON.parse(localStorage.getItem('watch_history')));
	Array.from(document.getElementById('recommendations').children).forEach((a, i) => {
		if (b.includes(a.id.replace('recommendation_', ''))) {
			//document.getElementById('thumbnail_parent_' + a.id.replace('recommendation_', '')).style.display = 'flex'
			//document.getElementById('thumbnail_parent_' + a.id.replace('recommendation_', '')).innerHTML += `<p style="font-weight:700;color:#fff;width:64.88px;height:30px;margin-left:auto;margin-top:auto;bottom:16px;right:16px;background:rgba(0,0,0,.7);border-radius:10%;padding:3px">Watched</p>`;
		}
	});
})