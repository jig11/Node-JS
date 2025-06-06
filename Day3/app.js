
//EVENTS
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.on('greet',function(val){
//     console.log(`Hello ${val}`);
// })

// emitter.emit('greet','Alice');

//NODE REPL
// USE NODE in CMD to use REPL editor

//ASYNC / AWAIT
function fetchData(){
    return new Promise((resolve,reject) =>{
            setTimeout(() =>{
                var flag = false;
                if(flag)
                resolve("data recd");
                else
                reject("reject");
            },1000)
    })
}

async function main()
{
    try{
        const res = await fetchData();
        console.log(res);
    }
    catch(err)
    {
        console.error(err)
    }
}

main();

//FILE SYSTEM PROMISE

// const fs = require('fs').promises;

// async readFileContent()
// {
//     const content= new FileReader()
// }
