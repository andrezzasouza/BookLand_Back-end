import connection from '../../src/database/database.js';

const del = 'DELETE FROM';

const clearDatabase = async () => {
  await connection.query(`
    ${del} "Networks";
    ${del} "Category_groups";
    ${del} "States";
    ${del} "Cities";
    ${del} "Cart_books";
    ${del} "Carts";
    ${del} "Sessions";
    ${del} "Categories";
    ${del} "Payments";
    ${del} "Closed_deals";
    ${del} "Books_categories";
    ${del} "Addresses";
    ${del} "Books";
    ${del} "Users";
  `);
};

export default clearDatabase;
