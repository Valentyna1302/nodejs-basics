const parseGender = (gender) => {
  const isString = typeof gender === 'string';
  // Якщо це не рядок — повертаємо undefined (нічого)
  if (!isString) return;
  // Допоміжна функція перевіряє, чи gender — допустиме значен
  const isGender = (gender) => ['male', 'female', 'other'].includes(gender);

  if (isGender(gender)) return gender;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  // Парсимо рядок у число
  const parsedNumber = parseInt(number);
  // Якщо не вдалося спарсити (результат — NaN), повертаємо undefined
  // Number.isNaN(value)	Перевіряє, чи значення — саме NaN
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parsedNumber;
};

export const parseFilterParams = (query) => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;

  const parsedGender = parseGender(gender);
  const parsedMaxAge = parseNumber(maxAge);
  const parsedMinAge = parseNumber(minAge);
  const parsedMaxAvgMark = parseNumber(maxAvgMark);
  const parsedMinAvgMark = parseNumber(minAvgMark);

  return {
    gender: parsedGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
  };
};
