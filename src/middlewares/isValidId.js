// src/middlewares/isValidId.js

import { isValidObjectId } from 'mongoose'; // передаємо строку якщо може бути айді - true, якщо не може - false
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { studentId } = req.params;
  if (!isValidObjectId(studentId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
