export function getTheragotchiConditions(theragotchiId) {
    const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/condition`;
    return fetchDataWithAuthorization(url);
}

export function getTheragotchiById(theragotchiId) {
    const url = `http://localhost:8080/api/theragotchi/${theragotchiId}`;
    return fetchDataWithAuthorization(url);
}

export function getTheragotchiByUserName(userName) {
    const url = `http://localhost:8080/api/theragotchi/user/${userName}`;
    return fetchDataWithAuthorization(url);
}

export function getTheragotchiImagePath(theragotchiId) {
    const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/imagePath`;
    return fetchDataWithAuthorization(url);
}

export async function createTheragotchi(newTheragotchi) {
    try {
        const url = 'http://localhost:8080/api/theragotchi/create';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTheragotchi),
        });
        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: data,
        };

    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
}


export async function feedTheragotchi(theragotchiId) {
    try {
        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/feed`;
        console.log(url)
        await fetchDataWithAuthorization(url, {
            method: 'PATCH',
        });

    } catch (error) {
        return { success: false, message: "Theragotchi not fed." };
    }
}

export async function playWithTheragotchi(theragotchiId) {
    try {
        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/play`;
        console.log(url)

        await fetchDataWithAuthorization(url, {
            method: 'PATCH',
        });
    } catch (error) {
        return { success: false, message: "Theragotchi not updated." };
    }
}

export async function cuddleTheragotchi(theragotchiId) {
    try {
        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/cuddle`;
        console.log(url)

        await fetchDataWithAuthorization(url, {
            method: 'PATCH',
        });

    } catch (error) {
        return { success: false, message: "Theragotchi not cuddled." };
    }
}

export async function cleanTheragotchi(theragotchiId) {
    try {
        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/clean`;
        console.log(url)

        await fetchDataWithAuthorization(url, {
            method: 'PATCH',
        });

    } catch (error) {
        return { success: false, message: "Theragotchi not cleaned." };
    }
}

export async function deleteTheragotchi(theragotchiId) {
    try {
        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/delete`;
        const response = await fetchDataWithAuthorization(url, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        return { success: false, message: "Theragotchi not deleted." };
    }
}


export async function decreaseTheragotchiValues(theragotchiId) {
    try {
        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/decreaseValues`;

        const response = await fetchDataWithAuthorization(url, {
            method: 'PATCH',
        });

        return response;
    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
}

export async function updateTheragotchi(theragotchiId, patchedTheragotchi) {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }

        const url = `http://localhost:8080/api/theragotchi/${theragotchiId}/update`;

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
            body: JSON.stringify(patchedTheragotchi),
        });

        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            theragotchi: data,
        };
    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
}

export async function fetchTheragotchis() {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }

        const url = `http://localhost:8080/api/theragotchi/all`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
        });

        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            theragotchi: data,
        };
    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
}


async function fetchDataWithAuthorization(url, options = {}) {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        const response = await fetch(url, {
            headers: headers,
            ...options,
        });

        const data = await response.json();
        
        return {
            ok: response.ok,
            status: response.status,
            theragotchi: data,
        };
    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
}

