import express from 'express';
import routes from './routes';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get('/', (req, res) => { 
res.send('Server esta listo')
})

app.use('/api', routes);