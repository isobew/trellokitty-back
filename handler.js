const serverless = require("serverless-http");
const app = require("./app");

module.exports.api = serverless(app, {
    request: function (req, event) {
        if (event.body) {
            try {
                req.body = JSON.parse(event.body); // 🚀 Força a conversão do JSON corretamente
            } catch (err) {
                console.error("Erro ao converter JSON:", err);
            }
        }
    }
});
