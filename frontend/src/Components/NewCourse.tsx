import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Typography, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Header, LISTS } from "../HomePage";
import { Button, Form, Input, Select } from "antd";
import { createCourse } from "../Services/CoursesService";
import StickyFooter from "./Footer";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const NewCourse: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState("");
  const [subTitile, setSubTitle] = useState("");
  const [content, setContent] = useState("");

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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  async function onSubmit() {
    try {
      const createdCourse = await createCourse({
        title: title,
        subTitile: subTitile,
        content: content,
        image: fileList[0].thumbUrl,
      });
      message.success("successfully created course");
      setFileList([]);
      setTitle("");
      setSubTitle("");
      setContent("");
    } catch (err) {
      message.error("failed to create course");
    }
  }
  function onchangeHandler(value: any) {
    setTitle(value);
  }
  return (
    <>
      <Header />
      <Typography.Title style={{ textAlign: "center" }}>
        Add New Event
      </Typography.Title>

      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item
          label="Select the Course"
          name="Select"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select onChange={onchangeHandler}>
            {LISTS.map((ele) => {
              return (
                <Select.Option key={ele.text} value={ele.text}>
                  {ele.text}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="sub-course"
          name="Input"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input
            value={subTitile}
            onChange={(e: any) => {
              setSubTitle(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="content"
          name="TextArea"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea
            value={content}
            onChange={(e: any) => {
              setContent(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          rules={[{ required: true, message: "Please select the photo" }]}
        >
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
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={() => onSubmit()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <StickyFooter />
    </>
  );
};

export default NewCourse;
