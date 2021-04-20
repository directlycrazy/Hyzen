$('#search_form').submit((e) => {
	e.preventDefault();
	window.location.href = '/search?q=' + $('#search-field').val();
})