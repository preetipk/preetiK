
app.service("userService",["$http",function($http){
       
    this.getUsers = function(){
        return $http.get("https://reqres.in/api/users");
    }
    this.getUser = function(id){
        return $http.get("https://reqres.in/api/users/"+id);
    }
    this.updateUser = function(id,data){
        return $http.post("https://reqres.in/api/users/"+id,data);
    }
    this.deleteUser = function(id){
        return $http.delete("https://reqres.in/api/users/"+id);
    }
 }]);


