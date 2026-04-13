import React, { useState } from "react";
import axios from "axios";
import {  Card,  Form,  Button,  Row,  Col,  Container,  Carousel,} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

const AdminOfferForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    files: [],
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });

  const [previews, setPreviews] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload (Max 5)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("You can upload maximum 5 images");
      return;
    }

    setFormData({ ...formData, files: selectedFiles });

    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewUrls);
  };

  const getFileByteArray = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const byteArray = new Uint8Array(reader.result);
      resolve(byteArray);
    };
    reader.readAsArrayBuffer(file);
  });
};

const uploadFile = async (byteArray, fileName, mimeType) => {
  try {
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([byteArray], { type: mimeType }),
      fileName
    );
    formData.append("fileName", fileName);

    const response = await fetch(
      `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/upload?filename=` +
        fileName,
      {
        method: "POST",
        headers: {
          Accept: "text/plain",
        },
        body: formData,
      }
    );
    const responseData = await response.text();
    return responseData || "";
  } catch (error) {
    console.error("Upload error:", error);
    return "";
  }
};

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImages = [];

for (let file of formData.files) {
  const byteArray = await getFileByteArray(file);
  const response = await uploadFile(byteArray, file.name, file.type);

  if (response) {
    uploadedImages.push(response); 
  } else {
    alert("Image upload failed");
    return;
  }
}

      const payload = {
        id: formData.id || "",
        title: formData.title,
        date: "string",
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        description: formData.description,
        image: uploadedImages.map(url => ({
          images: url
        }))
      };

      console.log("Sending Payload:", payload);

      await axios.post(
        "https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UpLoadBannners/UploadBanners",
         payload
      );
      alert("Offer Uploaded Successfully!");
      // Reset Form
      setFormData({
        id: "",
        title: "",
        files: [],
        startDate: "",
        endDate: "",
        description: "",
        status: "",
      });
      setPreviews([]);
    } catch (err) {
      console.error("Error:", err);
      alert("Upload Failed");
    }
  };

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center mt-mob-50"
        style={{
          minHeight: "85vh",
          background: "linear-gradient(135deg, #f5f7fa, #e4ecf7)",
          padding: "20px",
        }}
      >
        <Card
          className="p-4"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "15px",
          }}
        >
          <h2 className="text-center mb-2 fw-bold text-primary fs-6">
            🎉 Create Offer
          </h2>

          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">Offer Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Upload Images */}
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">
                Upload Images (Max 5)
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            {/* Preview Section */}
            {previews.length > 0 && (
              <div className="mb-3 text-center">
                {previews.length === 1 ? (
                  <img
                    src={previews[0]}
                    alt="preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Carousel interval={2000}>
                    {previews.map((img, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={img}
                          alt={`slide-${index}`}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </div>
            )}

            {/* Dates */}
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-bold">
                    Start Date & Time
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-bold">
                    End Date & Time
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Description */}
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Submit */}
            <Button type="submit" className="btn btn-primary w-100 mt-2">
              Upload Offer
            </Button>
          </Form>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default AdminOfferForm;