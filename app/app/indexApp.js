angular.module('app', [])
  .controller('Controller', ['$scope', '$http', function ($scope, $http) {

    window.onscroll = function () { myFunction() };

    var header = document.getElementById("Doctorfixit");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    $scope.getData = function () {

      var auth = 'dGVzdHVzZXI6dGVzdHBhc3N3b3Jk';

      var config = {
        headers: {

          "Authorization": "Basic " + auth,

        }
      };

      $http.get("https://sandoratest-service.herokuapp.com/api/property/quickView?long=-121.88632860000001&lat=37.3382082&distance=100&userId=null", config)
        .then(function (response) {
          $scope.proData = response.data.data;
          console.log('resonse from git API : ' + JSON.stringify(response.data));

        })
        .catch(function (data) {

          $scope.proData = [];
         

        });
    }

    $scope.getData();
    $scope.MINRENTVAL = 0;
    $scope.MAXRENTVAL = 9999999;

    $scope.setMinRange = function () {
      $scope.MINRENTVAL = $scope.MINRENT;
    }

    $scope.setMaxRange = function () {
      $scope.MAXRENTVAL = $scope.MAXRENT;
    }


    $scope.clearSearchValues = function () {
      $scope.BEDSVAL = '';
      $scope.BEDS = '';
      $scope.BATHVAL = '';
      $scope.BATH = '';
      $scope.MINRENT = '';
      $scope.MAXRENT = '';
      $scope.MINRENTVAL = 0;
      $scope.MAXRENTVAL = 9999999;
    }
    $scope.BEDSVAL = '';
    $scope.setBed = function () {
      if ($scope.BEDS == 0) {
        $scope.BEDSVAL = '';
      } else {
        $scope.BEDSVAL = $scope.BEDS;
      }
    }
    $scope.BATHVAL = '';
    $scope.setBath = function () {
      if ($scope.BATH == 0) {
        $scope.BATHVAL = '';
      } else {
        $scope.BATHVAL = $scope.BATH;
      }
    }


    $scope.greaterThan = function (prop, val) {
      return function (item) {
        if (item[prop] >= val) return true;
      }
    }

    $scope.lessThan = function (prop, val) {
      return function (item) {
        if (item[prop] <= val) return true;
      }
    }



  }]);


