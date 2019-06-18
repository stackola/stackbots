const World = require("./world");

const defaultCode = `PUSH 24
TOP X`;

let world = new World({ code: defaultCode });
world.runTick();
