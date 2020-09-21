/**
 * JsonFile object definition
 */

const File = require('./File');

class JsonFile extends File {
  constructor(filepath) {
    super(filepath);
  }

  async read() {
    const data = await this.readFile();
    return JSON.parse(data);
  }

  async write(data) {
    const json = JSON.stringify(data);
    await this.writeFile(json);
  }
}

module.exports = JsonFile;