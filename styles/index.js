var hide_lists = function(cb) {
    $('#posts').fadeOut(300);
    $('#projects').fadeOut(300);
	$('#cv').fadeOut(300);
	$('#papers').fadeOut(300);
    $('#posts-btn').removeClass('disabled');
    $('#projects-btn').removeClass('disabled');
	$('#cv-btn').removeClass('disabled');
	$('#papers-btn').removeClass('disabled')
};
var show_projects = function() {
	$('#cv-btn').removeClass('disabled');
	$('#cv').fadeOut(300);
	$('papers-btn').removeClass('disabled');
	$('#papers').fadeOut(300);
    $('#posts-btn').removeClass('disabled');
    $('#posts').fadeOut(300, function() {
        $('#projects').fadeIn(300)
    });
    $('#projects-btn').addClass('disabled')
};
var show_posts = function() {
	$('#cv-btn').removeClass('disabled');
	$('#cv').fadeOut(300);
	$('papers-btn').removeClass('disabled');
	$('#papers').fadeOut(300);
    $('#projects-btn').removeClass('disabled');
    $('#projects').fadeOut(function() {
        $('#posts').fadeIn(300)
    });
    $('#posts-btn').addClass('disabled')
};
var show_cv = function() {
    $('#posts-btn').removeClass('disabled');
    $('#posts').fadeOut(300);
	$('papers-btn').removeClass('disabled');
	$('#papers').fadeOut(300);
	$('#projects-btn').removeClass('disabled');
    $('#projects').fadeOut(function() {
        $('#cv').fadeIn(300)
    });
    $('#cv-btn').addClass('disabled')
};
var show_papers = function() {
    $('#posts-btn').removeClass('disabled');
    $('#posts').fadeOut(300);
	$('#cv-btn').removeClass('disabled');
	$('#cv').fadeOut(300);
	$('#projects-btn').removeClass('disabled');
    $('#projects').fadeOut(function() {
        $('#papers').fadeIn(300)
    });
    $('#papers-btn').addClass('disabled')
};
	
