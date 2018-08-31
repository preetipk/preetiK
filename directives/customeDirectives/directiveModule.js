var app = angular.module("myApp",[]);
app.directive("welcome",function(){
    return{
        restrict : "A",
        //replace : true,
        link : function(){
            alert("Welcome to Qliktag");    
        }
        
    }
    
});
app.directive("entering", function(){
    return function(scope, element) {
         element.bind("mouseenter", function(){
           console.log("Mouse has entered the div");
         })
       }
   })
   
   .directive("leaving", function(){
    return function(scope, element) {
         element.bind("mouseleave", function(){
           console.log("Mouse has left the div");
         })
       }
   });