import { Box, TextField } from "@mui/material";
import { Header } from "../HomePage";
import { useUserStore } from "../zustand/useUserStore";
import { useEffect, useState } from "react";
import { useProfileStore } from "../zustand/useProfileStore";
import {
  updateProfile,
  updateProfilePic,
} from "../Services/updateProfileService";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Select } from "antd";
import Modal from "@mui/material/Modal";
import StickyFooter from "./Footer";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Role = [
  { text: "Student" },
  { text: "FullStackDeveloper" },
  { text: "BusinessMan" },
  { text: "Teacher" },
  { text: "SoftwareEngineer" },
  { text: "Scientist" },
  { text: "Doctor" },
  { text: "Normal" },
];

export default function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useUserStore((s: any) => s.user);
  const profile = useProfileStore((s: any) => s.profile);
  const setProfile = useProfileStore((s: any) => s.setProfile);


  const [name, setName] = useState(user[0].name);
  const [email, setEmail] = useState(user[0].email);
  const [number, setNumber] = useState(user[0].mobile);
  const [role, setRole] = useState(user[0].role);

  const setUser = useUserStore((s: any) => s.setUser);

  useEffect(() => {
    window.scrollTo(0, 0);
    setProfile([{ name, email, number, role }]);
  }, []);

  const fetchData = async () => {
    const updateProfiled = await updateProfile(
      user[0].id,
      name,
      email,
      number,
      role
    ).catch((err) => {
      message.error(err);
    });
    setProfile([updateProfiled]);
    setName(updateProfiled.name);
    setEmail(updateProfiled.email);
    setNumber(updateProfiled.mobile);
    setRole(updateProfiled.role);
    setUser(updateProfiled);
  

    message.success("profile updated successfully");
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function onSubmit() {
    fetchData();
  }

  async function updatePic() {
    if (fileList.length >= 1) {
      const updatedPic = await updateProfilePic(
        user[0].id,
        fileList[0].thumbUrl
      );
      setUser(updatedPic);
      message.success("profile pic updated successfully");
      handleClose();
    } else {
      message.error("please select image");
    }
  }
  function onchangeHandler(value: any) {
    setRole(value);
  }

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", margin: 5 }}>
        <img src={user[0].image} style={{ borderRadius: 350 }} />
        <div>
          <Button onClick={handleOpen}>Edit Profile Pic</Button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              <Button onClick={() => updatePic()}>update</Button>
            </Box>
          </Modal>
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          margin: 4,
        }}
      >
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="phone number"
          variant="outlined"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="plan"
          variant="outlined"
          value={user[0].membership}
        />

        <Select onChange={onchangeHandler} value={role}>
          {Role.map((ele) => {
            return (
              <Select.Option key={ele.text} value={ele.text}>
                {ele.text}
              </Select.Option>
            );
          })}
        </Select>

        <Button onClick={() => onSubmit()}>update</Button>
      </Box>
      <StickyFooter />
    </Box>
  );
}
