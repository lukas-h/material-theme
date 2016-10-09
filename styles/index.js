var hide_lists = function(cb) {
    $('#posts').fadeOut(300);
    $('#projects').fadeOut(300);
    $('#posts-btn').removeClass('disabled');
    $('#projects-btn').removeClass('disabled')
};
var show_projects = function() {
    $('#posts-btn').removeClass('disabled');
    $('#posts').fadeOut(300, function() {
        $('#projects').fadeIn(300)
    });
    $('#projects-btn').addClass('disabled')
};
var show_posts = function() {
    $('#projects-btn').removeClass('disabled');
    $('#projects').fadeOut(function() {
        $('#posts').fadeIn(300)
    });
    $('#posts-btn').addClass('disabled')
};
