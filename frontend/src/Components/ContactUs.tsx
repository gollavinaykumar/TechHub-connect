import { Box } from "@mui/material";
import { Header } from "../HomePage";
import StickyFooter from "./Footer";
import { useEffect } from "react";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box>
      <Header />
      <Box sx={{ margin: 3 }}>
        <img src="./6.png" width="100%" />
      </Box>
      <StickyFooter />
    </Box>
  );
}
