/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import faker from 'faker';
import connection from '../../src/database/database';

const author = {
  name: faker.name.findName(),
};

const books = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.datatype.number(),
  image: faker.image.imageUrl(),
  quantity: faker.datatype.number(),
  publisher: faker.company.companyName(),
  pages: faker.datatype.number(),
};

const addBooks = async (
  name, description, price, image, quantity, publisher, pages, authorName
) => {
  await connection.query(
    `
    INSERT INTO "Authors"
    (name)
    VALUES($1);
    `,
    [authorName],
  );
  const result = await connection.query(
    `
      SELECT * FROM "Authors"
      WHERE name = $1;
    `,
    [authorName],
  );

  await connection.query(
    `
    INSERT INTO "Books"
    (name, description, price, image, quantity, author_id, publisher, pages)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [name, description, price, image, quantity, result.rows[0].id, publisher, pages],
  );
};

export { author, books, addBooks };
