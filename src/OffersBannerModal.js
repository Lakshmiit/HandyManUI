// import React, { useEffect, useState, useRef} from "react";
// import { Modal, Button } from "react-bootstrap";
// import axios from "axios";

// const IMAGE_API =
//   "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/FileUpload/download?generatedfilename=";

// const OffersBannerModal = () => {
//   const [showOffersModal, setShowOffersModal] = useState(false);
//   const [offersData, setOffersData] = useState([]);
//   const [offerImages, setOfferImages] = useState({});
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const imageCacheRef = useRef({});

//   // 🔹 Show modal initially
//   useEffect(() => {
//     setShowOffersModal(true);
//   }, []);

//   // 🔹 Fetch banners
//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const res = await axios.get(
//           "https://handymanapiv15-cmhuc3b9fcd0eeb9.canadacentral-01.azurewebsites.net/api/UpLoadBannners/GetBanners"
//         );
//         setOffersData(res.data);
//       } catch (err) {
//         console.error("Error fetching offers:", err);
//       }
//     };
//     fetchOffers();
//   }, []);

//   // 🔹 Active offers filter
//   const activeOffers = offersData.filter((offer) => {
//     const start = new Date(offer.startDate);
//     const end = new Date(offer.endDate);
//     return currentTime >= start && currentTime <= end;
//   });

//   // 🔹 Control modal visibility
//   useEffect(() => {
//     if (offersData.length > 0) {
//       const hasActive = offersData.some((offer) => {
//         const start = new Date(offer.startDate);
//         const end = new Date(offer.endDate);
//         return currentTime >= start && currentTime <= end;
//       });
//       setShowOffersModal(hasActive);
//     }
//   }, [offersData, currentTime]);

//   // 🔹 Fetch images
// useEffect(() => {
//   if (!offersData.length) return;
//   const fetchImages = async () => {
//     try {
//       const imagesMap = {};
//       await Promise.all(
//         offersData.map(async (offer) => {
//           const imagePromises = (offer.image || []).map(async (img) => {
//             const key = img.images;
//             if (imageCacheRef.current[key]) {
//               return imageCacheRef.current[key];
//             }
//             try {
//               const res = await fetch(
//                 `${IMAGE_API}${encodeURIComponent(key)}`
//               );
//               const data = await res.json();
//               if (data?.imageData) {
//                 const base64 = `data:image/jpeg;base64,${data.imageData}`;
//                 imageCacheRef.current[key] = base64; 
//                 return base64;
//               }
//             } catch (err) {
//               console.error("Image load failed:", err);
//             }
//             return null;
//           });
//           const images = await Promise.all(imagePromises);
//           imagesMap[offer.id] = images.filter(Boolean);
//         })
//       );
//       setOfferImages(imagesMap);
//     } catch (err) {
//       console.error("Error loading images:", err);
//     }
//   };
//   fetchImages();
// }, [offersData]);

// //   useEffect(() => {
// //     if (!offersData.length) return;
// //     const fetchImages = async () => {
// //       const imagesMap = {};
// //       for (const offer of offersData) {
// //         imagesMap[offer.id] = [];
// //         for (const img of offer.image || []) {
// //           try {
// //             const res = await fetch(
// //               `${IMAGE_API}${encodeURIComponent(img.images)}`
// //             );
// //             const data = await res.json();
// //             if (data?.imageData) {
// //               imagesMap[offer.id].push(
// //                 `data:image/jpeg;base64,${data.imageData}`
// //               );
// //             }
// //           } catch (err) {
// //             console.error("Image load failed:", err);
// //           }
// //         }
// //       }
// //       setOfferImages(imagesMap);
// //     };
// //     fetchImages();
// //   }, [offersData]);

//   // 🔹 Timer update
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <Modal
//       show={showOffersModal}
//       onHide={() => setShowOffersModal(false)}
//       centered
//       scrollable
//     >
//       <Modal.Header closeButton>
//         <Modal.Title style={{ fontSize: "15px", fontWeight: "bold" }}>
//           🎉  {activeOffers[0]?.title || "Special Offers"}
//         </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         {activeOffers.length === 0 ? (
//           <div
//             style={{
//               height: "250px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "20px",
//               fontWeight: "bold",
//               color: "red",
//             }}
//           >
//             Offer has expired ⏳
//           </div>
//         ) : (
//           activeOffers.map((offer, index) => {
//             const images = offerImages[offer.id] || [];

//             return (
//               <div key={offer.id}>
//                 {/* Single Image */}
//                 {images.length === 1 && (
//                   <img
//                     src={images[0]}
//                     alt="offer"
//                     loading="lazy"
//                     style={{
//                       width: "100%",
//                       maxHeight: "500px",
//                       objectFit: "contain",
//                     }}
//                   />
//                 )}

//                 {/* Multiple Images */}
//                 {images.length > 1 && (
//                   <div
//                     id={`carousel-${index}`}
//                     className="carousel slide carousel-fade"
//                     data-bs-ride="carousel"
//                     data-bs-interval="2000"
//                   >
//                     <div className="carousel-inner">
//                       {images.map((img, i) => (
//                         <div
//                           key={i}
//                           className={`carousel-item ${
//                             i === 0 ? "active" : ""
//                           }`}
//                         >
//                           <img
//                             src={img}
//                             className="d-block w-100"
//                             alt="offer"
//                             loading="lazy"
//                             style={{
//                               maxHeight: "400px",
//                               objectFit: "contain",
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Offer Expiry */}
//                 <p className= 'blinking-text' style={{ textAlign: "center",color: "red", marginTop: "5px", fontWeight: "500" }}>
//                 Offer valid till: {formatDateTime(offer.endDate)}
//                 </p>
//                 {/* Footer */}
//                 <p
//                 style={{
//                     textAlign: "center",
//                     marginTop: "5px",
//                     color: "red",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                 }}
//                 >
//                 {offer.description}
//                 </p>
//               </div>
//             );
//           })
//         )}
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="success" onClick={() => setShowOffersModal(false)}>
//           Shop Now 🛒
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default OffersBannerModal;