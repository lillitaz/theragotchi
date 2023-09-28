
/* export async function loginUser(formData) {
    try {
        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            const data = await response.json();
            return { success: true, message: data };
        } else if(response.status === 404) {
            console.log("404");
            return { success: false, message: "No User Found!" };
        } else if (response.status == 401) {
            console.log("401");
            return {success: false, message: "Password incorrect!"}
        }
    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
} */

export async function loginUser(formData) {
    const headers = new Headers();
    const auth = btoa(formData.username + ':' + formData.password);
    headers.set('Authorization', 'Basic ' + auth);
    return fetch("http://localhost:8080/api/user/login", { method: 'GET', headers: headers })
      .then(response => response.text())
      .then(jwt => {
        localStorage.setItem('jwt', jwt);
      })
      .catch(error => console.log('ERROR: ' + error));

}


export async function registerUser(newUser) {
    try {
        const response = await fetch("http://localhost:8080/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: data
        };
    } catch (error) {
        return { success: false, message: "An error occurred." };
    }
}

export async function updateUser(updatedUser) {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        const userId = localStorage.getItem('userId');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const url = `http://localhost:8080/api/user/${userId}`;

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
            body: JSON.stringify(updatedUser),
        })

        if (response.status == 200) {
            return "User sucessfully updated!"
        } else {
            throw response;
        }
        
    } catch (error) {
        if (error.status == 401) {
            return "User not Found!"
        }
        if (error.status == 400) {
            return "Password incorrect!"
        }       
        
}
}

export async function updateUserByAdmin(userData, updatedUser) {
    try {
        const username = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const url = `http://localhost:8080/api/user/${userData.userId}`;

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
            body: JSON.stringify(updatedUser),
        })

        if (response.status == 200) {
            return "User sucessfully updated!"
        } else {
            throw response;
        }
        
    } catch (error) {
        if (error.status == 401) {
            return "User not Found!"
        }
        if (error.status == 400) {
            return "Password incorrect!"
        }       
}
}


export async function getCurrentUser() {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const url = `http://localhost:8080/api/user/${userName}`;

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(userName + ':' + password));

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

export async function fetchUsers() {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const url = `http://localhost:8080/api/user/allUsers`;

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(userName + ':' + password));

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

export async function deleteUser(userId) {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing in local storage');
        }
        const url = `http://localhost:8080/api/user/delete/${userId}`;

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
            return 'User deletion failed:' + response.status;
          }
        } catch (error) {
          return 'An error occurred:' + error;
        }
}

export async function addMood(moodValue, userId) {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        let moodType;

        if (!userName || !password) {
            throw new Error('Username or password missing.');
        }

        if (moodValue === 1) {
            moodType = 'SAD';
        } else if (moodValue <= 4 && moodValue >= 2) {
            moodType = 'CONTENT';
        } else {
            moodType = 'HAPPY';
        }

        const url = `http://localhost:8080/api/mood/add`;

        const moodPackage = {userId, moodType}
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(userName + ':' + password),
            },
            body: JSON.stringify(moodPackage),
        })

        if (response.ok) {
            const result = await response.text();
            return result; 
          } else {
            return 'Mood could not be saved:' + response.status;
          }
        } catch (error) {
          return 'An error occurred:' + error;
    }
}

export async function getUserMoods(userId) {
    try {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');

        if (!userName || !password) {
            throw new Error('Username or password missing.');
        }

        const url = `http://localhost:8080/api/mood/get/${userId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(userName + ':' + password),
            },
        });

        if (response.ok) {
            const moodList = await response.json();
            return moodList;
        } else {
            return 'Failed to fetch user moods:' + response.status;
        }
    } catch (error) {
        return 'An error occurred:' + error;
    }
}