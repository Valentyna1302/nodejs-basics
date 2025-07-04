// src/validation/students.js

import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { typeList } from '../constants/students.js';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
  parentId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid(...typeList),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});

// Оголошення схеми з кастомізованими повідомленнями
// export const createStudentSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required().messages({
//     'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
//     'string.min': 'Username should have at least {#limit} characters',
//     'string.max': 'Username should have at most {#limit} characters',
//     'any.required': 'Username is required',
//   }),
//   age: Joi.number().integer().min(6).max(16).required(),
//   gender: Joi.string()
//     .valid(...typeList)
//     .required(),
//   avgMark: Joi.number().min(2).max(12).required(),
//   onDuty: Joi.boolean(),
// });

// src/validation/students.js
