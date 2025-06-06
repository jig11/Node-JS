//MODULES
// const myModule = require("./myModule");
// myModule.sayHello();
// myModule.sayGoodBye();


//FILE SYSTEMS
// const fs = require('fs');

// fs.readFileSync('./myModule.js','utf-8',(err,data) => {
//     if(err) throw err;
//     console.log(data)
// })
// console.log('read file')

// fs.mkdir('test',(err)=>{
//     if(err) throw err;
//     console.log('Directory Created');
// })

// fs.rmdir('test',(err)=>{
//     if(err) throw err;
//     console.log('Directory Removed');
// })

// fs.stat('./myModule.js','utf-8',(err,data) => {
//     if(err) throw err;
//     console.log(data)
// })
// console.log('read file')


//fs.stat()
//fs.existsSync()
//fs.lstat()


//CALLBACK FUNCTIONS
// function greet(name,callback)
// {
//     console.log('Hi' + '' + name);
//     // callback();
// }

// function callMe()
// {
//     console.log('I am callback function')
// }

// greet('Peter',callMe);


//STREAMS
// const fs = require('fs');
// const readableStream = fs.createReadStream('./myModule.js','utf-8');
// readableStream.on('data',(data)=>{
//     console.log(data)
// });


//PROMISE
(function(){
    var doAsync = function() 
    {
        var p = new Promise(function(resolve,reject)
            {
                setTimeout(function(){
                    // resolve({msg:'doAsync promise fulfilled'})
                    reject({msg:'doAsync promise rejected'})
                },5000);
            });
        return p;
    }

    doAsync().then(function(response){
        console.log('suuccess:' , response.msg);
    },function(response){
        console.log('failure:' , response.msg);
    });

})();