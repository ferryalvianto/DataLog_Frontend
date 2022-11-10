import axios from 'axios';
import React from 'react';

const API_URL = 'http://localhost:8000/api'


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
}

export default new AuthService();
