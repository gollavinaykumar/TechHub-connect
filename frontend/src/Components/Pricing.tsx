import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Modal, message } from "antd";
import { Header } from "../HomePage";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { updatePricePlan } from "../Services/updatePricePlanService";
import { useUserStore } from "../zustand/useUserStore";
import Box from "@mui/material/Box";
import StickyFooter from "./Footer";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updatePayment } from "../Services/updatePayment";

const { Meta } = Card;

export default function Pricing() {
  const navigate = useNavigate();
  const loggedUser = useUserStore((s: any) => s.user);
  const [basic, setBasic] = useState("Basic");
  const [Professional, setProfessional] = useState("Professional");
  const [Corporate, setCorporate] = useState("Corporate");
  const [platinum, setPlatinum] = useState("Platinum");
  const [clickedPlan, setClickedPlan] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setUser = useUserStore((s: any) => s.setUser);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [utr, setUtr] = useState("");

  async function fetchData() {
    try {
      const updatedPlan = await updatePricePlan(
        loggedUser[0].id,
        clickedPlan,
        utr
      );

      const updatedPayment = await updatePayment(
        loggedUser[0].id,
        clickedPlan,
        utr
      );
      

      setUser(updatedPlan);
      navigate("/login");
      message.success("Plan updated successfully");
      message.error("please login again for security purpose");
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  }

  return (
    <Box>
      <Header />
      <Typography.Title level={4} style={{ textAlign: "center", marginTop: 5 }}>
        Membership plans
      </Typography.Title>
      <Box style={{ display: "flex", marginTop: 20, flexWrap: "wrap" }}>
        <Box>
          <Box key={basic} style={{ width: 300, margin: 20 }}>
            <Meta title={basic} />

            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can see events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CloseOutlined /> You can't ask questions and can't see user
              responses
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CloseOutlined /> You can't create events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CloseOutlined /> Mentor advices can't be accessed
            </Typography>
            <Typography style={{ marginTop: 10 }}>Free</Typography>
            <Button
              onClick={() => {
                setClickedPlan(basic);
                handleOpen();
              }}
              style={{ marginTop: 10 }}
              disabled={basic === loggedUser[0].membership}
            >
              Select
            </Button>
            <Modal
              open={open}
              onCancel={handleClose}
              title="Phonepe Scanner and upi"
              footer={null}
            >
              <img
                src="./scanner.jpeg"
                alt="scanner"
                style={{ width: "100%" }}
              />
              <Typography.Title
                level={3}
                style={{ margin: 5, textAlign: "center" }}
              >
                UPI ID : vinaykumar340167@ybl
              </Typography.Title>
              <TextField
                type="text"
                required={true}
                label="UTR NO"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value);
                }}
                style={{ marginBottom: 10 }}
              />
              <Button
                key={basic}
                onClick={() => {
                  if (utr !== "") {
                    fetchData();
                  } else {
                    message.error("Please enter UTR number");
                  }
                }}
              >
                Update
              </Button>
            </Modal>
          </Box>
        </Box>
        <Box>
          <Box key={Professional} style={{ width: 300, margin: 20 }}>
            <Meta title={Professional} />

            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can see events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can ask questions and see user responses
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CloseOutlined /> You can't create events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CloseOutlined /> Mentor advices can't be accessed
            </Typography>
            <Typography style={{ marginTop: 10 }}>$2</Typography>
            <Button
              onClick={() => {
                setClickedPlan(Professional);
                handleOpen();
              }}
              style={{ marginTop: 10 }}
              disabled={Professional === loggedUser[0].membership}
            >
              Select
            </Button>
            <Modal
              open={open}
              onCancel={handleClose}
              title="Phonepe Scanner and upi"
              footer={null}
            >
              <img
                src="./scanner.jpeg"
                alt="scanner"
                style={{ width: "100%" }}
              />
              <Typography.Title
                level={5}
                style={{ margin: 5, textAlign: "center" }}
              >
                UPI ID : vinaykumar340167@ybl
              </Typography.Title>
              <TextField
                type="text"
                required={true}
                label="UTR NO"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value);
                }}
                style={{ marginBottom: 10 }}
              />
              <Button
                key={Professional}
                onClick={() => {
                  if (utr !== "") {
                    fetchData();
                  } else {
                    message.error("Please enter UTR number");
                  }
                }}
              >
                Update
              </Button>
            </Modal>
          </Box>
        </Box>
        <Box>
          <Box key={Corporate} style={{ width: 300, margin: 20 }}>
            <Meta title={Corporate} />

            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can see events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can ask questions and see user responses
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can create events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CloseOutlined /> Mentor advices can't be accessed
            </Typography>
            <Typography style={{ marginTop: 10 }}>$4</Typography>
            <Button
              onClick={() => {
                setClickedPlan(Corporate);
                handleOpen();
              }}
              style={{ marginTop: 10 }}
              disabled={Corporate === loggedUser[0].membership}
            >
              Select
            </Button>
            <Modal
              open={open}
              onCancel={handleClose}
              title="Phonepe Scanner and upi"
              footer={null}
            >
              <img
                src="./scanner.jpeg"
                alt="scanner"
                style={{ width: "100%" }}
              />
              <Typography.Title
                level={5}
                style={{ margin: 5, textAlign: "center" }}
              >
                UPI ID : vinaykumar340167@ybl
              </Typography.Title>
              <TextField
                type="text"
                required={true}
                label="UTR NO"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value);
                }}
                style={{ marginBottom: 10 }}
              />
              <Button
                key={Corporate}
                onClick={() => {
                  if (utr !== "") {
                    fetchData();
                  } else {
                    message.error("Please enter UTR number");
                  }
                }}
              >
                Update
              </Button>
            </Modal>
          </Box>
        </Box>
        <Box>
          <Box key={platinum} style={{ width: 300, margin: 20 }}>
            <Meta title={platinum} />

            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can see events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can ask questions and see user responses
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> You can create events
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <CheckOutlined /> Mentor advices access
            </Typography>
            <Typography style={{ marginTop: 10 }}>$5</Typography>
            <Button
              onClick={() => {
                setClickedPlan(platinum);
                handleOpen();
              }}
              style={{ marginTop: 10 }}
              disabled={platinum === loggedUser[0].membership}
            >
              Select
            </Button>
            <Modal
              open={open}
              onCancel={handleClose}
              title="Phonepe Scanner and upi"
              footer={null}
            >
              <img
                src="./scanner.jpeg"
                alt="scanner"
                style={{ width: "100%" }}
              />
              <Typography.Title
                level={5}
                style={{ margin: 5, textAlign: "center" }}
              >
                UPI ID : vinaykumar340167@ybl
              </Typography.Title>
              <TextField
                type="text"
                required={true}
                label="UTR NO"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value);
                }}
                style={{ marginBottom: 10 }}
              />
              <Button
                key={platinum}
                onClick={() => {
                  if (utr !== "") {
                    fetchData();
                  } else {
                    message.error("Please enter UTR number");
                  }
                }}
              >
                Update
              </Button>
            </Modal>
          </Box>
        </Box>
      </Box>
      <StickyFooter />
    </Box>
  );
}
