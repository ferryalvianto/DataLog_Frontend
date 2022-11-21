import axios from 'axios';
import React from 'react';

const API_URL = 'http://127.0.0.1:8000/api'

class UserService {

    async cleanCSV(db, id_inventory, id_payment, year, month, day) {
        return axios.get(API_URL + '/clean_csv', {
            params: {
                'db': db,
                'id_inventory': id_inventory,
                'id_payment': id_payment,
                'year': year,
                'month': month,
                'day': day
            }
        })
    }

}

export default new UserService();
