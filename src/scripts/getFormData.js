(function(w, $) {

    var getFormData = function(form) {

        var paramObj = {};
        $.each($(form).serializeArray(), function(_, kv) {
            if(paramObj.hasOwnProperty(kv.name)) {
                paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
                paramObj[kv.name].push(kv.value);
            }
            else {
                paramObj[kv.name] = kv.value;
            }
        });

        return paramObj;
    };

    w.getFormData = function() {

        var formData  = getFormData('#form form');
        var popinData = getFormData('.' + w.customPopinClassCss + ' .fancybox-inner form');

        return _.extend(formData, popinData);

    };

})(window, jQuery);