import { CustomError } from './../error/custom-error.js';

const errorMiddleware = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({message: error.message});
  } else {
    return res.status(500).json(
      {message: `something goes wrong ${error.message}`}
    );
  }
};

export { errorMiddleware };
