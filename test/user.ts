import Parse from '../src/util/Parse'



;(async () =>{
    const user =  new Parse.User()
    user.set('username', 'my name')
    user.set('password', 'my pass')
    try{
        await user.signUp()
    }catch(e){
        console.log(e)
    }
    
})()
