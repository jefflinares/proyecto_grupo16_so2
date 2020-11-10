import redis from "redis";
import models from "../models"
import cfgVar from '../configuration/Variables'

export default {
    list: async (req,res,next) =>{
        res.status(200).send(await models.Caso.find());
    },
    casosCount: async (req, res, next)=>{
        let options = [
            { $match: { departamento: 'Guatemala', status: 'Activo'  } }, 
            { $group: { _id: '$_id', count: {$sum: 1} } }
        ]
        res.status(200).send({data:await models.Caso.aggregate(options).exec()})
    },
    casosPie: async(req,res,next) =>{
        const data = await models.Caso.find();
        //map clave-departamento valor-conteo
        const mapSort = new Map()
        for (const departamento of data){
            if(mapSort.has(departamento.departamento)){
                mapSort.set(departamento.departamento,mapSort.get(departamento.departamento)+1)
            }else{
                mapSort.set(departamento.departamento,1)
            }
        }
        //ordeno el map
        mapSort[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
        }
        //lista para la gráfica de pie x-y
        let temp = []
        mapSort.forEach((value,key)=>{
            temp.push({x:key,y:value})
        })
        res.status(200).send(temp)
    },
    topCasos:async(req,res,next) =>{
        const data = await models.Caso.find();
        //map clave-departamento valor-conteo
        const mapSort = new Map()
        for (const departamento of data){
            if(mapSort.has(departamento.departamento)){
                mapSort.set(departamento.departamento,mapSort.get(departamento.departamento)+1)
            }else{
                mapSort.set(departamento.departamento,1)
            }
        }
        //ordeno el map
        mapSort[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
        }
        res.status(200).send(mapSort)
    },
    listRedis: async(req,res,next) =>{
        let client = redis.createClient({
            db: 1,
            port: cfgVar.redisPort,
            host: cfgVar.redisHost
        })
        try {
            client.get(req.body.lista, async (err, data) => {
                if(err) return new Error(err)
                //si la data es null -- es porque no existe, entonces es primera carga
                if (data==null) return res.status(404).send({valid:false,msg:"No se encontró información en redis"});
                //si no es null, es porque si encontró la data, entonces retorno la data
                console.log('DATA ENCONTRADA!')
                //envío la información a frontend de la data
                console.log(data)
                return res.status(200).send({
                    valid:true,
                    data:JSON.parse(data)
                });
            }).end();
        } catch (error) {
            res.status(500).send({valid:false,msg:"Error de conexión con redis"})
        }
    }
}