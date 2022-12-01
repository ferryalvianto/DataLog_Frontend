import axios from 'axios';
import React from 'react';

const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api'


class AuthService {
    async getDatabases() {
        return axios.get(API_URL + '/get-dbs')
    }

    async getCurrentUser() {
        const token = localStorage.getItem('token');
        const tokenObj = JSON.parse(token)

        return axios.get(API_URL + `/users/me/`, {
            headers: {
                'Authorization': `Bearer ${tokenObj}`
            }
        })
    }

    async updateNewUser(username, db, user) {
        const token = localStorage.getItem('token')
        const tokenObj = JSON.parse(token)

        return axios.put(API_URL + `/users/${username}`, user, {
            params: { 
                'db': db 
            }, 
            headers: {
                'Authorization': `Bearer ${tokenObj}`
            }
        })
    }

    async getTrainingLog(db){
        return axios.get(API_URL + `/get_training?db=${db}`)
    }

    async updateTrainingLog(db){
        return axios.post(API_URL + `/update_training_log?db=${db}`)
    }}

export default new AuthService();
