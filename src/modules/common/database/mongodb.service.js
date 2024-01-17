// const {MongoClient} = require("mongodb")
// class MongodbServices{
//     db;
//     constructor(){
//         try{
//            this.connect(); 
//         }catch(exception){
//             console.log(exception)
//             throw exception;
//         }
//     }
//     connect =async()=>{
//         try{
//             const client =await MongoClient.connect("mongodb://127.0.0.1:27017")
//             this.db = client.db('API')
//         }catch(exception){
//             throw exception

//         }
//     }
// }
// module.exports = MongodbServices;