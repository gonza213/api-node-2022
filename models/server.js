const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        msg: 'Get API'
      });
    });

    this.app.post("/api", (req, res) => {
        res.status(201).json({
          msg: 'Post API'
        });
      });
      this.app.put("/api", (req, res) => {
        res.status(400).json({
          msg: 'Put API'
        });
      });
      this.app.delete("/api", (req, res) => {
        res.json({
          msg: 'Delete API'
        });
      });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
