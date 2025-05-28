const axios = require('axios');


const axiosInstance=axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        'content-type':'application/json',
    }

})



axiosInstance.interceptors.request.use(
    (config:any)=>{ 
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error:any) => {                                        
        return Promise.reject(error);
    }   )


axiosInstance.interceptors.response.use(
    (response:any)=> response,
    (error:any) => {
        if (error.response && error.response.status === 401&& error.response.data.message === 'token expired') {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;