const pino = require('pino');
// const __dirname = import.meta.dirname;

// const fileTransport = pino.transport({
//   target: 'pino/file',
//   options: { destination: `${__dirname}/app.log` },
// });

const logger =  pino({
    level:'info',
    transport:{
        target:'pino-pretty',
        options:{
            colorize:true,
            translateTime:'SYS:standard',
            ignore:'pid,hostname'
        }
    }
    // ,fileTransport
});

module.exports = logger;