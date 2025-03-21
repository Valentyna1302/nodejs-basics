// src/index.js

const message = 'Hello world';

console.log(message);

//* Основні методи, які можуть бути нам корисними при роботі зі шляхами

//* path.join(...paths[])
// Цей метод приймає аргументами рядки, які будуть перетворені у правильно форматований шлях базуючись на операційній системі, на якій запущена програма.

import path from 'node:path';

// приклад для побудови шляху з його частин
const somePath = path.join('some_folder', 'some_file.txt');
// somePath буде 'some_folder/some_file.txt' на MacOs

// somePath буде 'some_folder\\some_file.txt' на Windows

//* приклад для побудови шляху із його частин
const pathToWorkDir = path.join(process.cwd()); // отримуємо шлях до кореневої директорії викликом метода process.cwd()
const pathToFile = path.join(pathToWorkDir, 'some_folder', 'some_file.txt'); // розширюємо шлях додатковими елементами
// pathToFile на MacOs буде __шлях до папки, де запущений процес__/some_folder/some_file.txt'
// pathToFile на Windows буде __шлях до папки, де запущений процес__\\some_folder\\some_file.txt'

//* path.parse(path);
// Дозволяє отримати інформацію по шляху, який був переданий аргументом

// на MacOs
path.parse('/home/user/dir/file.txt');
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// на Windows
path.parse('C:\\\\path\\\\dir\\\\file.txt');
// { root: 'C:\\\\',
//   dir: 'C:\\\\path\\\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

//****** Модуль fs *********/
// Як ви вже знаєте, важливою відмінністю Node.js від браузера є можливість роботи із файлами. Для цього у ній наявний спеціальний модуль fs, який дає нам можливості працювати із файлами та папками.

//* Синхронна функція. Зазвичай, такі методи містять допис sync в назві метода
// import fs from 'node:fs';

const fileContent = fs.readFileSync('path_to_file');

//* Асинхронна з колбеком. найбільша швидкодія. Мінусом же є те, що називається callback hell. Тобто, якщо у вас буде багато вкладених колбеків, то різко впаде читабельність коду:

fs.readFile('path_to_file', (err, fileContent) => {
  /* ваш код */
});

//* Асинхронна з промісами. Цей варіант використовується найбільш часто в написанні продуктового коду, оскільки він дає читабельність на рівні синхронного коду, але не є блокуючим.
// import fs from 'node:fs/promises'; // імпорт тепер також має promises у шляху.

// const fileContent = await fs.readFile('path_to_file');

//*************** Buffer **************/

import fs from 'node:fs/promises';

const buffer = await fs.readFile('hello.txt');
// припустимо, що в файлі hello.txt був текст Hello World!

console.log(buffer);
///<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>

//* кодування
// Для кодування тексту найпоширенішим форматом є UTF-8
//  щоб привести буфер до рядка, ми можемо викликати у нього метод toString(), вказавши у дужках кодування:

const buffer = await fs.readFile('hello.txt');
// припустимо, що в файлі hello.txt був текст Hello World!

console.log(buffer.toString('utf-8'));
/// Hello World!

//* Основні методи модуля fs

//* [fs.readFile(path [, options])](<https://nodejs.org/api/fs.html#fspromisesreadfilepath-options>) - читання файлу
// path (string): шлях до файлу, який потрібно прочитати. options (об'єкт) (опціонально): параметри, що визначають режим читання. Може бути вказано кодування файлу або інші параметри.

// Результати:
// Promise: повертається об'єкт Promise, який буде вирішено або відхилено після завершення операції читання файлу.
// Вирішено з вмістом файлу у випадку успішного читання.
// Відхилено з об'єктом помилки у випадку невдачі операції читання.
(async () => {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log('Вміст файлу:', data);
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }
})();

//* [fs.writeFile(file, data [, options])](<https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options>) - запис файлу
// Аргументи: file (string): назва файлу або шлях до файлу, в який потрібно записати дані. data (string або Buffer): дані, які потрібно записати у файл. Може бути представлено рядком або об'єктом Buffer. options (string або об'єкт) (опціонально): параметри, що визначають режим запису. Наприклад, кодування для текстових файлів або прапорці режиму запису.

// Записуємо дані у файл 'output.txt'
(async () => {
  const data = 'Це дані, які ми записуємо у файл.';
  try {
    await fs.writeFile('output.txt', data, 'utf8');
    console.log('Дані успішно записані у файл.');
  } catch (err) {
    console.error('Помилка запису у файл:', err);
  }
})();

//* [fs.appendFile(path, data [, options])](<https://nodejs.org/api/fs.html#fspromisesappendfilepath-data-options>)додавання у файл
// Аргументи: path (string): шлях до файлу, в який потрібно додати дані. data (string або Buffer): дані, які потрібно додати до файлу. Може бути представлено рядком або об'єктом Buffer. options (string або об'єкт) (опціонально): параметри, що визначають режим додавання. Наприклад, кодування для текстових файлів або прапорці режиму додавання.

// Додаємо дані до файлу 'output.txt'
(async () => {
  const data = 'Це дані, які ми додаємо до файлу.';
  try {
    await fs.appendFile('output.txt', data, 'utf8');
    console.log('Дані успішно додані до файлу.');
  } catch (err) {
    console.error('Помилка додавання даних до файлу:', err);
  }
})();

//* [fs.rename(oldPath, newPath)](<https://nodejs.org/api/fs.html#fspromisesrenameoldpath-newpath>) - перейменування файлу.

// Перейменовуємо або переміщуємо файл чи каталог зі шляху 'oldfile.txt' до 'newfile.txt'
(async () => {
  try {
    await fs.rename('oldfile.txt', 'newfile.txt');
    console.log('Файл або каталог успішно перейменовано або переміщено.');
  } catch (err) {
    console.error('Помилка перейменування або переміщення:', err);
  }
})();

//* [fs.unlink(path)](<https://nodejs.org/api/fs.html#fspromisesunlinkpath>) - видалення файлу.

// Видаляємо файл за шляхом 'file.txt'
(async () => {
  try {
    await fs.unlink('file.txt');
    console.log('Файл успішно видалено.');
  } catch (err) {
    console.error('Помилка видалення файлу:', err);
  }
})();

//* [fs.readdir(path)](<https://nodejs.org/api/fs.html#fspromisesreaddirpath-options>) - виведення вмісту папки
// Цей метод використовується для асинхронного отримання списку файлів та каталогів у заданому каталозі.
// path (string): шлях до каталогу, з якого потрібно отримати список файлів і каталогів.

// Результати:
// Promise: Повертається об'єкт Promise, який буде вирішено або відхилено після завершення операції отримання списку файлів і каталогів.
// Вирішено з масивом рядків, який містить імена файлів і каталогів у заданому каталозі.
// Відхилено з об'єктом помилки у випадку невдачі операції.

// Отримуємо список файлів і каталогів у поточному каталозі
(async () => {
  try {
    const files = await fs.readdir('.');
    console.log('Список файлів і каталогів:', files);
  } catch (err) {
    console.error('Помилка отримання списку файлів і каталогів:', err);
  }
})();

//* [fs.access(path [, mode])](<https://nodejs.org/api/fs.html#fspromisesaccesspath-mode>) - перевірка доступу до ресурсу
// Можна також перевіряти наявність папок за допомогою цього методу (буде використовуватися далі в курсі)
// Аргументи: path (string): шлях до файлу або каталогу, доступність якого потрібно перевірити. mode (integer або константа) (опціонально): режим доступу, який потрібно перевірити. Це може бути комбінація констант fs.constants.F_OK, fs.constants.R_OK, fs.constants.W_OK, fs.constants.X_OK, які вказують на існування, читання, запис або виконання файлу.

// Результати:
// Promise: Повертається об'єкт Promise, який буде вирішено або відхилено після завершення операції перевірки доступності.
// Вирішено без аргументів, якщо операція перевірки доступності пройшла успішно. Це означає, що файл або каталог існує та відповідає вказаним режимам доступу.
// Відхилено з об'єктом помилки у випадку невдачі операції. Помилка може вказувати на те, що файл або каталог не існує, або на відсутність необхідних прав доступу.

// Перевіряємо доступність файлу або каталогу за вказаним шляхом
(async () => {
  const path = 'file.txt';
  try {
    await fs.access(path);
    console.log(`Файл або каталог '${path}' доступний.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`Файл або каталог '${path}' не існує.`);
    } else {
      console.error(
        `Помилка перевірки доступності файлу або каталогу '${path}':`,
        err,
      );
    }
  }
})();
