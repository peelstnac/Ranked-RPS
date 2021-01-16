import query from './query';

const test = async () => {
    let rows = await query('SELECT NOW()', []);
    console.log(rows);
};

export default test;