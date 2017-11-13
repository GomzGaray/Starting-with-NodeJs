angular.module('computershopApp', ['ngRoute'] )
// Routes handler in angular
.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl : 'views/productList.html',
            controller  : 'ProductsCtrl'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

    $locationProvider.html5Mode({enable: true, requireBase: false});
})
.controller('ProductsCtrl', function ($scope, $http){

    $scope.formData = {};

    // using angular to make the get request
    $http.get('/api/Products')
        .then(
            // function waiting for a sucess response
            function (successResponse) {
                $scope.products = [];
                angular.forEach(successResponse.data, function(value, key) {
                    $scope.products.push(value);
                });
            },
            // function waitng for an error response
            function(errorResponse) {
                console.log('Error: ' + errorResponse);
            }
        );
})
.controller('LoginCtrl', function ($scope, $http){

});
