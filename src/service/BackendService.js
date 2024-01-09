
export function getUserByName (username, accessToken) {
    const apiUrl = "http://localhost:7000/users?name=" + username;

    return sendRequestToBackend(apiUrl, "GET", accessToken)
}

export function updateUserData(updatedUser, accessToken) {
    const apiUrl = "http://localhost:7000/users";

    return sendRequestToBackend(apiUrl, "PUT", accessToken, updatedUser);
}

export async function sendRequestToBackend(apiUrl, method, accessToken, requestBody) {
    try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
          },
          body: JSON.stringify(requestBody),
        });
    
        if (!response.ok) {
          console.error(`${method} Error: ${response.status} - ${response.statusText}`);
          return false;
        }
    
        const responseData = await response.json();
        console.log(responseData);
    
        return responseData;
    
      } catch (error) {
        console.error("Caught error in sendRequestToBackend(): ", error);
        return false;
      }
}