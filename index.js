
const http = require('http');
const app = require('./src/config/express.config');
const httpServer=http.createServer(app)

httpServer.listen(3005,'127.0.0.1',(error)=>{   //can take  one or three parameter
if(!error){
    console.log("server is runing on the port:3005");
    console.log("press CTRL+C to disconnect the server");
}
}) 















