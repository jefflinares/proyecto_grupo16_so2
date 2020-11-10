import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
import mongoose from 'mongoose';
import router from './routes'
import cfgVar from './configuration/Variables'

mongoose.Promise = global.Promise;
mongoose.connect(cfgVar.urlMongoDB, cfgVar.configMongoDB)
.then(mongoose => console.log('Conectado a: '+cfgVar.urlMongoDB))
.catch(err => console.log('error: '+ err));

const app=express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api',router)
app.set('port',process.env.PORT || 3100);
app.listen(app.get('port'), () => {
    console.log('server on port '+app.get('port'));
}); 