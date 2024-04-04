export const getCourses = async (name: String) => {
  try {
    const gettedCourses = await fetch(`http://localhost:8080/Home/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });
    return gettedCourses.json();
  } catch (err) {
    console.log(err);
  }
};
