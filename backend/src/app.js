const express = require('express');
const cors = require('cors');

class App {
  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  start(PORT) {
    this.app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  }
}

module.exports = new App();
