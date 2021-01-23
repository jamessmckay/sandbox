const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const glob = require("glob");

const data = require("./properties.json");

glob("**/*.hbs", function (er, files) {
  files.forEach((file) => {
    const inFile = file;
    const outFile = path.join(path.dirname(file), "Dockerfile");

    const source = fs.readFileSync(inFile, "utf8");
    const template = handlebars.compile(source, { strict: true });
    const result = template(data);

    console.log("---------------------------------------");
    console.log(result);

    fs.writeFileSync(outFile, result);
    console.log(`File written to ${outFile}`);

    console.log("---------------------------------------");
  });
});
