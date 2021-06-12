import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import '../typeorm'; // Carregamento do banco de dados com o typeorm
import '../../container'; // Container de providers (injeção de dependências)

import uploadConfig from '../../../config/upload';

import appRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

// Servindo a rota 'files' para acessar os arquivos de forma estática
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(appRoutes);

app.listen(3333, () => {
  console.log('Running at 3333 ;)');
});
