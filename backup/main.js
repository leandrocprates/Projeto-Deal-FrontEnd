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

mainApp.controller('AddStudentController', function($scope, $compile) {
   $scope.message = "This page will be used to display add student form";

   $scope.objectColaborador = {
      nomeColaborador : '',
      senhaColaborador: '',
      porcentagem: '',
      texto:''
   };


   $scope.listaColaboradores = [] ; 
   $scope.listaColaboradores.push(criarObjectTesteColaborador1()) ; 
   $scope.listaColaboradores.push(criarObjectTesteColaborador2()) ; 
   var contentHtml = ''; 

   $scope.salvarColaborador = function (){
         console.log('inicio funcao salvarColaborador'); 
         console.log('nome' + $scope.objectColaborador.nomeColaborador);
         console.log('senha' + $scope.objectColaborador.senhaColaborador);
         
         $scope.AppendHtml();
   }


   function ObjectColaborador(id , nomeColaborador,senhaColaborador,porcentagem,texto){
      this.id = id ; 
      this.nomeColaborador = nomeColaborador ; 
      this.senhaColaborador = senhaColaborador ; 
      this.porcentagem = porcentagem ; 
      this.texto = texto ; 
      //this.refColaborador =new Array(1);
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


   $scope.AppendHtml = function() {
      
      contentHtml='';
      getColaborador($scope.listaColaboradores);

      $scope.updateHtmlLista();
   }

   $scope.updateHtmlLista = function (){
      var myEl = angular.element( document.querySelector( '#listaColaboradorHtml' ) );
      myEl.append(contentHtml);     
      $compile(myEl)($scope);
   }


   function getColaborador(lista){

      //nivel1
      for( var index=0 ; index< lista.length ; index++){

         contentHtml = contentHtml.concat('<ul><li>'+lista[index].nomeColaborador + criarButtonInput(lista[index].id))

         var refcolabNivel2= lista[index].refColaborador;
         //nivel2
         for( var indexnivel2=0 ; indexnivel2< refcolabNivel2.length ; indexnivel2++){

            contentHtml = contentHtml.concat('<ul><li>'+refcolabNivel2[indexnivel2].nomeColaborador + criarButtonInput(refcolabNivel2[indexnivel2].id));

            var refcolabNivel3= refcolabNivel2[indexnivel2].refColaborador;   

            for( var indexnivel3=0 ; indexnivel3< refcolabNivel3.length ; indexnivel3++){
               contentHtml = contentHtml.concat('<ul><li>'+refcolabNivel3[indexnivel3].nomeColaborador);   
               contentHtml = contentHtml.concat('</li></ul>')
            }
            contentHtml = contentHtml.concat('</li></ul>')
         }
         contentHtml = contentHtml.concat('</li></ul>')
      }
   }


   $scope.adicionar = function (id){
      console.log('adicionado  no de id '+ id );
      let colaboradorEncontrado = buscarColaboradorInterno(id) ; 
      console.log(colaboradorEncontrado);
      let objectColaboradorNovo = new ObjectColaborador(10,$scope.objectColaborador.nomeColaborador,
         $scope.objectColaborador.senhaColaborador,'0%','Nada');

      colaboradorEncontrado.refColaborador.push(objectColaboradorNovo);
      $scope.AppendHtml();
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


   function criarButtonInput(id){
      return ' <input type="button" value="Adicionar" ng-click="adicionar('+id+')"></input>';
   }


});

mainApp.controller('ViewStudentsController', function($scope) {
   $scope.message = "This page will be used to display all the students";
});
   