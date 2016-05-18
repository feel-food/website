(function(w, $) {

    var $header             = $('#header');
    var $scrollToFormButton = $('#scrollToFormButton');
    var $window             = $(w);
    var speed               = 750;
    var $htmlAndBody        = $('html, body');
    var easing              = 'easeOutQuint';

    var scrollToHash = function(id, skipAnimation) {

        var scrollDecal = $header.height();
        var $element    = $(id);

        if(!!$element.length) {

            var top = $element.offset().top - scrollDecal;

            if(skipAnimation) {

                $window.scrollTop(top);

            } else {

                $htmlAndBody.animate({scrollTop: top}, speed, easing);
            }
        }
    };

    $scrollToFormButton.on('click', function(e) {
        e.preventDefault();

        scrollToHash(e.currentTarget.hash);
    });

    $window.load(function() {

        if(w.location.hash) {

            setTimeout(function() {

                scrollToHash(w.location.hash, true);

            }, 1);
        }
    });

})(window, jQuery);