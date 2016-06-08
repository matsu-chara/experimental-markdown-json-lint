var glob = require("glob");
var fs = require("fs");
var mdParser = require("markdown-to-ast");
var jsonParser = require("jsonlint").parser;

var filepattern = (process.argv[2]) ? process.argv[2] : "*.md";
var filenames = glob.sync(filepattern)

var isError = false
filenames.forEach(function(filename) {
  console.log(filename);
  var markdown = fs.readFileSync(filename, "utf8");
  var AST = mdParser.parse(markdown);
  var jsons = findJsons(AST, []);
  isError = checkJsons(jsons) || isError;
});

if(isError) {
  process.exit(1);
}

function findJsons(node, acc) {
  if(node.type == "CodeBlock" && node.lang == "json") {
    acc.push(node.value);
  }

  if(node.children) {
    node.children.forEach(function(e) {
      findJsons(e, acc);
    });
  }

  return acc;
}

function checkJsons(jsons) {
  var isError=false;
  jsons.forEach(function(j) {
    try {
      jsonParser.parse(j);
    } catch (e) {
      isError=true;
      console.log(e.message);
    }
  });
  return isError;
}
