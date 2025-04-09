// src/utils/parsePaginationParams.js

const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string'; // перевіряє, чи є передане значення рядком
  if (!isString) return defaultValue; //  Якщо це не так, вона одразу повертає значення за замовчуванням

  const parsedNumber = parseInt(number); // Якщо ж значення є рядком, вона спробує перетворити його на число
  if (Number.isNaN(parsedNumber)) {
    return defaultValue; // Якщо результат перетворення є NaN (не число), повертається значення за замовчуванням.
  }

  return parsedNumber; // якщо ок — повертаємо число
};

// number, що є значенням для перетворення, та
// defaultValue, яке використовується як запасне, якщо перетворення неможливе.
// parseInt() — це вбудована JavaScript функція, яка перетворює рядок (або інші типи даних) у ціле число (тип number).

// Функція для парсингу параметрів пагінації
export const parsePaginationParams = (query) => {
  // Деструктуризація: отримуємо параметри "page" та "perPage" з об'єкта "query"
  const { page, perPage } = query;

  // Перетворення значення параметра "page" на число, за замовчуванням 1
  const parsedPage = parseNumber(page, 1);
  // Перетворення значення параметра "perPage" на число, за замовчуванням 10
  const parsedPerPage = parseNumber(perPage, 10);

  // Повертаємо об'єкт з парсованими значеннями "page" та "perPage"
  return {
    page: parsedPage, // Сторінка
    perPage: parsedPerPage, // Кількість елементів на сторінці
  };
};
