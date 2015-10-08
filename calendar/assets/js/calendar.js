$(function() {
    $('[data-uk-grid]').on('beforeupdate.uk.grid', function(e, children) {
        // your event-handling goes here
        console.log(typeof children);
        console.log(children[0]);
        console.log($(children[0]).width());
        for(var i = 0; i < children.length; i++) {
            $(children[i]).height( $(children[i]).innerWidth() * .6);
        }
    });
});
