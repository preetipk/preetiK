
app.service("userService",["$http","$rootScope",function($http,$rootScope){
       
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
      
      this.students=[];

      this.setStudent=function(studentInfo){
          console.log("in userService"+ studentInfo);
          this.students.push(studentInfo);
           console.log(this.students);
          $rootScope.$broadcast('eventName');
         //console.log("in services"+user);
      }

      this.getStudent = function(){
        return students;
    }

 }]);


