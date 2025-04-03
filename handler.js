const awsServerlessExpress = require("aws-serverless-express");
const { app } = require("./app");

const server = awsServerlessExpress.createServer(app);

exports.api = (event, context) => {
    return awsServerlessExpress.proxy(server, event, context);
};
