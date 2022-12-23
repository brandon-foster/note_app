const fs = require('fs');

module.exports = (function createFileio() {


    const parseJson = (fileLoc) => {
        return new Promise((res, rej) => {
            fs.readFile(fileLoc, (err, buf) => {
                if (err) {
                    res([]);
                }
                else if (buf.toString().trim().length === 0) {
                    res([]);
                }
                else {
                    const parsed = JSON.parse(buf.toString());
                    res(parsed);
                }
            });
        });
    };

    function writeJson(destinationFile, stringified) {
        fs.writeFile(destinationFile, stringified, err => console.log(err));
    }
    return {
        parseJson: parseJson,
        writeJson: writeJson,
    };
}());
