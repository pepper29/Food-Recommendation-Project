const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: "http://kdt-vm-0202007.koreacentral.cloudapp.azure.com",
            changeOrigin: true
        })
    );
};
