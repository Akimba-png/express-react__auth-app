import express from 'express';
import 'dotenv/config';
import { authRouter } from './routers/auth-router.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use(errorMiddleware);

app.listen(port, () => console.log(`app listen on port ${port}`));
