const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer( function(req,res){

    const createUsers = (httpVerb,queryObject) => {
        res.end(`You have request for users ${httpVerb}, ${JSON.stringify(queryObject)}`)
    }
    const createPosts = (httpVerb,queryObject) => {
        res.end(`You have request for posts ${httpVerb}, ${JSON.stringify(queryObject)}`)
    }
    const helloWorld = (httpVerb,queryObject) => {
        res.end(`Hello World ${httpVerb}, ${JSON.stringify(queryObject)}`)
    }

    const parsedUrl = url.parse(req.url,true);
    // console.log(parsedUrl);
    const httpVerb = req.method;
     console.log('httpVerb:' + httpVerb);

     queryObject = parsedUrl.query;
    //  console.log(`query: ${JSON.stringify(queryObject)} `);
     const path = parsedUrl.path;
    // console.log(path)
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log(trimmedPath)

    const headers = req.headers;
    console.log(JSON.stringify(headers));

    const decoder = new stringDecoder('utf8');
    let buffer='';

    req.on('data',function(data){
        buffer += decoder.write(data)
    })
    req.on('end',function(){
        buffer += decoder.end()
        // res.end("hello Bye")
        console.log(buffer);
    })

    if(trimmedPath.indexOf('users') > -1)
    {
        createUsers(httpVerb,queryObject);
    }
    else if(trimmedPath.indexOf('posts') > -1)
    {
        createPosts(httpVerb,queryObject);
    }
    else
    {
        helloWorld(httpVerb,queryObject);    
    }
});

server.listen(3001,function(){
    console.log("server is running on port 3001");    
})