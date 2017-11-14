angular.module('computershopApp', ['ngRoute'] )
// Routes handler in angular
.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({enable: true, requireBase: false});
    // Setting up routes with templates and controllers
    $routeProvider
        .when('/', {
            templateUrl : 'views/productList.html',
            controller  : 'ProductsCtrl'
        })
        .when('/register', {
            templateUrl : 'views/register.html',
            controller  : 'RegisterCtrl'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
})
// Products list Controller
.controller('ProductsCtrl', function ($scope, $http){

    $scope.formData = {};

    // using angular to make the get request
    $http.get('/api/Products', { params : {status : 'Active'} })
        .then(
            // function waiting for a sucess response
            function (successResponse) {
                // Initializing response
                $scope.products = [];
                // Page active
                $scope.currentPage = 0;
                // Number of items per page
                $scope.pageSize = 5;
                // Adding data response to $scope.products
                angular.forEach(successResponse.data, function(value, key) {
                    $scope.products.push(value);
                });
                // Calculating number of pages based on results
                $scope.numberOfPages = function() {
                    return Math.ceil($scope.products.length / $scope.pageSize);
                };
            },
            // function waitng for an error response
            function(errorResponse) {
                console.log('Error: ' + errorResponse);
            }
        );
})
// Filtering pagination
.filter('pagination', function()
{
    return function(input, start) {
        if (start != undefined && input != undefined){
            start = +start;
            return input.slice(start);
        }
    };
})
// Login Controller
.controller('LoginCtrl', function ($scope, $http){
    // Initializing fields
    $scope.email = '';
    $scope.password = '';

    // function to be executed when submit
    $scope.signin = function () {
        $http.post('/auth/login', {
            email : $scope.email,
            password : $scope.password
        }).then( function (successResponse){
            // todo : add logic when login sucess
            $scope.loggedIn  = successResponse.data.success;
        }, function (errorResponse){
            // todo : add logic when login failed
            $scope.loggedIn = errorResponse.data.success;
            $scope.errorMessage = errorResponse.data.message;
        });
    };
})
// Register Controller
.controller('RegisterCtrl', function ($scope, $http){
    // todo : add logic related to registering an user
});
