// import express from 'express';
// import cors from 'cors';
// import { config } from 'dotenv';
// import DatabaseConnection from './DataBase/Connection.js'
// import { getGadgets,
//     addGadget,
//     updateGadget,
//     deleteGadget,
//     selfDestructGadget} from './Components/Routes.js'
// config();
// const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended: true}));
// DatabaseConnection();

// app.use(cors({
//     origin: '*',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
// }))
// // app.get('/',(re,res)=>{
// //     res.send('Welcome to the API')
// // })



// app.get('/', getGadgets);
// app.post('/', addGadget);
// app.patch('/:id', updateGadget);
// app.delete('/:id', deleteGadget);
// app.post('/:id/self-destruct', selfDestructGadget);
// app.listen(process.env.Port,()=>{
//     console.log(`Server is running on port ${process.env.PORT}`)
// })
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import DatabaseConnection from './DataBase/Connection.js';
import { getGadgets, addGadget, updateGadget, deleteGadget, selfDestructGadget } from './Components/Routes.js';
import swaggerSetup from './swagger.js';

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DatabaseConnection();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

swaggerSetup(app);

app.get('/', getGadgets);
app.post('/', addGadget);
app.patch('/:id', updateGadget);
app.delete('/:id', deleteGadget);
app.post('/:id/self-destruct', selfDestructGadget);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
