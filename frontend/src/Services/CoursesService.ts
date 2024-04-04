export const getCourses = async () => {
  try {
    const response = await fetch("http://localhost:8080/Home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    return response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createCourse = async (course: {}) => {
  try {
    const createdCourse = await fetch("http://localhost:8080/Home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (email: String) => {
  try {
    const createdCourse = await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  } catch (err) {
    console.log(err);
  }
};
