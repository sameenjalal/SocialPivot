$(function() {

	var comment_div = $('#comment_div');
	var tog_button = $('#comment_box_button');
	var open = false;

	$('.btn').button();
	comment_div.hide();
	tog_button.on("click", function() {
		if( open === false ) {
			tog_button.attr( "value", "Show Comment Box" );
			comment_div.slideToggle();
			open = true;
		} else {
			tog_button.attr( "value", "Hide Comment Box" );
			comment_div.slideToggle();
			open = false;
		}
	});
}
