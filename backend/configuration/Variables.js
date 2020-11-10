import dotevn from 'dotenv'
dotevn.config();

export default {
    //variables con la configuracion para la base de datos de MongoDB
    urlMongoDB:process.env.URL_MONGO,
    configMongoDB : {
        user:process.env.USER_MONGO, 
        pass:process.env.PASSWORD_MONGO,
        dbName:process.env.DBNAME_MONGO,
        useFindAndModify:false,
        useNewUrlParser:true, 
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true,
    },
    //variables de redis
    redisPort:process.env.REDIS_PORT,
    redisHost:process.env.REDIS_HOST
}