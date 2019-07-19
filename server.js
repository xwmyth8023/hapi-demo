'use strict';

require('env2')('./.env');
const Hapi = require('hapi');
const mongoose = require('mongoose');
const DogController =  require('./src/controller/dog');
const MongoDBUrl = 'mongodb://localhost:27017/dogapi';

const server = new Hapi.server({
    port:3000,
    host: 'localhost'
})

server.route({
    method:'GET',
    path: '/dogs',
    handler: DogController.list
})

server.route({
    method: 'POST',
    path: '/dogs',
    handler: DogController.create
})
  
server.route({
    method: 'PUT',
    path: '/dogs/{id}',
    handler: DogController.update
})
  
server.route({
    method: 'DELETE',
    path: '/dogs/{id}',
    handler: DogController.remove
})

const startServer = async function(){
    try {  
        await server.start();
        // Once started, connect to Mongo through Mongoose
        mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {  
        console.log(err)
    }
};

startServer()