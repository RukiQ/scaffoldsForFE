const data ={
    router: null
};

module.exports.get = function(key){
    return data[key];
}

module.exports.set = function(key, value){
    data[key] = value;
}

