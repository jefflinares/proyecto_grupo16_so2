import mongoose, {Schema} from 'mongoose';
const casoSchema = new Schema({
    nombre: { type:String,maxlength:200, required:true},
    departamento: { type:String,maxlength:50, required:true},
    edad: { type:Number, required:true},
    forma_contagio: { type:String, maxlength:50, required:true},
    estado: { type:String,maxlength:50, required:true},
}, {collection: 'casos'});

const Usuario = mongoose.model('casos',casoSchema);
export default Usuario;