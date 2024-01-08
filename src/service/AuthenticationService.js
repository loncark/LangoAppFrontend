
export const authenticate = async (username, password, setLoginIsSuccessful) => {
  try {
    const isAuthenticated = await usernamePasswordChecksOut(username, password);

    if (isAuthenticated) {
      setLoginIsSuccessful(true);
    }
  } catch (error) {
    console.error("Caught error in authenticate():", error);
  }
};

async function usernamePasswordChecksOut(uname, pword) {
  const apiUrl = "http://localhost:7000/auth/login";
  const requestBody = {
    username: uname,
    password: pword,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error(`Login Error: ${response.status} - ${response.statusText}`);
      return false;
    }

    const responseData = await response.json();
    const accessToken = responseData.accessToken;
    console.log("accessToken: " + accessToken);

    return true;
  } catch (error) {
    console.error("Caught error in usernamePasswordChecksOut():", error);
    return false;
  }
}

export const register = (username, password, setLoginIsSuccessful) => {
  if (registerIsSuccessful(username, password)) {
    setLoginIsSuccessful(true);
  }
};

async function registerIsSuccessful(uname, pword) {
  const apiUrl = "http://localhost:7000/users";
  const requestBody = {
    name: uname,
    password: pword,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error(
        `Register Error: ${response.status} - ${response.statusText}`
      );
      return false;
    }

    console.log("Register success");
    return true;
  } catch (error) {
    console.error("Caught error in registerIsSuccessful():", error);
    return false;
  }
}
