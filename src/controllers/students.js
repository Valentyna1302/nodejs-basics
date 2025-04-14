import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getStudentsController = async (req, res) => {
  // Отримуємо параметри пагінації (сторінка і кількість на сторінці) з запиту
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  // Викликаємо функцію для отримання списку студентів з вказаною пагінацією
  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    // 2. Створюємо та налаштовуємо помилку
    throw createHttpError(404, 'Student not found');
  }

  // Відповідь, якщо контакт знайдено
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

//* POST

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

//* DELETE

export const deleteStudentController = async (req, res) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(204).send();
};

//* PUT

export const upsertStudentController = async (req, res) => {
  const { studentId } = req.params; //Отримує studentId із параметрів URL (req.params)

  const result = await updateStudent(studentId, req.body, { upsert: true }); // Викликається updateStudent, яка оновлює дані студента або створює нового (upsert: true). req.body містить дані для оновлення.

  if (!result) {
    throw createHttpError(404, 'Student not found');
  }

  const status = result.isNew ? 201 : 200; //Якщо студент був створений (isNew === true) → 201 Created. Якщо студент просто оновлений (isNew === false) → 200 OK.
  // isNew береться з результату, що повертається з функції updateStudent

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};

//* upsertStudentController:
// Використовує upsert: true в updateStudent.
// Студента можна створити (якщо не знайдено) або оновити.
// Статус відповіді: 201 (якщо створено), 200 (якщо оновлено).

//* patchStudentController:
// Не використовує upsert.
// Студента тільки оновлює (якщо студент не знайдений, повертається 404).
// Статус відповіді: завжди 200 (оновлено).

//* PATCH

export const patchStudentController = async (req, res) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
