export async function getIntroQuestions() {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing in local storage');
        }

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(userName + ':' + password));
        const response = await fetch(`http://localhost:8080/api/questions/intro`, {
            headers: headers,
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

export async function getAllQuestions() {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const url = `http://localhost:8080/api/questions/allQuestions`;
        const response = await fetch(url, {
            headers: headers,
        });
        console.log(response);
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



export async function getQuestionsByCategory(categoryId) {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const url = `http://localhost:8080/api/questions/category/${categoryId}`;
        const response = await fetch(url, {
            headers: headers,
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

export async function getRandomQuestionByCategory(categoryId) {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        const response = await fetch(`http://localhost:8080/api/questions/category/${categoryId}/random`, {
            headers: headers,
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

export async function deleteQuestion(questionId) {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const url = `http://localhost:8080/api/questions/delete/${questionId}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa(userName + ':' + password),
            },
        })

        if (response.ok) {
            const result = await response.text();
            return result; 
          } else {
            return 'Question deletion failed:' + response.status;
          }
        } catch (error) {
          return 'An error occurred:' + error;
        }
}

export async function addQuestion(question) {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing in local storage');
        }

        const url = `http://localhost:8080/api/questions/add`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa(userName + ':' + password),
            },
            body: JSON.stringify(question),
        });

        if (response.ok) {
            const result = await response.text();
            return result;
        } else {
            return 'Question addition failed: ' + response.status;
        }
    } catch (error) {
        return 'An error occurred: ' + error;
    }
}


