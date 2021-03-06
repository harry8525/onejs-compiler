var TypeScriptViewModelGenerator = require('../dist/TypeScriptViewModelGenerator');
var TypeScriptGenerator = require('../dist/TypeScriptGenerator');
var TypeScripTestStubGenerator = require('../dist/TypeScriptTestStubGenerator');
var fs = require('fs');
var path = require('path');

if (process.argv.length < 3) {
    console.log('usage: node generate.js template.html');
} else {
    var filePath = process.argv[2];
    var fileName = path.basename(filePath, path.extname(filePath));
    var fileContent = fs.readFileSync(filePath, 'utf8').toString();

    var tsGenerator = new TypeScriptGenerator();
    var interfaceGenerator = new TypeScriptViewModelGenerator();
    var testStubeGenerator = new TypeScripTestStubGenerator();

    fs.writeFileSync(fileName + '.ts', tsGenerator.generate(fileContent, fileName));
    fs.writeFileSync('I' + tsGenerator.template.name + 'Model.ts', interfaceGenerator.generate(fileContent));
    fs.writeFileSync(fileName + 'TestStub.ts', testStubeGenerator.generate(fileContent, fileName));
}
