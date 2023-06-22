const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("file.log", {
    interval: '1d',
    path: logDirectory
});



const development = {
    name:'development',
    assets_path:'./public/assets',
    session_cookie_key:'26174AD346C8BE91C1843255BC478',
    db:'authenticated_list_db',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'harshit.sharma89501@gmail.com',
            pass:'lctiasbrvjawcxbv'
        }
    },
    google_client_ID:"685870990916-38odq6er7avid7d82ic658mdvleeukv7.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_call_back_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret_key:'F62273CF786D2C85E5E26C1E93473',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name:'production',
    assets_path:process.env.CODEIAL_ASSETS_PATH,
    session_cookie_key:process.env.CODEIAL_SEESION_COOKIE_KEY_PATH,
    db:process.env.CODEIAL_DB_PATH,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_SMTP_AUTH_USER_PATH,
            pass:process.env.CODEIAL_SMTP_AUTH_PASS_PATH
        }
    },
    google_client_ID:process.env.CODEIAL_GOOGLE_CLIENT_ID_PATH,
    google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET_PATH,
    google_call_back_URL:process.env.CODEIAL_GOOGEL_CALL_BACK_URL_PATH,
    jwt_secret_key:process.env.CODEAIL_JWT_SECRET_KEY_PATH,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

// const production = {
//     name:'production',
//     assets_path:'./assets',
//     session_cookie_key:'26174AD346C8BE91C1843255BC478',
//     db:'authenticated_list_db',
//     smtp:{
//         service:'gmail',
//         host:'smtp.gmail.com',
//         port:587,
//         secure:false,
//         auth:{
//             user:'harshit.sharma89501@gmail.com',
//             pass:'lctiasbrvjawcxbv'
//         }
//     },
//     google_client_ID:"685870990916-38odq6er7avid7d82ic658mdvleeukv7.apps.googleusercontent.com",
//     google_client_Secret:"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",
//     google_call_back_URL:"http://localhost:8000/users/auth/google/callback",
//     jwt_secret_key:'F62273CF786D2C85E5E26C1E93473'
// }

console.log(process.env.CODIAL_ENVIRONMENT_PATH);
module.exports = eval(process.env.CODIAL_ENVIRONMENT_PATH)==undefined?development:eval(process.env.CODIAL_ENVIRONMENT_PATH);
// module.exports=development;