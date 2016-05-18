(function(w, $) {

    var scrollSwitchPoint = 70;
    var $header           = $('#header');
    var $window           = $(w);

    // on scroll header anim on desktop
    $window.scroll(function(e) {

        var scrollTop = $window.scrollTop();

        if(scrollTop >= scrollSwitchPoint) {
            $header.addClass('reversed');
        } else {
            $header.removeClass('reversed');
        }

    });

})(window, jQuery);