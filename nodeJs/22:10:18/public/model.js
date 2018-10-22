app.factory('userModel', ['$cookies', function($cookies) {
    var userModel = {};
    userModel.stack = function() {
        console.log("hello world");
    }

    userModel.getAuthStatus = function() {
        var status = $cookies.get('abc');
        if (status) {
            return true;
        } else {
            return false;
        }
    }
    userModel.dologout = function() {
        $cookies.remove('abc');
    }

    return userModel;
}]);