import axios from "axios";
// import { LOCAL_STORAGE_KEY } from 'configs/storage';

const useApiClient = () => {

    // const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (token) {
    //     axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`;
    // }

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
        headers: { 'Access-Control-Allow-Origin': '*' },
    });

    return {
        client: instance
    }
}

export default useApiClient