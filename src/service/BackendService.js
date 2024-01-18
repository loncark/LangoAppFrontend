
import axios from 'axios';


export async function getUserByName (username, accessToken) {
    const apiUrl = (username? "http://localhost:7000/users?name=" + username : "http://localhost:7000/users");

    return sendRequestToBackend(apiUrl, "GET", accessToken)
}

export async function updateUserData(updatedUser, accessToken) {
    const apiUrl = "http://localhost:7000/users";

    return sendRequestToBackend(apiUrl, "PUT", accessToken, updatedUser);
}

export async function getAppointmentsByUserId(id, accessToken) {
    const apiUrl = "http://localhost:7000/appointments?userId=" + id;

    return sendRequestToBackend(apiUrl, "GET", accessToken);
}

export async function getUsersInAppointments(idList, accessToken) {
    const apiUrl = "http://localhost:7000/users/idList";

    return sendRequestToBackend(apiUrl, "POST", accessToken, idList);
}

export async function createAppointment(apt, accessToken) {
    const apiUrl = "http://localhost:7000/appointments";

    return sendRequestToBackend(apiUrl, "POST", accessToken, apt);
}

export async function updateAppointment(apt, accessToken) {
    const apiUrl = "http://localhost:7000/appointments";

    return sendRequestToBackend(apiUrl, "PUT", accessToken, apt);
}

export async function deleteAppointment(aptId, accessToken) {
    const apiUrl = "http://localhost:7000/appointments/" + aptId;

    return sendRequestToBackend(apiUrl, "DELETE", accessToken);
}

export async function getUsersSpeakingLanguage(language, accessToken) {
    const apiUrl = (language? "http://localhost:7000/users?language=" + language : "http://localhost:7000/users");
    
    return sendRequestToBackend(apiUrl, "GET", accessToken);
}

export async function getAllUsers(accessToken) {
    const apiUrl = "http://localhost:7000/users";

    return sendRequestToBackend(apiUrl, "GET", accessToken);
}

export async function sendRequestToBackendUsingFetch(apiUrl, method, accessToken, requestBody) {
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
    
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            console.log(`Got some responseData from ${method} method`);

            return responseData;
        }
        else return '';
        
    
      } catch (error) {
        console.error("Caught error in sendRequestToBackend(): ", error);
        return false;
      }
}


export async function sendRequestToBackend(apiUrl, method, accessToken, requestBody) {
  try {
    const response = await axios({
      method: method,
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      data: requestBody,
    });

    console.log(`Got some responseData from ${method} method`);

    return response.data;
  } catch (error) {
    console.error("Caught error in sendRequestToBackend(): ", error);
    return false;
  }
}
