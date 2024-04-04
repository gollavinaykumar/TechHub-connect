import { useEffect, useState } from "react";
import { useUserProfileStore } from "../zustand/useUserProfileStore";
import { getUserProfile } from "../Services/userProfileService";
import { Box, TextField } from "@mui/material";
import { Header } from "../HomePage";
import { message } from "antd";

export default function UserProfile() {
  const UserProfile = useUserProfileStore((s: any) => s.UserProfile);
  const [id, setId] = useState({});
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [membership, setMembership] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const getUser = await getUserProfile(UserProfile[0].id).catch((err) => {
      message.error("user not found",err);
    });
    setImg(getUser.image);
    setName(getUser.name);
    setEmail(getUser.email);
    setNumber(getUser.mobile);
    setRole(getUser.role);
    setMembership(getUser.membership);
  }
  console.log(img);
  return (
    <Box>
      <Header />
      <img src={img} style={{ borderRadius: 350, margin: 10 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, margin: 3 }}>
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          value={name}
        />
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          value={email}
        />
        <TextField
          id="outlined-basic"
          label="phone number"
          variant="outlined"
          value={number}
        />
        <TextField
          id="outlined-basic"
          label="plan"
          variant="outlined"
          value={membership}
        />
        <TextField
          id="outlined-basic"
          label="role"
          variant="outlined"
          value={role}
        />
      </Box>
    </Box>
  );
}
