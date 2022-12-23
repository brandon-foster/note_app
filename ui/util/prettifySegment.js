module.exports = function prettifySegment(segment) {
    return decodeURI(segment.trim())
        .replaceAll(' ', '-')
        .toLowerCase();
};
