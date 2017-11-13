angular.module('computershopApp', [] )
.controller('ProductsListController', function ($scope, $http){

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
});
