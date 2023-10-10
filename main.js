var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/addColaborador', {
      templateUrl: 'addColaborador.htm',
      controller: 'AddColaboradorController'
   }).
   
   when('/viewStudents', {
      templateUrl: 'viewStudents.htm',
      controller: 'ViewStudentsController'
   }).
   
   otherwise({
      redirectTo: '/addColaborador'
   });
}]);

mainApp.controller('AddColaboradorController', function($scope, $compile,  $http) {
   $scope.message = "This page will be used to display add student form";

   $scope.objectColaborador = {
      nomeColaborador : '',
      senhaColaborador: '',
      porcentagem: '',
      texto:''
   };


   $scope.listaColaboradores = [] ; 
   

   $scope.salvarColaborador = function (){
         console.log('inicio funcao salvarColaborador'); 
         console.log('nome' + $scope.objectColaborador.nomeColaborador);
         console.log('senha' + $scope.objectColaborador.senhaColaborador);

         newColaborador = new ObjectColaborador(generateId(),$scope.objectColaborador.nomeColaborador,
                                                      $scope.objectColaborador.senhaColaborador,'','');
         $scope.listaColaboradores.push(newColaborador);

         //chamar servico de salvar e retornar dados 
         console.log(JSON.stringify($scope.listaColaboradores));

         
         chamarservicosalvar();
   }


   function chamarservicosalvar(){
         //post no angular é enviado por padrao em JSON 
         $http.post('http://localhost:8080/salvarcolaborador', $scope.listaColaboradores)
         .success(function (data){
            console.log('Envio correto');
            chamarservicobuscar();
         })
         .error(function (data){
            console.log('Erro na busca ');
         });
          
   }


   function chamarservicobuscar(){

      $http.get('http://localhost:8080/buscarcolaborador')
      .success(function(data){
              console.log('Consumo Busca Mongodb : ');
              console.log(data)
              $scope.listaColaboradores = data ; 
              
      }).error(function(data){
              console.log('Erro no Servidor' + data);
      });

   }


   function ObjectColaborador(id , nomeColaborador,senhaColaborador,porcentagem,texto){
      this.id = id ; 
      this.nomeColaborador = nomeColaborador ; 
      this.senhaColaborador = senhaColaborador ; 
      this.porcentagem = porcentagem ; 
      this.texto = texto ; 
      this.refColaborador = [];
   }


   $scope.adicionar = function (id){
      console.log('adicionado  no de id '+ id );
      let colaboradorEncontrado = buscarColaboradorInterno(id) ; 
      console.log(colaboradorEncontrado);
      let objectColaboradorNovo = new ObjectColaborador(generateId(),$scope.objectColaborador.nomeColaborador,
         $scope.objectColaborador.senhaColaborador,'0%','Nada');

      colaboradorEncontrado.refColaborador.push(objectColaboradorNovo);
     
      chamarservicosalvar();

   }

   function buscarColaboradorInterno(id){
      let colaboradorEncontrado  = $scope.listaColaboradores.find(cola => {
         return cola.id == id ;
      });

      if (colaboradorEncontrado== null || colaboradorEncontrado== undefined ){
         for (let c of $scope.listaColaboradores) {
            for (let i of c.refColaborador) {
              if (i.id === id) colaboradorEncontrado = i;
            }
          }
      }
      return colaboradorEncontrado;
   }


   function generateId(){
      const uid = Date.now().toString(36) + Math.random().toString(36).substr(2); 
      return uid ; 
   }

});

mainApp.controller('ViewStudentsController', function($scope) {
   $scope.message = "This page will be used to display all the students";
});
   