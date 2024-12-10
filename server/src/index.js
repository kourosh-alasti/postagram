import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { mongoose } from 'mongoose';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import logger from './utils/logger.js';

const PORT = process.env.NODE_PORT || 3000;
const CONN_STR = process.env.MONGO_CONN_STRING || undefined;
const COOKIE_SECRET = process.env.COOKIE_SECRET || undefined;

const CORS_CFG = {
  origin: [
    'http://localhost:5173',
    `http://localhost:${PORT}`,
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

if (COOKIE_SECRET === undefined) {
  throw Error('Cookie Secret is not defined');
}

const app = express();

app.use(cors(CORS_CFG));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

const initDatabaseConnection = async () => {
  if (CONN_STR === undefined) {
    throw Error('Undefined Connection URL');
  }

  await mongoose.connect(CONN_STR);
  logger.debug('Database Connection Initialized');
};

initDatabaseConnection().catch(() => {
  logger.error('Something went wrong while connecting to database');
  process.exit(1);
});

app.listen(PORT, () => {
  logger.log(`Server started on Port: ${PORT}`);
});
