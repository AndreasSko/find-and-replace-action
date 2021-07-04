const core = require('@actions/core');
const replace = require('replace-in-file');

const files = core.getInput('files').split("\n").filter(x => x !== "");
var from = core.getInput('from');
if (core.getInput('regex').toUpperCase() === "true") {
  from = new RegExp(from); 
}

const options = {
  from: from,
  to: core.getInput('to'),
  files: files,
};

async function run() {
  try {
    const results = await replace(options);
    console.log(`Replaced:`);
    console.log(results)
    core.setOutput("result", results);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
