// src/utils/calculatePaginationData.js

// Функція для обчислення даних пагінації
export const calculatePaginationData = (count, perPage, page) => {
  // Обчислюємо загальну кількість сторінок
  const totalPages = Math.ceil(count / perPage);

  // Перевіряємо, чи є наступна сторінка (якщо поточна сторінка менша за totalPages)
  const hasNextPage = Boolean(totalPages - page);

  // Перевіряємо, чи є попередня сторінка (якщо поточна сторінка не перша)
  const hasPreviousPage = page !== 1;

  // Повертаємо об'єкт з даними пагінації
  return {
    page, // Поточна сторінка
    perPage, // Кількість елементів на сторінці
    totalItems: count, // Загальна кількість елементів
    totalPages, // Загальна кількість сторінок
    hasNextPage, // Чи є наступна сторінка
    hasPreviousPage, // Чи є попередня сторінка
  };
};
