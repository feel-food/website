(function(w, $) {

    var $form                        = $('#form form');
    w.customPopinClassCss            = 'customFeelFoodPopinForm';
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
                var $popinForm = $('.' + w.customPopinClassCss + ' .fancybox-inner form');

                $popinForm.submit(function(e) {
                    e.preventDefault();

                    var data = getFormData();

                    // is Loading
                    $popinForm.addClass(customIsLoadingPopinClassCss);

                    // save to firebase
                    addToFirebase(isRestaurateurPage ? 'Restaurateurs' : 'Entreprises', data, function(err) {

                        // after save, remove loading, add success message, empty previous form
                        $popinForm.removeClass(customIsLoadingPopinClassCss);

                        if(err) {

                            alert('Une erreur est survenue. Veuillez essayer de nouveau.');

                        } else {

                            $popinForm.addClass(customSuccessPopinClassCss);
                        }

                    });

                });

            }
        });
    });

})(window, jQuery);