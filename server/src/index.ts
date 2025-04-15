import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware';

// Route import

import tenentRoutes from './routes/tenentRoutes';
import  managerRoutes from './routes/managerRoutes';
import propertyRoutes from './routes/propertyRoutes';
import leaseRoutes from './routes/leaseRoutes';
import applicationRoutes from './routes/applicationRoutes'

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/properties', propertyRoutes);
app.use('/tenants', authMiddleware(['tenant']), tenentRoutes);
app.use('/managers', authMiddleware(['manager']), managerRoutes);
app.use('/leases', leaseRoutes);
app.use('/applications', applicationRoutes)
 
// server

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
