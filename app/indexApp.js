angular.module('app', [])
.controller('gitHubDataController', ['$scope','$http', function($scope,$http) {

        $scope.username = "pnk0011";
        $scope.search = "";
        $scope.putloader = false;
        $scope.repoData;
        $scope.userData  = [];
        $scope.pageCount = 1;
        $scope.iferror = false;
        $scope.putLoader = function () {

          $scope.putloader = true;
          
        }

        $scope.next = function () {
          if($scope.pageCount<$scope.totalPages){ 
          $scope.pageCount += 1;
          $scope.putLoader();
          $scope.getData();
          }
        }

        $scope.previous = function () {
          if($scope.pageCount>1){ 
          $scope.pageCount -= 1;
          $scope.putLoader();
          $scope.getData();
          }
        }

$scope.getData = function () {  

       var config = {     headers:  {
         
           'Accept': 'pplication/vnd.github.mercy-preview+json',
       
       }
   };

        $http.get("https://api.github.com/search/repositories?q=language:"+$scope.search+"&sort=forks&order=desc&page="+$scope.pageCount+"&per_page=20",config)
        .then(function (response) {
  
            $scope.userData = response.data.items;
            $scope.putloader = false;
            $scope.iferror = false;
            $scope.totalPages = Math.ceil(response.data.total_count/20) ;
          //  getRepoDetails();
         
          console.log('resonse from git API : '+ JSON.stringify(response.data));
          
        })
        .catch(function (data) {

          $scope.userData  = [];
          $scope.putloader = false;
          $scope.iferror = true;

        });
      }

      var   getRepoDetails = function () {  
   
        $http.get($scope.userData.repos_url)
        .then(function (response) {
  
            $scope.repoData = response.data;
         
        //  console.log('resonse from git API : '+ JSON.stringify(response.data));
          
        });

    }



}]);