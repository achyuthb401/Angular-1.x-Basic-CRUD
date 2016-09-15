var achyuth401 = angular.module('achyuth', []);
var ng = angular.element;

//Controllers
achyuth401.controller('appController', function ($scope) {
    ng('.button-collapse').sideNav();
    ng('.content-area').addClass('ng-hide');
    ng('#register').removeClass('ng-hide');
    ng('.login_errormsg, .add_user_error').hide();
    $scope.logged = false;
    $scope.curent_user = '';

    var menus = function(logged){
    	$scope.menus = [
	        { title:'Login', href:'#login', fun:'login', state: !logged },
	        { title:'Register', href:'#register', fun:'register', state: !logged },
	        { title:'Users', href:'#users', fun:'users', state: logged },
	        { title:'Profile', href:'#profile', fun:'profile', state: logged },
	        { title:'Logout', href:'#logout', fun:'logout', state: logged }
    	];
    	return $scope.menus;
    }
    
    $scope.users = [
        { id: 1, email: 'developer.achyuth@gmail.com', pwd: '741', name: 'Achyuth 401', about: 'code is poetry' },
        { id: 2, email: 'achyuth.code@gmail.com', pwd: '741', name: '401 Achyuth', about: 'A Perfect day to code' },
        { id: 3, email: 'achyuth.b@uandme.org', pwd: '741', name: 'Achyuth B', about: 'Working hours' }
    ];

    // Default menu
    menus($scope.logged);

    //Check user email
    function checkEmail(user){
        return user.email === $scope.logemail;
    }

    function userAvailable(user){
        return user.email === $scope.email;
    }

    //User Action 
    $scope.useraction = function(userval){
        ng('.content-area').addClass('ng-hide');
        var href = userval.href;
        var fun = userval.fun;
        ng(href).removeClass('ng-hide');
        if(fun == 'logout'){
            ng('.content-area').addClass('ng-hide');
            ng('#login').removeClass('ng-hide').fadeIn('slow');
            $scope.logged = false;
            menus($scope.logged);
            var toastContent = ng('<span>Logout, successfully..!</span>');
            ng('.errormsg').hide();
            Materialize.toast(toastContent, 3500)
        }
    }

    //Add users
    $scope.addusers = function(){
        var check_user = $scope.users.find(userAvailable);
        console.log(check_user);
        if(check_user === undefined){
            $scope.users.unshift({
                id: $scope.users.length+1,
                email:$scope.email, 
                pwd:$scope.pwd, 
                name:$scope.name, 
                about:$scope.about 
            });
            var toastContent = ng('<span>User Register successfully..!</span>');
            Materialize.toast(toastContent, 3500)
            console.log($scope.users);
            return $scope.users;
        }else{
            var toastContent = ng('<span>User email already exists..(;</span>');
            Materialize.toast(toastContent, 3500)
            $scope.add_user_error = 'Oops, User email already exists..(;';
            ng('.add_user_error').show();
        }
    }

    //Check user 
    $scope.checkUser= function(){
        var curent_user = $scope.users.find(checkEmail);
        if(curent_user != undefined && curent_user.pwd === $scope.logpwd){
            //Get current user
            $scope.curent_user = curent_user; 
            ng('.content-area').addClass('ng-hide');
            ng('#users').removeClass('ng-hide');
            menus(true);
        }else{
            $scope.errormsg = 'Oops, Login details are incorrect';
            ng('.login_errormsg').show();
        }
    }
});