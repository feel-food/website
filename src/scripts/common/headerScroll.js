(function(w, $) {

    var scrollSwitchPoint = 70;
    var $header           = $('#header');
    var $window           = $(w);

    var onWindowScroll = function() {

        var scrollTop = $window.scrollTop();

        if(scrollTop >= scrollSwitchPoint) {
            $header.addClass('reversed');
        } else {
            $header.removeClass('reversed');
        }

    };

    // on scroll header anim
    $window.scroll(onWindowScroll);
    onWindowScroll();

})(window, jQuery);