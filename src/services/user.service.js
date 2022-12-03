import axios from 'axios';
import React from 'react';

const API_URL = 'http://127.0.0.1:8000//datalog/api'
// const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api'

class UserService {

    async cleanCSV(db, id_inventory, id_payment, year, month, day) {
        return await axios.get(API_URL + '/clean_csv', {
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

    async getUploadDateLog(db, yyyy, mm, dd) {
        return await axios.get(API_URL + '/upload_date_log', {
            params: {
                'db': db,
                'yyyy':yyyy,
                'mm':mm,
                'dd':dd
            }
        })
    }

    async getUploadLog(db, yyyy, mm, dd) {
        return await axios.get(API_URL + '/upload_log', {
            params: {
                'db': db,
                'yyyy':yyyy,
                'mm':mm,
                'dd':dd
            }
        })
    }


    async trainModels(db, yyyy, mm, dd) {
        return await axios.post(API_URL + `/train_models?db=${db}&yyyy=${yyyy}&mm=${mm}&dd=${dd}`)
    }

    async getTrainingLog(db){
        return axios.get(API_URL + `/get_training?db=${db}`)
    }

    async updateTrainingLog(db){
        return axios.post(API_URL + `/update_training_log?db=${db}`)
    }

}

export default new UserService();
