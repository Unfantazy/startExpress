// import {VideoDBType} from './video-db-type'

export type DBType = {
  // типизация базы данных (что мы будем в ней хранить)
  blogs: any[]; // VideoDBType[]
  posts: any[];
};

export const db: DBType = {
  // создаём базу данных (пока это просто переменная)
  blogs: [],
  posts: [],
};

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    // если в функцию ничего не передано - то очищаем базу данных
    db.blogs = [];
    db.posts = [];
    return;
  }

  // если что-то передано - то заменяем старые значения новыми
  db.blogs = dataset.blogs || db.blogs;
  db.posts = dataset.posts || db.posts;
};
