import axios from 'axios';
// import { MyContext } from '../page';
import React, { useContext } from 'react';

// const dataContext = useContext(MyContext);

export const PostRequisitions = (url: string, data: object) => {

    const fetchData = async () => {
        try {
            const response = await axios.post(url);
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData();
}

export const GetRequisitions = (url: string) => {

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            console.log(response);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData();
}


