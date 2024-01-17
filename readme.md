#API
endpoint /URL
mehod,url,paylod,header config,query
protocol:domain name .tld:port no

to see port number(websites:welknown port/port list)
http=<<><<<80
https=<<<443
some other protocols
mysql==>>>>3306
mongo db=>>>>27017
pop3,imap,smtp=<<<<<25,2525,485,587
telnet,ssh,sftp=<<<<22
ftp===>>>21

#server side architecture
MVC patten
    model-view-controller
REST API>> there will be nonany state maintianed by server
        login Api>>user loggedin
        rest apt uses following methods
        get,put,post,patch,delete
        >>CRUD operation
            create
             read
              udate
               delete
SOAP API>>
>>>>>postman

mongodb:
host ==>>local host/127.0.0.1
protol==>> mongodb
user ==>>null
password==>>null
port==>>27017
dbname=>>>...
url==>>mongodb://user:password@127.0.0.1:27017/dbname
//Shells commands....!!!
===>>>>Switch db from shell
    --->>>use<dbname>
==>>>list of dbs
    --->>>show dbs;
===>>>>Current Db(active db)
    ---->>>db;
==>>>To list all the table in  current DB
    --->>>show tables;

### CRUD operations!!!
#Create
===>>>>Data,Table
_id is auto append when create data>>primarykey(unique)
    *Insert one
        -->>db.<collectionName>.insertOne(jsobject)
        -->>db.<collectionName>.insertMany([jsobject])
#Read
 -->>db.<collectionName>.findOne(filter,projection)
 -->>db.<collectionName>.find(filter,projection)
        *FILTER
        -->>object data
        {
            $operationName:expression
        }
        (or)
        {
            key:[{$operationName:expression}]
        }
        //not equal
        {key:{$ne:value}}
        //equals
        {key:value,key1:value}
        //And operation
        {key:value,keey1:value}
        (or)
        {
            $and:[
                {key:value}
                {$operation:exp}
            ]
        }
    //Or operation
    {
        $or:[
            {key:value},{key:value}
        ]
    }
    //$gt, $gte, $lt, $


===>>>to show specific value
    -->>>db.<collectionName>.find({},{key:1,key:1})
===>>>to ignore id
    --->>>db.<collectionName>.find({},{key:1,key:1,_id:0})

##Update
    -->>db.<collectionName>.updateOne(filter,updateBody,config)
    -->>db.<collectionName>.updateMany(filter,updateBody,config)

    filter==>>ID based filter
        -->>{id:Object('idString')}
##Delete
    -->>>db.<collection>.deleteOne(filter)
    -->>>db.<collection>.deleteMany(filter)

    ##ORM/ODM
    ===>>>Object Relational Modeeling/MApping
    ===>>>Object Document Mapping/Modeling

use ODM providers>>>>>MOngoose
SQL servers
    >>>>typescript---->>typeorm,sequelize,prisma
    >>>>javascript--->>>sequelize,prisma




    category
        =>name
        =>sub-category
        =>slug
        =>status
        =>image