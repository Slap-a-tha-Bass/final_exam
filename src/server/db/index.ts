import * as mysql from 'mysql';
import { sqlConfig } from '../config';
import { mysqlResponse } from '../../../types';

const pool = mysql.createPool(sqlConfig);

export const Query = <T = mysqlResponse>(queryString: string, values?: any) => {
    return new Promise <T> ((resolve, reject) => {
        pool.query(queryString, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}