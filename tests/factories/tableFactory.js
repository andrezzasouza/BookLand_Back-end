import connection from '../../src/database/database.js';

const deleteTable = async (table) => {
  await connection.query(`
      DELETE FROM "${table}";
    `);
};

export default deleteTable;
