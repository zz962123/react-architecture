import axios from "axios";

const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      //"Access-Control-Allow-Origin": "*",
    },
};

let _baseURL='';
(async function () {
    const res = await axios.get('https://geolocation-db.com/json/');
    if(res.data.IPv4.substring(10,12) === '84') {
        axios.defaults.baseURL = "http://192.168.220.30:28081";//"http://192.168.200.114:8080";
        _baseURL = "http://192.168.220.30:28081";
    } else {
        axios.defaults.baseURL = "http://59.25.178.93:28081";
        _baseURL =  "http://59.25.178.93:28081";
    }
    
}());

class Connect {
    constructor() {
        axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('jwtsessiontoken'); // 세션 정보 넘기기 
        this.client = axios;
        this._baseURL=_baseURL;
    }
}

export default Connect;
