const bonjour = require('bonjour-service');

const instance = bonjour();

// advertise an HTTP server on port 3000
instance.publish({ name: 'My Web Server', type: 'http', port: 3000 });

// browse for all http services
instance.find({ type: 'http' }, function (service) {
    console.log('Found an HTTP server:', service);
});