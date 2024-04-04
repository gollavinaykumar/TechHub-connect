import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Header } from "../HomePage";
import { Link, useParams } from "react-router-dom";
import { getCourses } from "../Services/listInCourses";

export default function ListCourses() {
  const params = useParams();
  const [listCourses, setListCourses] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCourses(params);
  }, []);
  const fetchCourses = async (params: any) => {
    const data = await getCourses(params);
    setListCourses(data);
  };

  return (
    <Box>
      <Header />
      {listCourses.map((course: any) => {
        return <CoursesLists key={course.id} course={course} params={params} />;
      })}
    </Box>
  );
}

function CoursesLists({ course, params }: any) {
  return (
    <Link
      to={`/Home/${params.name}/${course.id}`}
      style={{ textDecoration: "none" }}
    >
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={course.image} />
          </ListItemAvatar>
          <ListItemText
            primary={course.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {course.subTitile}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Link>
  );
}
