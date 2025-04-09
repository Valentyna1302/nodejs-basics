import { model, Schema } from 'mongoose';
import { typeList } from '../../constants/students.js';
import { handleSaveError, setUpdateSetting } from './hooks.js';

// 1. Далі, за допомогою класу Schema з бібліотеки mongoose,  створимо схему для опису структури документа студента.

//Першим аргументом у конструктор схеми ми передаємо об'єкт, де кожний ключ відповідає полю у документі, а їх значеннями є об'єкти, що описують ці поля
// Другим аргументом передаємо додаткові параметри схеми
const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // чи є поле обов'язковим
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: typeList, // це перелік допустимих значень для поля
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false, // вказує значення за замовчуванням, якщо поле не вказано при створенні документа
    },
  },
  {
    timestamps: true, // встановлює значення true, щоб автоматично створювати поля createdAt та updatedAt, які вказують на час створення та оновлення документа.
    versionKey: false, // versionKey — вказує, чи має бути створене поле __v для відстеження версій документу. У нашому випадку ми встановлюємо false, щоб це поле не створювалося.
  },
);

studentsSchema.post('save', handleSaveError); // тут пост не має ніякого відношення до http запитів, тут він означає "після"

studentsSchema.pre('findOneAndUpdate', setUpdateSetting);

studentsSchema.post('findOneAndUpdate', handleSaveError);

// 2. Останнім кроком створюємо модель студента StudentsCollection за допомогою схеми.

export const StudentsCollection = model('students', studentsSchema);

//* У результаті цього коду ми отримаємо модель колекції даних студентів у MongoDB, яка буде використовуватися для взаємодії з цією колекцією через Mongoose.
//* Колекція даних студентів буде мати назву "students" і кожен її документ буде відповідати схемі, описаній в studentsSchema.
//* Модель StudentsCollection надасть нам набір методів для роботи з цією колекцією, таких як збереження нового студента, отримання списку студентів, оновлення даних про студента тощо.
