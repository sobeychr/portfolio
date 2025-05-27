const process = require('node:process');

const onProcess = () => {
  const onEnd = signal => {
    console.log('Ending as', signal);
  };

  const onExit = code => {
    console.log('Exit Mock-API', code);
  };

  process.on('disconnect', onExit);
  process.on('exit', onExit);
  process.on('SIGINT', onEnd);
  process.on('SIGTERM', onEnd);
};

module.exports = onProcess;
