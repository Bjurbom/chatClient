//removeUser(id);
//addUser(id,name,room);
//getUser(id);
//getUserList(room);
//ES6 user

class Users{
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){

    }
    getUser(id){

    }
    getUserList(room){
        //google this shit idk
        var users = this.users.filter((user)=>{
            return user.room === room;
        });
        var namesArray = users.map((user) => user.name);

        return namesArray
    }

}


module.exports = {Users};
