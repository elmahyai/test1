import { db } from '../config/db';

export const addItem =  (question) => {
    db.ref('/items').push({
        item: question
    });
}