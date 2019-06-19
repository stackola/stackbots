const CPU = require("./cpu");

class World {
  constructor({ code: code }) {
    this.bots = [new CPU({ code: code, id: 0 })];
  }
  runTick() {
    let botCount = this.bots.length;
    for (var i = 0; i < botCount; i++) {
      this.bots[i].runTick(this);
    }
  }
  addBot(data) {
    this.bots.push(new CPU({ ...data, id: this.bots.length }));
  }
  updateCode(id, code) {
    this.bots.find(b => b.id == id).updateCode(code);
  }
  reset() {
    this.bots = this.bots
      .filter(b => !b.isTemp)
      .map(b => {
        b.resetBot();
        return b;
      });
  }
  toJSON() {
    return { botCount: this.bots.length };
  }
}

module.exports = World;
