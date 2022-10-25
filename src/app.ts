import express, { application, Request } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import api from './routes/api.routes'

// aca estamos creadno la aplicacion 
const makeApp = async () : Promise<typeof application> =>{
    const app = express()

    // enviando parametros para morgan 
    // morgan nos imprime en consola, cuales son los resultados que retorna 
    app.use(morgan('dev', {
        skip: (req: Request) => req.url === '/api/ping/user'
    }));

    // se utiliza corse para ver la consola 
    app.use(cors()) 
    // boby paraser para  configurar que recibe el serever
    app.use(bodyParser.urlencoded({extended: false, limit:'100mb'}))
    // se parsea al json    
    app.use(bodyParser.json({limit: '100mb'}))
    
    app.use('/api', api)
    return app;
}

export default makeApp;