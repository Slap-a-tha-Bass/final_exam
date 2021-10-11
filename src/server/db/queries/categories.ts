import { Query } from '..';
import { Categories } from '../../../../types';

export const get_categories = () => Query<Categories[]>
    ('SELECT * FROM Categories');
export const get_one_category = (id: number) => Query<Categories[]>
    ('SELECT * FROM Categories WHERE id=?', [id]);
