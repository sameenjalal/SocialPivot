$(function() {

	var comment_div = $('#comment_div');
	var tog_button = $('#comment_box_button');
	var open = false;

	comment_div.hide();
	tog_button.on("click", function() {
		console.log( $(this) );
		if( open === false ) {
			comment_div.slideToggle();
			open = true;
		} else {
			comment_div.slideToggle();
			open = false;
		}
	});

	$('#comment_div').hide();
});
