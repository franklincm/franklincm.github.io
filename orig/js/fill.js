$(document).ready(function() {
    var tHeight = $('.drop').outerHeight();
    var gap = $('.fill').parent().innerHeight() - tHeight;
    var lines = Math.floor( gap / 14 );
    console.log( gap );
    console.log( lines );
    for ( var i = 0; i < lines; i++ ) {
	$('.fill').append('~</br>');
    }
})
