import { Box, Divider, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useCourseStore } from "./zustand/useCourseStore";
import { getCourses } from "./Services/CoursesService";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "./zustand/useUserStore";
import StickyFooter from "./Components/Footer";

const pages = [
  {
    link: "/Home",
    text: "Home",
  },
  {
    link: "/pricing",
    text: "pricing",
  },
  {
    link: "/aboutus",
    text: "About",
  },
  {
    link: "/privacypolicy",
    text: "privacy policy",
  },
  {
    link: "/contactus",
    text: "contactus",
  },
  {
    link: "/t&c",
    text: "terms & Conditions",
  },
];
const settings = [
  {
    link: "/profile",
    text: "Profile",
  },
  {
    link: "/login",
    text: "logout",
  },
];

export const LISTS = [
  {
    image:
      "https://media.licdn.com/dms/image/D4D12AQHWjlf6CXDezA/article-cover_image-shrink_720_1280/0/1698039213268?e=2147483647&v=beta&t=9d8VyULomdIk9zkz_U9N_TE4_pUdFq1dFCglRh8fv_o",
    text: "Web Development",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*cG6U1qstYDijh9bPL42e-Q.jpeg",
    text: "Machine Learning",
  },
  {
    image:
      "https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2023/07/13220529/Artificial-Intelligence-in-Indonesia-The-current-state-and-its-opportunities.jpeg",
    text: "Artificial Intelligence",
  },
  {
    image:
      "https://www.watelectronics.com/wp-content/uploads/different-programming-languages.png",
    text: "Programming Languages",
  },
  {
    image:
      "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    text: "Doctor",
  },
  {
    image:
      "https://oklahoma-council.transforms.svdcdn.com/production/assets/img/Teacher-in-front-of-chalkboard.jpeg?w=3000&h=2000&auto=compress%2Cformat&fit=crop&crop=focalpoint&fp-x=0.3059&fp-y=0.2246&dm=1644340079&s=3020830ce187ed5578c03928dde0156b",
    text: "Teacher",
  },
  {
    image:
      "https://soils.org.uk/wp-content/uploads/2021/02/young-scientist-looking-through-microscope-laboratory-young-scientist-doing-some-research.jpg",
    text: "Scientist",
  },
  {
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/02/Startup-770x428.jpg?impolicy=website&width=770&height=431",
    text: "Tech Startups",
  },
  {
    image:
      "https://bradshawlawgroup.com/wp-content/uploads/2023/02/Accredited-Investor.png",
    text: "Investors",
  },
  {
    image:
      "https://betanews.com/wp-content/uploads/2014/07/data_scientist_hiring_contentfullwidth.jpg",
    text: "Tech Professionals",
  },
  {
    image:
      "https://cdn.thetealmango.com/wp-content/uploads/2021/08/tech-Companies-pic.jpg",
    text: "Tech Companies",
  },
  {
    image:
      "https://www.diservices.com/wp-content/uploads/2023/09/How-Good-Advisors-Become-Great-The-Importance-of-Mentorship-in-Insurance-Sales.jpg",
    text: "Mentors and Advisors",
  },
  {
    image:
      "https://warontherocks.com/wp-content/uploads/2015/08/18714313778_f8b360f7ec_k-1024x585.jpg",
    text: "Government and Policy Makers",
  },
  {
    image:
      "https://taxguru.in/wp-content/uploads/2021/09/Educational-institutions-Open-book-and-a-classroom-with-blackboard-and-school-desks-isolated-on-white-background.jpg",
    text: "Educational Institutions",
  },
  {
    image:
      "https://donebyderoc.com/wp-content/uploads/2018/03/volunteer-1326758_1280-1024x804-1024x585.jpg",
    text: "Community Organizations",
  },
  {
    image:
      "https://www.timeshighereducation.com/sites/default/files/styles/teaser_standard/public/group-of-scientists-working-in-laboratory.jpg?itok=Lp5ay7NE",
    text: "Researchers and Academics",
  },
  {
    image:
      "https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.cobizmag.com/content/uploads/data-import/3069e208/DanielleUrbanhiringfreelancers.jpg",
    text: "Freelancers and Gig Workers",
  },
  {
    image:
      "https://datatechvibe.com/wp-content/uploads/2021/03/Top-10-AI-Thought-Leaders-to-Follow-in-2021-.jpg",
    text: "Industry Experts and Thought Leaders",
  },
  {
    image:
      "https://edgy.app/wp-content/uploads/2019/10/How-to-be-a-Successful-Social-Media-Content-e1578920583503.jpg",
    text: "Media and Content Creators",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTva6rSmF7VfTAo_t3HpnXI82PxqmgMvbxzkhSF3j3znQ&s",
    text: "Global Partners and Collaborators",
  },
  {
    image:
      "https://media.licdn.com/dms/image/D4D12AQH398VlDBw6cA/article-cover_image-shrink_720_1280/0/1706108001486?e=2147483647&v=beta&t=qcU3FCrsDAmkSr3LdEeKcVpAmAto7s5EuwhIEqmgitw",
    text: "Non-tech Industries and Stakeholders",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/online-hacker-hacking-computer-anonymous-cyberpunk_1006514-7542.jpg",
    text: "Hackers and Tinkerers",
  },
  {
    image:
      "https://www.isbr.in/blogs/wp-content/uploads/2023/09/Career-Options-After-BCA.jpg",
    text: "Tech Enthusiasts",
  },
  {
    image:
      "https://www.hubraum.com/_Resources/Persistent/a/1/8/4/a184e373a602e95cdcb2c454bf27ec21cbe62f67/hackathon-2-scaled-2485x1397.jpeg",
    text: "Hackathon Organizers",
  },
  {
    image:
      "https://inc42.com/wp-content/uploads/2023/06/Glossary-Series-Brand-_-Crowd-Funding-ftr.png",
    text: "Crowdfunding",
  },
  {
    image: "https://sebringohio.net/wp-content/uploads/2022/08/Job_Posting.png",
    text: "Job postings",
  },
  {
    image:
      "https://www.textileinfomedia.com/images/display-subcategory/legal-adviser-1.jpg",
    text: "Legal Advisors",
  },
  {
    image:
      "https://www.edubridgeindia.com/blog/storage/2022/10/data_science_and_data_analytics_engineer-scaled.jpg",
    text: "Data Scientists and Analysts",
  },
  {
    image:
      "https://marketingweek.imgix.net/content/uploads/2021/02/04114408/Social.jpg?auto=compress,format&q=60&w=736&h=429",
    text: "Marketing and Growth Experts",
  },
  {
    image:
      "https://cdn.zeebiz.com/sites/default/files/2023/08/16/256360-tejas-network.jpg?im=FitAndFill=(1200,900)",
    text: "Stocks Network",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:1024/1*eRgQf4sADIkzfE56kh-g9Q.jpeg",
    text: "Mechanical Engineering",
  },
  {
    image:
      "https://cgu-odisha.ac.in/wp-content/uploads/2023/05/electronic-engineering-1.jpg",
    text: "Electronical Engineering",
  },
  {
    image:
      "https://engineering.purdue.edu/construction-engineering-management/wp-content/uploads/2022/04/123730928_m-scaled.jpg",
    text: "Construction Engineering",
  },
];

export default function HomePage() {
  const setCourses = useCourseStore((s: any) => s.setCourses);
  const loggedUser: any = useUserStore((s: any) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    <Skeleton variant="rectangular" width={210} height={118} />;
    fetchData();
    {
      loggedUser[0].id == null && navigate("/login");
    }
  }, []);
  const fetchData = async () => {
    const courses = await getCourses();
    setCourses(courses);
  };
  return (
    <Box>
      <Header />
      <Link to="/Home/new">
        <Button
          variant="contained"
          disabled={
            (loggedUser[0].membership != undefined &&
              loggedUser[0].membership === "Basic") ||
            loggedUser[0].membership === "Professional"
          }
          sx={{ margin: 5, float: "right" }}
        >
          Add Event
        </Button>
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          margin: 5,
          flexWrap: "wrap",
          width: "90%",
        }}
      >
        {LISTS.map((course: any) => {
          return <CourseCard course={course} key={course.text} />;
        })}
      </Box>
      <Divider />
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign="center"
        fontFamily="cursive"
        marginTop={2}
      >
        Teams work on this project
      </Typography>
      <Box
        sx={{
          textAlign: "justify",
          display: "flex",
          justifyContent: "center",
          marginTop: 7,
        }}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image="./vinay.jpeg"
              alt="green iguana"
              width="100%"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Developed by Golla vinay kumar
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="cursive"
              >
                "main goal of designing a tech hub connect project is to foster
                collaboration, innovation, and growth within the technology
                ecosystem. By providing a centralized platform or space, it
                enables various stakeholders such as startups, investors,
                professionals, and mentors to connect, exchange ideas, seek
                support, and form partnerships. Through networking events,
                mentorship programs, resource sharing, and access to funding
                opportunities, the project facilitates the development and
                scaling of tech ventures. Additionally, it serves as a hub for
                knowledge-sharing, talent acquisition, and community-building,
                ultimately driving economic development, job creation, and
                technological advancement within the region or industry"
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <StickyFooter />
    </Box>
  );
}

function CourseCard({ course }: any) {
  return (
    <Link to={`/Home/${course.text}`} style={{ textDecoration: "none" }}>
      <Card sx={{ width: 500, maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            width={500}
            height="140"
            image={course.image}
            alt={course.text}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export function Header() {
  const loggedUser = useUserStore((s: any) => s.user);
  const setUser = useUserStore((s: any) => s.setUser);
  const [profilePic, setProfilePic] = useState("/static/images/avatar/2.jpg");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ position: "sticky", top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TechHub Connect
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to={page.link} key={page.link}>
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TechHub Connect
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.link} style={{ textDecoration: "none" }}>
                <Button
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={loggedUser[0].image ? loggedUser[0].image : profilePic}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link
                  to={setting.link}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    if (setting.text == "logout") {
                      setUser({});
                    }
                  }}
                >
                  <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.text}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
