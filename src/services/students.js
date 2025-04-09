import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// export const getAllStudents = async () => {
//   const students = await StudentsCollection.find();
//   return students;
// };

// Функція для отримання всіх студентів з пагінацією
export const getAllStudents = async ({ page, perPage }) => {
  // Встановлюємо кількість елементів на сторінці (limit)
  const limit = perPage;
  // Обчислюємо пропуск елементів (skip) для пагінації
  const skip = (page - 1) * perPage;

  // Створюємо запит для отримання колекції студентів
  const studentsQuery = StudentsCollection.find();

  // Обчислюємо загальну кількість студентів
  const studentsCount = await StudentsCollection.find()
    .merge(studentsQuery) // Зливаємо запит для підрахунку студентів
    .countDocuments(); // Підраховуємо документи (студентів)

  // Отримуємо студентів з застосуванням пагінації
  const students = await studentsQuery.skip(skip).limit(limit).exec();

  // Обчислюємо додаткові дані для пагінації
  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  // Повертаємо результати з даними студентів і пагінацією
  return {
    data: students, // Список студентів на поточній сторінці
    ...paginationData, // Розширюємо результат додатковими даними пагінації
  };
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

//* POST

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

//* DELETE

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({
    _id: studentId,
  });

  return student;
};

//* PUT & PATCH

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId }, //обєкт, який містить умови пошуку документа у колекції за його властивостями
    payload, //обєкт, який містить дані для оновлення
    {
      includeResultMetadata: true,
      ...options,
    }, // налаштування оновлення
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value, // оновлений документ (або null, якщо нічого не знайшли)
    isNew: Boolean(rawResult?.lastErrorObject?.upserted), // true, якщо документ був створений через upsert
  };
};

// Завдяки includeResultMetadata: true, змінна rawResult отримує не тільки оновлений документ, але й додаткові мета-дані.
//Це дозволяє нам використовувати rawResult?.lastErrorObject?.upserted для перевірки, чи був запис створений (upsert).
// Як визначається isNew? Якщо rawResult.lastErrorObject.upserted містить значення (тобто документ був створений), то isNew буде true. Якщо rawResult.lastErrorObject.upserted не існує (тобто документ не створювався, а тільки оновлювався), то isNew буде false.

// У параметрі payload будемо очікувати обєкт даних для оновлення студента з наступними властивостями:
// {
//   "name": "John Doe",
//   "email": "jojndoe@mail.com",
//   "age": 18,
//   "gender": "male",
//   "avgMark": 10.3,
//   "onDuty": true
// }
