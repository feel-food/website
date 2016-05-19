(function(w, $) {

    var $form                        = $('#form form');
    var customPopinClassCss          = 'customFeelFoodPopinForm';
    var customIsLoadingPopinClassCss = 'customIsLoadingFeelFoodPopinForm';
    var customSuccessPopinClassCss   = 'customSuccessFeelFoodPopinForm';
    var isRestaurateurPage           = !!$('body.restaurateurs').length;

    $form.submit(function(e) {
        e.preventDefault();

        var popinTemplate = isRestaurateurPage ? 'restaurateur.html' : 'entreprise.html';

        // open fancybox
        $.fancybox.open([
            {
                href: 'popins/' + popinTemplate,
                type: 'ajax'
            }
        ], {
            padding  : 0,
            helpers  : {
                overlay: {
                    locked: false
                }
            },
            wrapCSS  : customPopinClassCss,
            afterShow: function() {

                // catch on submit event
                var $popinForm = $('.' + customPopinClassCss + ' .fancybox-inner form');

                $popinForm.submit(function(e) {
                    e.preventDefault();

                    // is Loading
                    $popinForm.addClass(customIsLoadingPopinClassCss);

                    // TODO save to firebase

                    // after save, remove loading, add success message, empty previous form
                    setTimeout(function() {

                        $popinForm.removeClass(customIsLoadingPopinClassCss);
                        $popinForm.addClass(customSuccessPopinClassCss);

                    }, 1000);
                });

            }
        });
    });

})(window, jQuery);