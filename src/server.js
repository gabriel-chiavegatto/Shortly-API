import express from "express";
import cors from 'cors';
import usersRoutes from './routes/users.routers.js';
import urlsRouters from './routes/urls.routers.js';

import dotenv from 'dotenv';
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(usersRoutes);
server.use(urlsRouters);


const port = process.env.PORT || 4000;
server.listen(port, ()=>{console.log(`Run in ${port}`)})