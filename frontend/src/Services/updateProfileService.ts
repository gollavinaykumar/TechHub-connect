export const updateProfile = async (
  id: any,
  name: any,
  email: any,
  number: any,
  role: any
) => {
  try {
    const updatedProfile = await fetch("http://localhost:8080/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, email, number, role }),
    });
    return updatedProfile.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateProfilePic = async (id: any, pic: any) => {
  try {
    const updatedProfilePic = await fetch("http://localhost:8080/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, pic }),
    });
    return updatedProfilePic.json();
  } catch (err) {
    console.log(err);
  }
};
