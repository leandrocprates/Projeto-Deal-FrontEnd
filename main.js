var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/addStudent', {
      templateUrl: 'addStudent.htm',
      controller: 'AddStudentController'
   }).
   
   when('/viewStudents', {
      templateUrl: 'viewStudents.htm',
      controller: 'ViewStudentsController'
   }).
   
   otherwise({
      redirectTo: '/addStudent'
   });
}]);

mainApp.controller('AddStudentController', function($scope, $compile,  $http) {
   $scope.message = "This page will be used to display add student form";

   $scope.objectColaborador = {
      nomeColaborador : '',
      senhaColaborador: '',
      porcentagem: '',
      texto:''
   };


   $scope.listaColaboradores = [] ; 
   //$scope.listaColaboradores.push(criarObjectTesteColaborador1()) ; 
   //$scope.listaColaboradores.push(criarObjectTesteColaborador2()) ; 

   $scope.salvarColaborador = function (){
         console.log('inicio funcao salvarColaborador'); 
         console.log('nome' + $scope.objectColaborador.nomeColaborador);
         console.log('senha' + $scope.objectColaborador.senhaColaborador);

         newColaborador = new ObjectColaborador(generateId(),$scope.objectColaborador.nomeColaborador,
                                                      $scope.objectColaborador.senhaColaborador,'','');
         $scope.listaColaboradores.push(newColaborador);

         //chamar servico de salvar e retornar dados 
         console.log(JSON.stringify($scope.listaColaboradores));

         //chamarservicobuscar();
         chamarservicosalvar();
   }


   function chamarservicosalvar(){
         //post no angular é enviado por padrao em JSON 
         $http.post('http://localhost:8080/salvarcolaborador', $scope.listaColaboradores)
         .success(function (data){
            console.log('Envio correto');
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


   function criarObjectTesteColaborador1() {
      object_1 = new ObjectColaborador(1,'Leandro','123','10%','Ruim');
      object_1.refColaborador = [] ; 
      object_1.refColaborador.push(new ObjectColaborador(2,'Evandro','456','45%','Mediana')) ;
      object_1.refColaborador.push(new ObjectColaborador(3,'Paula','574','70%','Mediana')) ;
      object_1.refColaborador[0].refColaborador = [] ; 
      object_1.refColaborador[0].refColaborador.push(new ObjectColaborador(4,'Victor','789','60%','Bom')) ;
      object_1.refColaborador[0].refColaborador.push(new ObjectColaborador(5,'Rafael','943','80%','Otimo')) ;
      object_1.refColaborador[1].refColaborador = [] ; 
      return object_1;
   }

   function criarObjectTesteColaborador2() {
      object_2 = new ObjectColaborador(6,'Node2','567','30%','Medio');
      object_2.refColaborador = [] ; 
      object_2.refColaborador.push (new ObjectColaborador(7,'Node 2.1','212','80%','Otimo')) ;
      object_2.refColaborador[0].refColaborador = [] ; 
      return object_2;
   }


   $scope.adicionar = function (id){
      console.log('adicionado  no de id '+ id );
      let colaboradorEncontrado = buscarColaboradorInterno(id) ; 
      console.log(colaboradorEncontrado);
      let objectColaboradorNovo = new ObjectColaborador(generateId(),$scope.objectColaborador.nomeColaborador,
         $scope.objectColaborador.senhaColaborador,'0%','Nada');

      colaboradorEncontrado.refColaborador.push(objectColaboradorNovo);
     
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
   