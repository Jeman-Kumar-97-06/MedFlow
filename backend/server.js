require('dotenv').config()
const {McpServer, ResourceTemplate}
                = require('@modelcontextprotocol/sdk/server/mcp.js');
const {StreamableHTTPServerTransport}
                = require('@modelcontextprotocol/sdk/server/streamableHttp.js')
const cors      = require('cors');
const express   = require('express');
const mongoose  = require('mongoose');
const app       = express();
const path      = require('path');

app.use(express.json());
app.use(cors());

//If Production:
if (process.env.NODE_ENV==='production'){
    const clientPath = path.join(__dirname,'../frontend/dist');
    app.use(express.static(clientPath));
    app.get('/',(req,res)=>{
        res.sendFile(path.join(clientPath,'index.html'));
    })
};

//Connect to mongoose database server:
mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log("Connected to db an listening at ",process.env.PORT);
    })
}).catch(error=>console.log(error));