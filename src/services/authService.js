import { LOGIN_URL, USERS_URL } from './constant';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

class AuthService {
    login(email, password) {
        return fetch(LOGIN_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ users: { email, password } }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                // if (response.data.accessToken) {
                //     localStorage.setItem("user", JSON.stringify(response.data));
                // }

                // return response.data;
            });
    }

    async signup(payload) {
        let response = await fetch(USERS_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ user: payload }),
        });
        let result = await response.json();

        return result;
    }

    setLoggedInUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('user');
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
