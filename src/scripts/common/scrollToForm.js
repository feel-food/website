(function(w, $) {

    var $header             = $('#header');
    var $input             = $('#contactEmailEntreprise');
    var $scrollToFormButton = $('[href="#form"]');
    var $window             = $(w);
    var speed               = 1500;
    var $htmlAndBody        = $('html, body');
    var easing              = 'easeInOutQuint';

    var scrollToHash = function(id, skipAnimation) {

        var scrollDecal = $header.height();
        var $element    = $(id);

        if(!!$element.length) {

            var top = $element.offset().top - scrollDecal;

            if(skipAnimation) {

                $window.scrollTop(top);
                $input.focus();

            } else {

                $htmlAndBody.animate({scrollTop: top}, speed, easing);

                // after scroll focus
                setTimeout(function() {

                    $input.focus();

                }, speed);
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