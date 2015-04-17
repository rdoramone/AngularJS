var app = angular.module('myApp', ['ngRoute'])
.controller('PaginaPrincipalController', ['$scope', '$route', '$routeParams', function($scope, $route, $routeParams){
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
}])
.controller('LivroController', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.nome = 'LivroController';
	$scope.parametros = $routeParams;
}])
.controller('CapituloController', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.nome = "CapituloController";
	$scope.parametros = $routeParams;
}])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	// Configurar hasbang prefix
	$locationProvider.hashPrefix('!');

	// Inicio da configuração de rotas
	$routeProvider
	.when('/livro/:id', {
		templateUrl: 'livro.html',
		controller: 'LivroController'
	})
	.when('/livro/:idLivro/capitulo/:idCap', {
		templateUrl: 'capitulo.html',
		controller: 'CapituloController'
	})
	.otherwise({
		redirectTo: '/' 
	});
}]);