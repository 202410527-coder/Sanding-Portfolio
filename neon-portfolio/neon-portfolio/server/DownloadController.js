/** Counts how many times the CV was downloaded. */
class DownloadController {
  constructor(store) {
    this.store = store;
  }

  handle = (req, res) => {
    this.store.update((data) => {
      data.total += 1;
      data.log = [...data.log, new Date().toISOString()].slice(-500);
    });
    res.json({ ok: true });
  };
}

module.exports = DownloadController;
