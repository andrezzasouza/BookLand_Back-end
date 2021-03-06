import connection from '../../src/database/database.js';

const del = 'DELETE FROM';

const clearDatabase = async () => {
  await connection.query(`
    ${del} "Category_groups";
    ${del} "Cart_books";
    ${del} "Carts";
    ${del} "Sessions";
    ${del} "Categories";
    ${del} "Payments";
    ${del} "Books_categories";
    ${del} "Addresses";
    ${del} "Books";
    ${del} "Users";
    ${del} "Authors";
  `);
};

export default clearDatabase;
