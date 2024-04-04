import { Box } from "@mui/material";
import StickyFooter from "./Footer";
import { Header } from "../HomePage";
import { useEffect } from "react";

export default function AboutUS() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box>
      <Header />
      <Box sx={{ margin: 2 }}>
        <img src="./1.png" width="100%" />
        <img src="./2.png" width="100%" />
        <img src="./3.png" width="100%" />
        <img src="./4.png" width="100%" />
        <img src="./5.png" width="100%" />
        <img src="./6.png" width="100%" />
      </Box>

      <StickyFooter />
    </Box>
  );
}
