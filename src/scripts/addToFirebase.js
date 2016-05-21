(function(w) {

    w.addToFirebase = function(key, data, callback) {
        firebase.database().ref(key).push(data, function(err) {
            callback(err);
        });
    };

})(window);