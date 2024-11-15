import { InboxOutlined } from "@ant-design/icons";
import { Form, message, Upload } from "antd";
import { BASE_DOMAIN, BASE_URL } from "../../utils/constants";

const { Dragger } = Upload;

const Uploader = ({ required, defaultFile }) => {
  const props = {
    name: "image",
    multiple: false,
    action: `${BASE_URL}/file/upload`,
    defaultFileList: defaultFile
      ? [
          {
            name: defaultFile?.split("/").pop(),
            status: "done",
            url: `${BASE_DOMAIN}/${defaultFile}`,
          },
        ]
      : [],
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const normFile = ({ file }) => file.response?.path;

  return (
    <Form.Item
      label="Image"
      name="image"
      getValueFromEvent={normFile}
      valuePropName="image"
      rules={[{ required }]}
    >
      <Dragger {...props} listType="picture" maxCount={1}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </Form.Item>
  );
};
export default Uploader;
