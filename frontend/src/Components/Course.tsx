import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../HomePage";
import { Link, useParams } from "react-router-dom";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getCourse,
} from "../Services/SingleCourseService";
import { Button } from "@mui/material";
import { useQuestionsStore } from "../zustand/useQuestionsStore";
import { useUserStore } from "../zustand/useUserStore";
import ImageIcon from "@mui/icons-material/Image";
import { useUserProfileStore } from "../zustand/useUserProfileStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { message } from "antd";

export default function Course() {
  const [SingleCourse, SetSingleCourse] = useState({});
  const setQuestions = useQuestionsStore((s: any) => s.setQuestions);
  const Questions = useQuestionsStore((s: any) => s.Questions);

  const params: any = useParams();
  useEffect(() => {
       window.scrollTo(0, 0);
    fetchData();
  }, []);
  const fetchData = async () => {
    const dataSingle = await getCourse(params.id);
    SetSingleCourse(dataSingle);
    const AllQuestions = await getAllQuestions();
    const filteredQuestions = AllQuestions.filter(
      (question: any) => question.courseId === dataSingle.id
    );
    setQuestions(filteredQuestions);
  };

  const createQuestionNow = async (id: any, text: any) => {
    const createdQuestion = await createQuestion(params.id, id, text);
    setQuestions([...Questions, createdQuestion]);
  };

  return (
    <Box>
      <Header />
      <CoursePage course={SingleCourse} createQuestionNow={createQuestionNow} />
    </Box>
  );
}

function CoursePage({ course, createQuestionNow }: any) {
  const Questions = useQuestionsStore((s: any) => s.Questions);
  const LoggedUser = useUserStore((s: any) => s.user);
  const setUserProfile = useUserProfileStore((s: any) => s.setProfile);
  const [text, SetText] = useState("");

  function createQuestion(): any {
    createQuestionNow(LoggedUser[0].id, text);
    SetText("");
  }

  async function getUser(id: any) {
    setUserProfile(id);
  }
  async function deleteQuestions(id: any) {
    const deletedQuestion = await deleteQuestion(id);
  }
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          margin: 2,
          display: "flex",
          justifyContent: "space-evenly",
          gap: 5,
        }}
      >
        <Box>
          <img
            src={course.image}
            style={{ width: "100%", height: 500 }}
            alt="no-image"
          />
          <Typography variant="h2">{course.subTitile}</Typography>
          <Typography component="p">{course.content}</Typography>
          <Divider sx={{ margin: 4 }} />
        </Box>

        <Box>
          <Typography variant="h4">Ask Questions here</Typography>

          <Box>
            <Box>
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                style={{ width: 300 }}
                value={text}
                onChange={(e) => {
                  SetText(e.target.value);
                }}
              />
              <Button
                variant="outlined"
                onClick={() => createQuestion()}
                disabled={LoggedUser[0].membership === "Basic"}
              >
                submit
              </Button>
            </Box>
            <Box
              sx={
                LoggedUser[0].membership === "Basic"
                  ? { margin: 1, width: "100%", display: "none" }
                  : { margin: 1, width: "100%" }
              }
            >
              {Questions.map((question: any) => {
                return (
                  <>
                    <List
                      sx={{
                        bgcolor: "background.paper",
                        display: "flex",
                      }}
                      key={question.id}
                    >
                      <Link
                        to="/Home/user"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <ListItem
                          sx={{ display: "flex", flexDirection: "column" }}
                          key={question.id}
                          onClick={() => {
                            getUser(question.userId);
                          }}
                        >
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={question.userId}
                              secondary={question.content}
                              sx={{ textAlign: "justify" }}
                            />
                            <Typography
                              component="span"
                              sx={{ fontSize: 10, marginTop: 2, marginLeft: 5 }}
                            >
                              {question.createdAt}
                            </Typography>
                          </Box>
                        </ListItem>
                      </Link>
                      <Button
                        onClick={() => {
                          deleteQuestions(question.id);
                          message.success("deleted successfully");
                          handleRefresh();
                        }}
                        disabled={question.userId != LoggedUser[0].id}
                      >
                        <DeleteIcon />
                      </Button>
                    </List>
                    <Divider />
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
