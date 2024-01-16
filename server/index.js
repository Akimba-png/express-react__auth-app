import express from 'express';
import 'dotenv/config';
import { authRouter } from './routers/auth-router.js'

const port = process.env.PORT

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

app.listen(port, () => console.log(`server is listening on port ${port}`));