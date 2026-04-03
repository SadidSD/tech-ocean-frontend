const potrace = require('potrace');
const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.log('Usage: node vectorizer.js [input.png] [output.svg]');
    process.exit(1);
}

const params = {
    color: '#000000',
    background: 'transparent',
    optTolerance: 0.2,
    turdSize: 100, // filter small noise
    turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY
};

potrace.trace(inputFile, params, function(err, svg) {
    if (err) throw err;
    // ensure pure black flat output by replacing generated styles if any
    fs.writeFileSync(outputFile, svg.replace('<svg ', '<svg fill="#000000" '));
    console.log('Successfully vectorized: ' + outputFile);
});
