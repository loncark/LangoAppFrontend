
export function getUserByName (username, accessToken) {
    const apiUrl = "http://localhost:7000/users?name=" + username;

    return sendRequestToBackend(apiUrl, "GET", accessToken)
}

export async function sendRequestToBackend(apiUrl, method, accessToken) {
    try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
          }
        });
    
        if (!response.ok) {
          console.error(`Login Error: ${response.status} - ${response.statusText}`);
          return false;
        }
    
        const responseData = await response.json();
        console.log(responseData);
    
        return responseData;
    
      } catch (error) {
        console.error("Caught error in getUserByName():", error);
        return false;
      }
}