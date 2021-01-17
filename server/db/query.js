'use strict';
import pool from './connection';

/**
 * Query with pg pool
 * @param {String} text SQL query text with $x in place of values
 * @param {Array<String>} values an array of values
 * @returns {Array}
 */
const query = async (text, values) => {
    try {
        let { rows } = await pool.query(text, values);
        return [null, rows];
    } catch (err) {
        return [err, null];
    }
};

export default query;