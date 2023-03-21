const fs = require('fs');

module.exports = (function createFileio() {

    function write(destinationFile, stringified) {
        return new Promise((res, rej) => {
            fs.writeFile(destinationFile, stringified, err => {
                if (err !== null) {
                    console.error(`fs.writeFile(): an error occured`);
                    console.table(err);
                }
                else {
                    res();
                }
            });
        });
    }

    function read(filename) {
        return new Promise((res, rej) => {
            fs.readFile(filename, (err, buf) => {
                if (err) {
                    res(null);
                }
                else if (buf.toString().trim().length === 0) {
                    res(null);
                }
                else {
                    res(JSON.parse(buf.toString()));
                }
            });
        });
    }

    return {
        write: write,
        read: read,
    };
}());
