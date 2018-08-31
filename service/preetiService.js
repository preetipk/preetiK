app.service("preetiService",function(){
    this.data=[];

    this.onSubmit = function(user){
        console.log(user);
        this.data.push(user);
        console.log(this.data); 
    }
    
    this.get = function(){
        return this.data;
    }
});