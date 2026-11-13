const fs = require("fs");

/** Saves and loads a small JSON file. */
class JsonStore {
  constructor(file, fallback) {
    this.file = file;
    this.fallback = fallback;
  }

  read() {
    if (!fs.existsSync(this.file)) return structuredClone(this.fallback);
    return JSON.parse(fs.readFileSync(this.file, "utf8"));
  }

  write(data) {
    fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
  }

  update(change) {
    const data = this.read();
    change(data);
    this.write(data);
    return data;
  }
}

module.exports = JsonStore;
