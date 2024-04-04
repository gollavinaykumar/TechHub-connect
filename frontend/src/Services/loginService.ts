export const checkUser = async (user: {}) => {
  try {
    const users = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return users.json();
  } catch (err) {
    console.log(err);
  }
};
