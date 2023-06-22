const env = require('./environment');

const path = require('path');

const fs = require('fs');

module.exports = (app)=>{
    app.locals.assetsPath = function(filePath){
        if(env.name=='development'){
            return filePath;
        }
        return '/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
}