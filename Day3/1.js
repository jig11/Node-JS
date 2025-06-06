2+2
console.log('Hello')
console.log('Hello')
console.log('Hello')console.log('hi')
console.log('Hello');console.log('hi')
function abc(){
console.log('def')}
function abc(){
console.log('def')
}
abc()

//EVENTS
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet',function(val){
    console.log(`Hello ${val}`);
    })
    
    emitter.emit('greet','Alice');
    
    //NODE REPL
    // USE NODE in CMD to use REPL editor