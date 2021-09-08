import axios from 'axios'


//Default url
axios.defaults.baseURL = 'https://backend.facecloud.tevian.ru/'

//Add token to request headers
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('tevian-token');
    if(token) {
        config.headers.Authorization =  'Bearer' + ' ' + token;
        //config.headers['Content-Type'] = 'application/json';
    }
    return config;
});
