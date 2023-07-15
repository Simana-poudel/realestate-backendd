const config = require("./env")


let whitelist=config.getInstance().allowedDomains

if(!whitelist){
    whitelist = ['http://localhost:3000', 'http://localhost:5000']
}

exports.corsOptions = {
    origin: function (origin, callback) {
      // console.log({origin,whitelist})
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
      ,
    methods:['GET', 'PUT', 'POST','PATCH','DELETE','HEAD','OPTIONS'],
    maxAge:60,
    credentials:true,
    exposedHeaders:['Content-Range','X-Content-Range','X-Powered-By','ETag','Date','Connection','Keep-Alive','Token'],
    allowedHeaders:['Origin','X-Requested-With','Content-Type','Accept','Authorization','Accept-Encoding']
}

