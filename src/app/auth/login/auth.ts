import axios from 'axios';
import { useContext } from "react";
// import { MyContext } from '@/app/page';

export async function authenticate(
    username: string,
    password: string,
    url: string
): Promise<boolean> {

    // jpcaglianone - retirar o teste após a implementação do serviço
    //#region teste

    // const { user, setUser } = useContext(MyContext);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
        // setUser({
        //     name: data.user,
        //     token: data.token,
        //     logged: true
        // })

        console.log("req feita")
        localStorage.setItem('token', data.token);
        // setUser({
        //     name: data.user,
        //     token: data.token,
        //     logged: true
        // });
        return true;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }

    //#endregion

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return true;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}
