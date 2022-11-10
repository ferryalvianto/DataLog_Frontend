import { useEffect } from "react";
import authService from "./auth.service";
import { useNavigate, Link, useMatch, useParams } from 'react-router-dom'
import React from 'react';

export default function AuthHeader() {
    const islogin = useMatch('/login')
    const isbusinessname = useMatch('/:businessname')
    const isdashboard = useMatch('/:businessname/dashboard')
    const isanalysis = useMatch('/:businessname/analysis')
    const isprofile = useMatch('/:businessname/profile')
    const isfeedback = useMatch('/:businessname/feedback')
    const isprediction = useMatch('/:businessname/prediction')
    const istrainmodel = useMatch('/:businessname/train-model')
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        if ('user' in localStorage) {
            const user = JSON.parse(localStorage.getItem('user'))
            const url = (user.db.toLowerCase())

            if (islogin || isbusinessname) {
                authService.getCurrentUser().then((response) => {
                    if (response.status == 200) {
                        navigate(`/${url}/dashboard`)
                        window.location.reload()
                    }
                })
            }

            if (isanalysis || isprofile || isdashboard || istrainmodel || isprediction || isfeedback) {
                authService.getCurrentUser().then((response) => {
                    if (response.status == 200) {
                        console.log(response.status)
                    }
                }).catch((error) => {
                    if (error.message.includes('401')) {
                        alert('Your session has expired')
                        if (confirm('Do you want to log in again?')) {
                            localStorage.clear()
                            sessionStorage.clear()
                            navigate('/login')

                        } else {
                            localStorage.clear()
                            sessionStorage.clear()
                            navigate('/')
                        }
                    }
                })
            }
        }

    }, [])

}
