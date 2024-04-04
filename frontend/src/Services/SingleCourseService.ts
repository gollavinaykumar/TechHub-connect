export const getCourse = async (id: any) => {
  try {
    const gettedCourse = await fetch(`http://localhost:8080/Home/:name/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return gettedCourse.json();
  } catch (err) {
    console.log("failed to fetch", err);
  }
};

export const createQuestion = async (
  courseId: any,
  userId: any,
  content: any
) => {
  try {
    const createdQuestion = await fetch(
      `http://localhost:8080/Home/:name/:id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, userId, content }),
      }
    );
    return createdQuestion.json();
  } catch (err) {
    console.log("failed to fetch", err);
  }
};

export const getAllQuestions = async () => {
  try {
    const gettedQuestions = await fetch(
      `http://localhost:8080/Home/:name/:id`,
      {
        method: "GET",
      }
    );
    return gettedQuestions.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteQuestion = async (id: any) => {
  try {
    const deletedQuestion = await fetch(
      `http://localhost:8080/Home/:name/:id`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
  } catch (err) {
    console.log(err);
  }
};
