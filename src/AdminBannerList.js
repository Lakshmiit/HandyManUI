import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Carousel,
  Spinner,
  Form,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const BannerList = () => {
  const navigate = useNavigate();
const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [bannersList, setBannersList] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBanner, setEditBanner] = useState({
    id: "",
    title: "",
    description: "",
    // header: "",
    // footer: "",
    createdDate: "",
    updatedDate: "",
    startDate: "",
    endDate: "",   
    image: [],
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UpLoadBannners/GetBanners"
      );
      setBannersList(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch banners");
    } finally {
      setLoading(false);
    }                 
  };

  useEffect(() => {
    fetchBanners();
  }, []);

const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentBanners = useMemo(
    () => bannersList.slice(indexOfFirst, indexOfLast),
    [bannersList, indexOfFirst, indexOfLast]
  );

  const fetchBannerImages = async (banner) => {
    const imageRequests =
      banner.image?.map((photo) =>
        fetch(
          `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo.images}`
        )
          .then((res) => res.json())
          .then((data) => ({
            src: photo.images,
            imageData: data.imageData,
          }))
      ) || [];

    return await Promise.all(imageRequests);
  };

  const handleView = async (banner) => {
    try {
      setSelectedBanner(banner);
      const images = await fetchBannerImages(banner);
      setBannerImages(images);
      setShowViewModal(true);
    } catch (err) {
      console.error(err);
      alert("Unable to load banner images");
    }
  };

  const handleEdit = async (banner) => {
    try {
      const images = await fetchBannerImages(banner);
      setBannerImages(images);

      setEditBanner({
        id: banner.id,
        title: banner.title || "",
        description: banner.description || "",
        header: banner.header || "",
        footer: banner.footer || "",
        startDate: banner.startDate?.slice(0, 16),
        endDate: banner.endDate?.slice(0, 16),
        image: banner.image || [],
      });
      setShowEditModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load banner data");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      await axios.delete(
        `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UpLoadBannners/DeleteBanner/${id}`
      );
      alert("Banner deleted successfully");
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        id: editBanner.id,
        title: editBanner.title,
        description: editBanner.description,
        header: editBanner.header,
        footer: editBanner.footer,
        createdDate: editBanner.createdDate,
        updatedDate: new Date(),
        startDate: editBanner.startDate,
        endDate: editBanner.endDate,
        image: editBanner.image,
      };

      await axios.put(
        `https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UpLoadBannners/UpdateBannerDetails?id=${editBanner.id}`,
        payload
      );

      alert("Banner updated successfully");
      setShowEditModal(false);
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <>
      <Header />

      <div
        className="container"
        style={{ paddingTop: "80px", marginTop: "10px" }}
      >
        <div className="position-relative mb-3" style={{ height: "50px" }}>
          <h3
            className="text-center m-0"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
            }}
          >
            All Banners List
          </h3>

          <button
            className="btn btn-success"
            style={{ position: "absolute", right: 0 }}
            onClick={() => navigate(`/adminOfferModal/Admin`)}
          >
            Upload Poster
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table bordered hover responsive>
            <thead style={{ backgroundColor: "#cfe2d9" }}>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {currentBanners.map((banner, index) => (
                <tr key={banner.id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{banner.title}</td>
                  <td>{new Date(banner.startDate).toLocaleString()}</td>
                  <td>{new Date(banner.endDate).toLocaleString()}</td>

                  <td>
                    <Button size="sm" onClick={() => handleView(banner)}>
                      View
                    </Button>
                  </td>

                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                    >
                      Edit
                    </Button>
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* VIEW MODAL */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Banner Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedBanner && (
            <>
              <h4>{selectedBanner.title}</h4>

              <p><strong>Description:</strong> {selectedBanner.description}</p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(selectedBanner.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(selectedBanner.endDate).toLocaleString()}
              </p>

              <Carousel>
                {bannerImages.map((img, i) => (
                  <Carousel.Item key={i}>
                    <img
                      src={`data:image/jpeg;base64,${img.imageData}`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "contain",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Banner</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={editBanner.title}
                onChange={(e) =>
                  setEditBanner({ ...editBanner, title: e.target.value })
                }
              />
            </Form.Group>   

            {/* <Form.Group>
              <Form.Label>Header</Form.Label>
              <Form.Control
                value={editBanner.header}
                onChange={(e) =>
                  setEditBanner({ ...editBanner, header: e.target.value })
                }
              />  
            </Form.Group> */}

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editBanner.description}
                onChange={(e) =>
                  setEditBanner({
                    ...editBanner,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* <Form.Group>
              <Form.Label>Footer</Form.Label>
              <Form.Control
                value={editBanner.footer}
                onChange={(e) =>
                  setEditBanner({ ...editBanner, footer: e.target.value })
                }
              />
            </Form.Group> */}

            <Form.Group>
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editBanner.startDate}
                onChange={(e) =>
                  setEditBanner({
                    ...editBanner,
                    startDate: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editBanner.endDate}
                onChange={(e) =>
                  setEditBanner({
                    ...editBanner,
                    endDate: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Carousel className="mt-3">
              {bannerImages.map((img, i) => (
                <Carousel.Item key={i}>
                  <img
                    src={`data:image/jpeg;base64,${img.imageData}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
 {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: Math.ceil(bannersList.length / rowsPerPage) }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === Math.ceil(bannersList.length / rowsPerPage) ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                )
                .map((page, i, arr) => {
                  const prevPage = arr[i - 1];
                  if (prevPage && page - prevPage > 1) {
                    return (
                      <React.Fragment key={page}>
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                        <li
                          className={`page-item ${page === currentPage ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => setCurrentPage(page)}>
                            {page}
                          </button>
                        </li>
                      </React.Fragment>
                    );
                  }
                  return (
                    <li
                      key={page}
                      className={`page-item ${page === currentPage ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  );
                })}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(bannersList.length / rowsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, Math.ceil(bannersList.length / rowsPerPage))
                    )
                  }
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      <Footer />
    </>
  );
};

export default BannerList;   