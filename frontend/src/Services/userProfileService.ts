export const getUserProfile = async (id: any) => {
  try {
    const gettedUserProfile = await fetch("http://localhost:8080/Home/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return gettedUserProfile.json();
  } catch (err) {
    console.log(err);
  }
};
