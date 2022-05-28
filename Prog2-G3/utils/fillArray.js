function  fillArray (largo) {
    var arr = [];
    while(arr.length < largo){
        var r = Math.floor(Math.random() * 10);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

module.exports = fillArray;