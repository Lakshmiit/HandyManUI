// import React, { useState, useEffect, useRef} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import './App.css';
// import { Modal, Button} from 'react-bootstrap';
// import Confetti from "react-confetti";
// import ImageCache from "./utils/ImageCache";
// import axios from "axios";    
// import Footer from './Footer.js';
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import StorefrontIcon from '@mui/icons-material/Storefront'; 
// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// // import Banner3 from './img/Above45.jpeg'; 
// // import BannerVideo from './img/PongalOffers.mp4';
// // import VolumeOffIcon from '@mui/icons-material/VolumeOff';       
// // import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import { useNavigate, useParams } from "react-router-dom";   
// import Logo from "./img/Hm_Logo 1.png";
// import SearchIcon from "@mui/icons-material/Search";
// import LogoutIcon from "@mui/icons-material/Logout";   
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// import MenuIcon from '@mui/icons-material/Menu';
// import Electrical from './img/Electrical.jpeg';
// import Electronics from './img/Electronics.jpeg';
// import Plumbing from './img/Plumbing.jpeg';
// import Hardware from './img/Hardware.jpeg';
// import HomeDecor from './img/HomeDecor.jpeg';
// import HomeAppliances from './img/Kitchenware.jpeg';
// import BabyKidsImg from './img/BabyKids.jpeg';
// import PoojaImg from './img/Pooja.jpeg';
// import HairImg from './img/HairCare.jpeg';
// import BathBodyImg from './img/BathBody.jpeg';
// import RavvaImg from './img/RiceRavva.jpeg';
// import AttaImg from './img/AttaFlours.jpeg';
// import OilsImg from './img/OilDals.jpeg';
// import SugarImg from './img/SugarSalt.jpeg';
// import MasalaImg from './img/MasalaPickles.jpeg';
// import MilkImg from './img/MilkGhee.jpeg';
// import BreadsImg from './img/BreadEggs.jpeg';
// import DrinkImg from './img/DrinkJuice.jpeg';
// import BakeryImg from './img/BakerySweets.jpeg';
// import VegetablesImg from './img/Vegetables.jpeg';
// import FruitsImg from './img/Fruits.jpeg';
// import DryfruitsImg from './img/Bakery.jpeg';
// import SoupsImg from './img/SoupsSauces.jpeg';
// import KitchenImg from './img/Kitchenware.jpeg';
// import BiscuitsImg from './img/Biscuits.jpeg';
// import HealthImg from './img/HealthCare.jpeg';
// import SkinImg from './img/SkinFace.jpeg';
// import TeaImg from './img/teacoffee.jpeg';
// import NamkeenImg from './img/InstantFoodImg.jpeg';
// import HouseHoldImg from './img/HouseHold.jpeg';   
// import ChickenImg from './img/Chicken.jpeg';
// import StationaryImg from './img/Stationary.jpeg';
// import KidsImg from './img/KidsZone.jpeg';
// import setkurti from './img/3pcsset.jpeg';
// import kurti from './img/2pcsset.jpeg';
// import { CartStorage } from "./CartStorage";
// import IcecreamImg from './img/IceCreams.jpeg';
// import DwakraProducts from './img/DwakraLogo.jpeg';
// import UnbeatableImg from './img/MilkOffers.jpeg';
// import Above45Img from './img/Above45.jpeg'; 
// import AddIcCallIcon from '@mui/icons-material/AddIcCall';
// import RoyalImg from './img/LMartLogo.jpeg';
// import HomeElectricalImg from './img/HomeElectrical.jpeg';
// import HomePlumbingImg from './img/HomePlumbing.jpeg';   
// import Container1Img from './img/599.png';
// import Container2Img from './img/599.png';
// import Container3Img from './img/1999.png';       
// import Container4Img from './img/999.png';    

// // import { appConfig } from "./config";        

// const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName, isMobile) => {
//   const iconSize = isMobile ? 20  : 40;
//   const customer = [
//       { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
//       { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
//       { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
//       ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
//     }] : []),
//       { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
//     ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
//     }] : []),
//     ...(!isMobile ? [{MenuIcon: <DeliveryDiningIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Delivery Partner", TargetUrl: `/deliveryPartner/${userType}/${userId}`
//     }] : []),
//       ];
//      switch (userType) {
//       case "customer":
//        return customer; 
//      default:
//           return []; 
//   }
// };
// const categories = [
// { label: 'Home Decors', value: 'Home Decors', image: HomeDecor }, 
// { label: 'Home Appliances', value: 'Home Appliances', image: HomeAppliances },         
// { label: 'Electrical Items', value: 'Electrical items', image: Electrical }, 
// { label: 'Electronics Appliances', value: 'Electronics appliances', image: Electronics },   
// { label: 'Plumbing & Sanitary', value: 'Sanitary items', image: Plumbing },         
// { label: 'Hardware Items', value: 'Hardware items', image: Hardware },      
// ]; 
       
// const groceryCategories = [
//   {label: 'LMart Products', value: 'LMart Special', image: RoyalImg},
//   { label: 'Unbeatable 10 Offers', value: 'Unbeatable Offers', image: UnbeatableImg },
//   { label: 'Above 45 % Offers', value: 'Offers', image: Above45Img },
//   { label: 'Milk, Curd & Ghee', value: 'Milk, Curd & Ghee', image: MilkImg },
//    { label: 'Vegetables', value: 'Vegetables', image: VegetablesImg },
//   { label: 'Fruits', value: 'Fruits', image: FruitsImg }, 
//   { label: 'Ice Creams', value: 'Ice Creams', image: IcecreamImg },
//   { label: 'Atta & Flours', value: 'Atta & Flours', image: AttaImg },
//   { label: 'Rice & Ravva', value: 'Rice & Ravva', image: RavvaImg },    
//   { label: 'Oils & Dals', value: 'Oils & Dals', image: OilsImg },
//   { label: 'Sugar, Salt & Jaggery', value: 'Sugar, Salt & Jaggery', image: SugarImg }, 
//   { label: 'Masala, Spices & Pickles', value: 'Masala, Spices & Pickles', image: MasalaImg },
//   { label: 'Instant Food, Chips & Namkeen', value: 'Instant Food, Chips & Namkeen', image: NamkeenImg },
//   { label: 'Bread & Eggs', value: 'Bread & Eggs', image: BreadsImg },
//   { label: 'Biscuits & Chocolates', value: 'Biscuits & Chocolates', image: BiscuitsImg },
//   { label: 'Drinks & Juices', value: 'Drinks & Juices', image: DrinkImg },
//   { label: 'Sweets & Snacks', value: 'Sweets & Snacks', image: BakeryImg },
//   { label: 'Dry Fruits & Bakery', value: 'Dry Fruits & Bakery', image: DryfruitsImg },
//   { label: 'Soups & Sauces', value: 'Soups & Sauces', image: SoupsImg},
//   { label: 'Tea & Coffee', value: 'Tea & Coffee', image: TeaImg },   
//   { label: 'Stationary', value: 'Stationary', image: StationaryImg },
//   { label: 'Home Needs', value: 'Home Needs', image: HouseHoldImg },
//   { label: 'Pooja Essentials', value: 'Puja Essentials', image: PoojaImg },
//   { label: 'Skin & Face Care', value: 'Skin & Face Care', image: SkinImg },
//   { label: 'Bath & Body Care', value: 'Bath & Body Care', image: BathBodyImg },
//   { label: 'Hair Care', value: 'Hair Care', image: HairImg },
//   { label: 'Baby Products', value: 'Baby Products', image: BabyKidsImg },
//   { label: 'Kids Zone', value: 'Kids Zone', image: KidsImg },
//   { label: 'Health Care', value: 'Health Care', image: HealthImg },
//   { label: 'DWCRA Products', value: 'DWCRA', image: DwakraProducts },
//   { label: 'Chicken', value: 'Chicken', image: ChickenImg },
// ];
// // https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net
// const collectionsCategories = [
//   { label: 'Dupatta Sets', value: 'Dupatta Sets', image: setkurti },
//   { label: 'Kurta Sets', value: 'Kurta Sets', image: kurti},
//   ];

//   const IMAGE_API =
//   `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=`;

// const ProfilePage = () => {
//    const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [imageUrls, setImageUrls] = useState({});    
//   const [searchQuery, setSearchQuery] = useState("");
//    const [listening, setListening] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {userId} = useParams();
//     const {userType} = useParams();
//     const [category, setCategory] = useState('');
//     const [fullName, setFullName] = useState('');
//     const [menuList, setMenuList] = useState([]);
//     const [profile, setProfile] = useState({});
//     const [selectedTicket, setSelectedTicket] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [profileImage, setProfileImage] = useState(null);
//     const fileInputRef = useRef(null);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//     const [showMenu, setShowMenu] = useState(false);
//     const [showProfile, setShowProfile] = useState(false);
//     const [allTickets, setAllTickets] = useState([]);
//     const menuRef = useRef(null);
//     const ticketScrollRef = useRef(null);  
//    const [error, setError] = useState('');
//     const [products, setProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("");
//     //  const videoRef = useRef(null);
// // const [isMuted] = useState(true);
// // const [isMuted, setIsMuted] = useState(true);  
// const [grocery, setGrocery] = useState([]);
// const [cartSummary, setCartSummary] = useState({
//   items: 0,
//   total: 0,  
//   products: [],
// }); 
// const [dress, setDress] = useState([]);
// const [deliveryProfile, setDeliveryProfile] = useState(null);
// const [showInterestModal, setShowInterestModal] = useState(false);
// const [showNotificationModal, setShowNotificationModal] = useState(false);
// const [selectedOption, setSelectedOption] = useState("");
// const [groceryData, setGroceryData] = useState([]);
// const [state, setState] = useState("");
// const [address, setAddress] = useState("");  
// const [district, setDistrict] = useState("");
// const [zipCode, setZipCode] = useState("");
// const [mobileNumber, setMobileNumber] = useState('');
// const [status, setStatus] = useState('');  
// const [id, setId] = useState('');
// const [pinCode, setPinCode] = useState("");
// const [martId, setMartId] = useState('');
// const [paymentMode, setPaymentMode] = useState('');
// const clickLock = useRef(false);
// const [isRegistered, setIsRegistered] = useState(false);
// const [partnerStatus, setPartnerStatus] = useState("");
// // const [isPickup, setIsPickup] = useState(false);
// const [cartData, setCartData] = useState(null);
// const [transactionDetails, setTransactionDetails] = useState('');
// const [transactionStatus, setTransactionStatus] = useState('');
// const [longitude, setLongitude] = useState('');
// const [latitude, setLatitude] = useState('');
// const [paidAmount, setPaidAmount] = useState('');
// const [date, setDate] = useState('');
// const [grandTotal, setGrandTotal] = useState('');
// const [items, setItems] = useState('');
// const [assignedTo, setAssignedTo] = useState('');
// const [deliveryPartnerUserId, setDeliveryPartnerUserId] = useState('');
// const [totalItemsSelected, setTotalItemsSelected] = useState('');
// const [transactionNumber, setTransactionNumber] = useState('');
// const [city, setCity] = useState('');
// const HEADER_H = 0;          
// const MOBILE_ICONS_H = 0; 
// const MOBILE_EXTRA =0;     
// const MOBILE_PADDING_TOP = HEADER_H + MOBILE_ICONS_H + MOBILE_EXTRA;
// const [cartImages, setCartImages] = useState({});
// const [showCashbackModal, setShowCashbackModal] = useState(false);
// const [showConfetti, setShowConfetti] = useState(false);
// const [windowSize, setWindowSize] = useState({
//   width: window.innerWidth,
//   height: window.innerHeight,
// });
// const [cashbackAmount, setCashbackAmount] = useState(0);
// const [cart, setCart] = useState({});
// const [showZoomModal, setShowZoomModal] = useState(false);
// const [zoomImage, setZoomImage] = useState("");
// const [zoomProduct, setZoomProduct] = useState(null);
// const displayProducts =
// searchQuery.trim().length > 0 ? filteredProducts : products;
// const [imageLoading, setImageLoading] = useState(true);
// const [placeholderIndex, setPlaceholderIndex] = useState(0);
// // const carouselRef = useRef(null);
// // const carouselInstance = useRef(null);
// const firstCategories = groceryCategories.slice(0, 6);
// const secondCategories = groceryCategories.slice(6, 31);
// // const thirdCategories = groceryCategories.slice(15, 24);
// // const fourthCategories = groceryCategories.slice(24, 30);
// // const HEADER_HEIGHT = window.innerWidth <= 768 ? 50 : 100;
// const [showOffersModal, setShowOffersModal] = useState(false);
// const offers = [
//   {
//     condition: "New Users Get - ₹50 in Wallet!",
//     img: Container1Img,
//   },
//   {
//     condition: "Cashback|Above ₹599 Order",
//     img: Container2Img,
//   },
//   {
//     condition: "Cashback|Above ₹999 Order",
//     img: Container4Img,
//   },
//   {
//     condition: "Cashback|Above ₹1999 Order",
//     img: Container3Img,
//   },
// ];

//  const highlightText = (text) => {
//   return text.split(/(₹\d+)/g).map((part, index) =>
//     /₹\d+/.test(part) ? (
//       <span key={index} style={{ color: "red", fontWeight: "bold" }}>
//         {part}
//       </span>
//     ) : (
//       <span key={index} style={{ color: "green" }}>
//         {part}
//       </span>
//     )
//   );
// };

// useEffect(() => {
//   setShowOffersModal(true);
// }, []);

// const hasRun = useRef(false);

// useEffect(() => {
//   if (hasRun.current) return; 
//   hasRun.current = true;
//   const today = new Date().toDateString();
//   const storedData = JSON.parse(
//     localStorage.getItem("offersModalData") || "{}"
//   );
//   if (storedData.date === today) {
//     if (storedData.count < 5) {
//       setShowOffersModal(true);
//       localStorage.setItem(
//         "offersModalData",
//         JSON.stringify({
//           date: today,
//           count: storedData.count + 1,
//         })
//       );
//     }
//   } else {
//     setShowOffersModal(true);
//     localStorage.setItem(
//       "offersModalData",
//       JSON.stringify({
//         date: today,
//         count: 1,
//       })
//     );
//   }
// }, []);

// const placeholderSuggestions = [
//   'Search "Milk"', 'Search "Freedom Refined Sunflower Oil"', 'Search "Sona Masoori Rice"',
//   'Search "Paneer"', 'Search "Red Label"', 'Search "Coffee"', 'Search "Aashirvaad"',
//   'Search "Surf Excel"', 'Search "Toothpaste"', 'Search "Lizol"', 'Search "Maggi"',
//   'Search "Horlicks"', 'Search "Eggs"', 'Search "Chocolate"', 'Search "Butter"',
//   'Search "Bread"', 'Search "Chicken"', 'Search "Shampoo"', 'Search "Soap"',
// ];

// useEffect(() => {
//   const interval = setInterval(() => {
//     setPlaceholderIndex((prev) => (prev + 1) % placeholderSuggestions.length);
//   }, 1500); 
//   return () => clearInterval(interval);
// }, [placeholderSuggestions.length]);       

// useEffect(() => {
//   console.log( imageLoading, zoomProduct, zoomImage, showZoomModal, cartSummary, items, grocery,error, showMenu, products, selectedCategory, dress);
// }, [imageLoading, zoomProduct, zoomImage, showZoomModal, cartSummary, items, grocery, error,showMenu, products, selectedCategory, dress]);
 
// useEffect(() => {
//   if (!selectedCategory) return;
//   let cancelled = false;
//   const controller = new AbortController();
//   // const POLL_MS = 2000;
//   // let pollId = null;

//   const category = selectedCategory; 
//   async function fetchProductsAndFirstImages(warm = false, signal) {
//     try {
//       if (!warm) setImageLoading(true);
//       // handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net
//       const url = `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetGroceryItemsBycategory?Category=${category}`;

//       const { data: items } = await axios.get(url, { signal });
//       const safeItems = (Array.isArray(items) ? items : []).map(normalizeProduct);
//       if (cancelled) return;    
      
//       setProducts(safeItems);
//       if (warm) return;
//       const firstImages = safeItems
//         .map((p) => ({
//           productId: p.id,
//           photo: Array.isArray(p.images) ? p.images[0] : null,
//         }))
//         .filter((x) => !!x.photo);
//       const cachedMap = {};
//       const misses = [];    
//       for (const { productId, photo } of firstImages) {
//         const cached = ImageCache.getBase64(photo);
//         if (cached) {
//           cachedMap[productId] = [`data:image/jpeg;base64,${cached}`];
//         } else {
//           misses.push({ productId, photo });
//         }
//       }
//       if (Object.keys(cachedMap).length) {
//         setImageUrls((prev) => ({ ...prev, ...cachedMap }));
//       }
//       if (cancelled) return;
//       const fetchOne = async ({ productId, photo }) => {
//         try {
//           const res = await fetch(
//             `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=${photo}`,
//             { signal }
//           );

//           const json = await res.json();
//           const b64 = json?.imageData || "";
//           if (!b64) return;

//           ImageCache.setBase64(photo, b64);
//           const dataUrl = `data:image/jpeg;base64,${b64}`;

//           if (!cancelled) {
//             setImageUrls((prev) => {
//               if (prev[productId]?.[0] === dataUrl) return prev;
//               return { ...prev, [productId]: [dataUrl] };
//             });
//           }
//         } catch {}
//       };

//       await Promise.allSettled(misses.map(fetchOne));
//     } catch (err) {
//       if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
//         console.error("Error fetching grocery products:", err);
//         if (!warm) {
//           setProducts([]);
//           setImageUrls({});
//         }
//       }
//     } finally {
//       if (!cancelled && !warm) setImageLoading(false);
//     }
//   }
//   // First load
//   fetchProductsAndFirstImages(false, controller.signal);
  
//   return () => {
//     cancelled = true;
//     controller.abort();
//   };
// }, [selectedCategory]); 

// const getMaxAllowedQty = (product) => {
//   if (!product) return 0;
//   return Math.min(product.stockLeft, product.limit  > 0 ? product.limit : Infinity);
// };

// useEffect(() => {
//   const categories = JSON.parse(localStorage.getItem("allCategories") || "[]");
//   categories.forEach(cat => {
//     cat.products.forEach(async (p) => {
//       if (!p.imageFile || cartImages[p.id]) return;
//       try {
//         const res = await fetch(
//           `${IMAGE_API}${encodeURIComponent(p.imageFile)}`
//         );
//         const json = await res.json();
//         if (json?.imageData) {
//           setCartImages(prev => ({
//             ...prev,
//             [p.id]: `data:image/jpeg;base64,${json.imageData}`,
//           }));
//         }
//       } catch (err) {
//         console.error("Cart image load failed", err);
//       }
//     });
//   });
// }, [cartImages]); 

// useEffect(() => {
//   const raw = localStorage.getItem("allCategories");
//   if (!raw) return;
//   const categories = JSON.parse(raw);
//   categories.forEach(cat => {
//     cat.products.forEach(async (item) => {
//       if (!item.imageFile || cartImages[item.id]) return;
//       try {
//         const res = await fetch(
//           `${IMAGE_API}${encodeURIComponent(item.imageFile)}`
//         );
//         const json = await res.json();
//         if (json?.imageData) {
//           setCartImages(prev => ({
//             ...prev,
//             [item.id]: `data:image/jpeg;base64,${json.imageData}`,
//           }));
//         }
//       } catch (e) {
//         console.error("Cart image fetch failed", e);
//       }
//     });
//   });
// }, [cartImages]); 

// useEffect(() => {
//   if (showCashbackModal) {
//     setShowConfetti(true);
//     const timer = setTimeout(() => setShowConfetti(false), 3000);
//     return () => clearTimeout(timer);
//   }
// }, [showCashbackModal]);

// useEffect(() => {
//   const handleResize = () => {
//     setWindowSize({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     });
//   };
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

//    const handleImageClick = (imageSrc, product) => {
//   setZoomImage(imageSrc);
//   setZoomProduct(product);       
//   setShowZoomModal(true);
// };
//   /* ================ VOICE SEARCH ================= */
//   const startVoiceSearch = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Voice search not supported in this browser");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     setListening(true);
//     recognition.onresult = (event) => {
//       const spokenText = event.results[0][0].transcript;
//       setSearchQuery(spokenText);
//       setListening(false);
//     };
//     recognition.onerror = () => setListening(false);
//     recognition.onend = () => setListening(false);
//     recognition.start();
//   };

//   const normalizeProduct = (p) => ({
//   ...p,
//   stockLeft: Number(p.stockLeft || 0),
//   limit: Number(p.limit || 0),
//   afterDiscount: Number(p.afterDiscount || 0),
//   mrp: Number(p.mrp || 0),
// });

// /* ================= FETCH PRODUCTS ================= */
// // useEffect(() => {
// //   let cancelled = false;
// //   const POLL_MS = 5000
// //   const fetchProducts = async (showLoader = false) => {
// //     if (showLoader) setLoading(true);
// //     try {
// //       const res = await axios.get(
// //         "https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetAllGroceryItems"
// //       );
// //       if (cancelled) return;
// //       const normalized = (Array.isArray(res.data) ? res.data : [])
// //         .map(normalizeProduct)
// //         .filter(p => p.status === "Approved");
// //       setAllProducts(prev => {
// //         if (
// //           prev.length === normalized.length &&
// //           prev.every((p, i) =>
// //             p.id === normalized[i].id &&
// //             p.stockLeft === normalized[i].stockLeft &&
// //             p.limit === normalized[i].limit
// //           )
// //         ) {
// //           return prev; 
// //         }
// //         return normalized;
// //       });
// //     } catch (err) {
// //       console.error("Fetching grocery items failed", err);
// //     } finally {
// //       if (showLoader && !cancelled) setLoading(false);
// //     }
// //   };
// //   fetchProducts(true);
// //   const intervalId = setInterval(() => {
// //     fetchProducts(false);
// //   }, POLL_MS);
// //   return () => {
// //     cancelled = true;
// //     clearInterval(intervalId);
// //   };
// // }, []);


// useEffect(() => {
//   let cancelled = false;
//   // const POLL_MS = 5000;

//   const sendLog = async () => {
//     try {
//       const payload = {
//         id: "1", 
       
//         date: "string",
//         mobileNumber: profile.mobileNumber, 
//         message: "User fetching grocery items in profile page"
//       };

//       await axios.post(
//         `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/LmartLogs/UploadlogsDetails`,
//         payload
//       );
//     } catch (err) {
//       console.error("Log API failed", err);
//     }
//   };

//   const fetchProducts = async (showLoader = false) => {
   
//     sendLog();

//     if (showLoader) setLoading(true);

//     try {
//       const res = await axios.get(
//         "https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetAllGroceryItems"
//       );

//       if (cancelled) return;

//       const normalized = (Array.isArray(res.data) ? res.data : [])
//         .map(normalizeProduct)
//         .filter((p) => p.status === "Approved");

//       setAllProducts((prev) => {
//         if (
//           prev.length === normalized.length &&
//           prev.every(
//             (p, i) =>
//               p.id === normalized[i].id &&
//               p.stockLeft === normalized[i].stockLeft &&
//               p.limit === normalized[i].limit
//           )
//         ) {
//           return prev;
//         }
//         return normalized;
//       });

//     } catch (err) {
//       console.error("Fetching grocery items failed", err);
//     } finally {
//       if (showLoader && !cancelled) setLoading(false);
//     }
//   };

//   fetchProducts(true);

//   // const intervalId = setInterval(() => {
//   //   fetchProducts(false);
//   // }, POLL_MS);
    
//   return () => {
//     cancelled = true;
//     // clearInterval(intervalId);
//   };
// }, [profile.mobileNumber]);

//   /* ================= FILTER ================= */
//   useEffect(() => {
//     let result = allProducts.filter((p) => p.status === "Approved");
//     if (searchQuery.trim()) {
//       result = result.filter((p) =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     } else {
//       result = [];
//     }
//     setFilteredProducts(result);
//   }, [searchQuery, allProducts]);

//   /* ================= FETCH IMAGES ================= */
//   useEffect(() => {
//     if (!filteredProducts.length) return;
//     const controller = new AbortController();
//     filteredProducts.forEach(async (p) => {
//       if (!p.images?.[0] || imageUrls[p.id]) return;
//       try {
//         const res = await fetch(
//           `${IMAGE_API}${encodeURIComponent(p.images[0])}`,
//           { signal: controller.signal }
//         );
//         const json = await res.json();
//         if (!json?.imageData) return;
//         setImageUrls((prev) => ({
//           ...prev,
//           [p.id]: `data:image/jpeg;base64,${json.imageData}`,
//         }));
//       } catch {}
//     });
//     return () => controller.abort();
//   }, [filteredProducts, imageUrls]);

// const handleAddClick = (product) => {
//   const maxQty = getMaxAllowedQty(product);
//   if (maxQty <= 0) return;
//   updateLocalStorageCart(
//     { ...product, imageFile: product.images?.[0] || "" },
//     1
//   );
//   setCart(prev => ({ ...prev, [product.id]: 1 }));
// };

//  const handleIncrement = (product) => {
//   const maxQty = getMaxAllowedQty(product);

//   setCart(prev => {
//     const current = prev[product.id] || 0;
//     if (current >= maxQty) return prev;

//     const next = current + 1;
//     updateLocalStorageCart(product, next);
//     return { ...prev, [product.id]: next };
//   });
// };

//   const handleDecrementClick = (product) => {
//   setCart(prev => {
//     const qty = prev[product.id] || 0;
//     const newQty = qty - 1;

//     updateLocalStorageCart(product, newQty);

//     if (newQty <= 0) {
//       const copy = { ...prev };
//       delete copy[product.id];
//       return copy;
//     }
//     return { ...prev, [product.id]: newQty };
//   });
// };

//   // cashback logic
// useEffect(() => {
//   if (!showCashbackModal) return; 
//   const timer = setTimeout(() => {
//     setShowCashbackModal(false);
//   }, 5000);
//   return () => clearTimeout(timer); 
// }, [showCashbackModal]);

// useEffect(() => {
//   const fetchDeliveryData = async () => {
//     try {    
//       const response = await fetch(
//         `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/GetProductDetails?id=${id}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch grocery product data");
//       }
//       const data = await response.json();
//       console.log("Fetched Grocery Data:", data);
//       setCartData(data);
//       setId(data.id);
//       setMartId(data.martId);
//       setDate(data.date);
//       setMobileNumber(data.customerPhoneNumber);
//       setAddress(data.address);
//       setState(data.state);
//       setCity(data.district);
//       setPinCode(data.zipCode);
//       setPaymentMode(data.paymentMode);
//       setTransactionDetails(data.utrTransactionNumber);
//       setLongitude(data.longitude);
//       setLatitude(data.latitude);
//       setGrandTotal(data.grandTotal);
//       setPaymentMode(data.paymentMode);
//       setTotalItemsSelected(data.totalItemsSelected);
//       setTransactionStatus(data.transactionStatus);
//       setPaidAmount(data.paidAmount);
//       setTransactionNumber(data.transactionNumber);
//       setLatitude(data.latitude);
//       setLongitude(data.longitude);
//       setTotalItemsSelected(data.totalItemsSelected);
//       setDeliveryPartnerUserId(data.deliveryPartnerUserId);
//       setAssignedTo(data.assignedTo);
//       let allProducts = [];
//       let totalAmountFromApi = 0;

//       if (data.categories && Array.isArray(data.categories)) {
//         data.categories.forEach((cat) => {
//           totalAmountFromApi += Number(cat.totalAmount) || 0;
//           cat.products.forEach((p, idx) => {
//             allProducts.push({
//               serial: allProducts.length + 1,
//               name: p.productName,
//               category: cat.categoryName,
//               mrp: p.mrp,
//               discount: p.discount,
//               afterDiscountPrice: p.afterDiscountPrice,
//               quantity: p.noOfQuantity,
//               total: p.afterDiscountPrice * p.noOfQuantity,
//             });
//           });
//         });
//         setItems(allProducts);
//       }
//       const grandTotalNumeric = Number(data.grandTotal) || 0;
//       const cashback = totalAmountFromApi - grandTotalNumeric;
//       if ((cashback >= 49 && cashback <= 51) ||(cashback >= 99 && cashback <= 101) || (cashback >= 199 && cashback <= 201))
//       {
//         setCashbackAmount(cashback); 
//       } else {
//         setCashbackAmount(0);     
//       }
//     } catch (error) {
//       console.error("Error fetching grocery product data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (id) {
//     fetchDeliveryData();
//   }
// }, [id]);

//  useEffect(() => {
//   const fetchGroceryData = async () => {
//     try {
//       const response = await fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/GetMartTicketsByUserId?userId=${userId}`);
//       if (!response.ok) throw new Error('Failed to fetch ticket data');
//       const data = await response.json();
//       const tickets = Array.isArray(data) ? data : (data && typeof data === "object" ? [data] : []);
//       setGroceryData(tickets);
//       const first = tickets[0] || {};
//       setMartId(first.martId || "");
//       setState(first.state || "");
//       setDistrict(first.district);
//       setPinCode(first.zipCode || first.pinCode || "");
//       setAddress(first.address || "");
//       setId(first.id || "");
//       setPaymentMode(first.paymentMode || "");
//       setStatus(first.status || "");
//       setFullName(first.customerName || "");
//       setMobileNumber(first.customerPhoneNumber || "");
//     } catch (error) {
//       console.error('Error fetching ticket data:', error);
//       setGroceryData([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchGroceryData();
// }, [userId]);

//   useEffect(() => {            
//     console.log(deliveryProfile);
//   }, [deliveryProfile]);

// const handleDeliveryPartnerClick = async () => {
//   if (clickLock.current) return;
//   clickLock.current = true;
//   try {
//     const res = await axios.get(
//       `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/DeliveryPartner/GetDeliveryPartnerDetailsByUserId?userId=${userId}`
//     );
//     const raw = res?.data ?? null;
//     const profile = Array.isArray(raw)
//       ? (raw.length > 0 ? raw[0] : null)
//       : (raw && typeof raw === "object" && Object.keys(raw).length > 0 ? raw : null);
//     setDeliveryProfile(profile);
//     const reg = profile?.isRegistered === true;
//     const st = (profile?.status || "").toLowerCase();
//     setIsRegistered(reg);
//     setPartnerStatus(st);
//     if (reg) {
//       setShowNotificationModal(true); 
//     } else {
//       setShowInterestModal(true);
//     }
//   } catch (err) {
//     console.error("Error fetching profile:", err);
//     setShowInterestModal(true);
//   } finally {
//     setTimeout(() => { clickLock.current = false; }, 200);
//   }
// };

// const handleConfirmInterest = () => {
//   if (selectedOption === "yes") {
//     setShowInterestModal(false);
//     navigate(`/deliveryPartner/${userType}/${userId}`);
//   } else {
//     setShowInterestModal(false);
//   }
// };

// useEffect(() => {
//   const summary = CartStorage.grandSummary();
//   setCartSummary(summary);
// }, []);

// const handleUpdatePaymentMethod = async () => {
//     try {
//   const payload = {
//     ...cartData,
//     customerName: fullName,
//     address: address, 
//     state: state,
//     district: city,
//     zipCode: pinCode,
//     customerPhoneNumber: mobileNumber,
//     id: id,
//     userId: userId, 
//     martId: martId,
//     date: date,
//     grandTotal: grandTotal,
//     totalItemsSelected: totalItemsSelected,
//     status: status,
//     paymentMode: paymentMode,
//     utrTransactionNumber: transactionDetails,
//     transactionNumber: transactionNumber,
//     transactionStatus: transactionStatus,
//     paidAmount: paidAmount,
//     AssignedTo: assignedTo,
//     DeliveryPartnerUserId: deliveryPartnerUserId,
//     latitude: latitude,
//     longitude: longitude,
//     isPickUp: true,
//     isDelivered: false,    
//   };

//     let response = await fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/UpdateProductDetails/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to Update Technician.');
//     }
//     window.location.href = `/deliveryTracking/${id}`;
//   } catch (error) {
//     console.error('Error:', error);
//     window.alert('Failed to Update Technician. Please try again later.');
//   }
// };

// const handleCategoryClick = async (category) => {
//   const { value } = category; 
//   try {
//     setSelectedCategory(category);
//     setProducts([]);
//     setError("");
//     const encodedCategory = encodeURIComponent(value);
//     localStorage.setItem("encodedCategory", encodedCategory);
//     navigate(`/offers/${userType}/${userId}`, {
//       state: { encodedCategory }, 
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     setProducts([]);
//     setError(`Oops! No products found for ${value} category.`);
//   }
// };

// const handleGroceryCategoryClick = (category) => {
//   const { value } = category;
//   const mobileNumber = profile?.mobileNumber || "";
//   const encodedCategory = encodeURIComponent(value);
//   localStorage.setItem("encodedCategory", encodedCategory);
//   if (value === "Kitchenware Appliances") {
//     navigate(`/grocery/${userType}/${userId}`, {
//       state: { mobileNumber },
//     });
//     return;
//   }
//   if (value === "Electrical Products" || value === "Plumbing Products") {
//     navigate(`/martHomeAppliances/${userType}/${userId}`, {
//       state: { applianceType: value }, 
//     });
//     return;
//   }
  
//   if (value === "Unbeatable Offers") {
//     navigate(`/groceryOffers/${userType}/${userId}`, {
//       state: { mobileNumber },
//     });     
//   } else {
//     navigate(`/grocery/${userType}/${userId}`, {
//       state: { mobileNumber },
//     });
//   }
// };

// const handleDressCategoryClick = async (category) => {
//   const { value } = category;
//   try {
//     setSelectedCategory(category);
//     setDress([]);
//     setError("");
//     const encodedCategory = encodeURIComponent(value);
//     localStorage.setItem("encodedCategory", encodedCategory);
//     navigate(`/lakshmiCollections/${userType}/${userId}`, {
//       state: { encodedCategory },  
//     });
//   } catch (error) {
//     console.error("Error fetching collections:", error);
//     setGrocery([]);
//     setError(`Oops! No collections found for ${value} category.`);
//   }
// };    
//         useEffect(() => {
//           const fetchAllTickets = async () => {
//             try { 
//               const [ticketResponse, productResponse, technicianResponse, groceriesResponse, lakshmiResponse] = await Promise.all([
//                 fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=raiseTicket`),
//                 fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=buyProduct`),
//                 fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=bookTechnician`),
//                 fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=mart`),
//                 fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=collections`),
//               ]);      
//               if (!ticketResponse.ok || !productResponse.ok || !technicianResponse || !groceriesResponse || !lakshmiResponse) {
//                 throw new Error("Failed to fetch ticket, product and technician data");
//               }
//               const ticketData = await ticketResponse.json();
//               const productData = await productResponse.json();
//               const technicianData = await technicianResponse.json(); 
//               const groceryData = await groceriesResponse.json(); 
//               const collectionsData = await lakshmiResponse.json(); 
//               const groceryOpenTickets = Array.isArray(groceryData)
//               ? groceryData.filter(item => String(item?.status).toLowerCase() === "open")
//               : [];
//               const collectionOpenTickets = Array.isArray(collectionsData)
//               ? collectionsData.filter(item => String(item?.status).toLowerCase() === "open")
//               : [];
//               setAllTickets([...ticketData, ...productData, ...technicianData, ...groceryOpenTickets, ...collectionOpenTickets]);
//             } catch (error) {
//               console.error("Error fetching ticket, product data:", error);
//             } finally {
//               setLoading(false);
//             }
//           };
//           fetchAllTickets();
//         }, [userId]);

//         const calculateCashback = (ticket) => {
//   if (!ticket || !ticket.categories) return 0;

//   let totalAmountFromApi = 0;

//   ticket.categories.forEach((cat) => {
//     if (cat.totalAmount != null) {
//       totalAmountFromApi += Number(cat.totalAmount) || 0;
//     } else if (Array.isArray(cat.products)) {
//       cat.products.forEach((p) => {
//         const price = Number(p.afterDiscountPrice || 0);
//         const qty = Number(p.noOfQuantity || 0);
//         totalAmountFromApi += price * qty;
//       });
//     }
//   });

//   const grandTotalNumeric = Number(ticket.grandTotal) || 0;
//   const cashback = totalAmountFromApi - grandTotalNumeric;
//   if ((cashback >= 49 && cashback <= 51) ||(cashback >= 99 && cashback <= 101) || (cashback >= 199 && cashback <= 201)) {
//     return cashback;
//   }
//   return 0;
// };

// const handleCustomerCareCall = () => {
//     window.location.href = "tel:6281198953";
//   };

//         const handleViewDetails = (ticket) => {
//           setSelectedTicket(ticket);
//           const cb = calculateCashback(ticket);
//           setCashbackAmount(cb);
//           setShowModal(true);
//         };
      
//         useEffect(() => {
//           if (profile?.mobileNumber) {
//             localStorage.setItem('customerMobileNumber', profile.mobileNumber);
//           }
//         }, [profile]);        

//   const handleMoreIconClick = () => {
//     setShowProfile(!showProfile);
//   };

//       useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 768);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//       }, []);
      
//       useEffect(() => {
//         const handleClickOutside = (event) => {
//           if (!document.getElementById("dropdown-container")?.contains(event.target)) {
//           }
//         };
//         document.addEventListener("click", handleClickOutside);
//         return () => document.removeEventListener("click", handleClickOutside);
//       }, []);

//       useEffect(() => { 
//         const handleCloseMenuOnClickOutside = (event) => {
//           if (menuRef.current && !menuRef.current.contains(event.target)) {
//             setShowMenu(false);
//           }
//         };
//         document.addEventListener("mousedown", handleCloseMenuOnClickOutside);
//         return () => document.removeEventListener("mousedown", handleCloseMenuOnClickOutside);
//       }, []);
            
//       useEffect(() => {
//         if (!userId || !userType) return;
//         const fetchProfileData = async () => {
//           try {
//             let apiUrl = "";
//             if (userType === "customer") {
//               apiUrl = `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`;
//             }
//             if (!apiUrl) return;
//             const response = await axios.get(apiUrl);
//             setProfile(response.data); 
//             setCategory(response.data.category);
//             setDistrict(response.data.district);
//             setZipCode(response.data.zipCode);
//             setFullName(response.data.fullName);
//             if (response.data.photoAttachmentId) {
//               fetchImageUrl(response.data.photoAttachmentId);
//             }
//               setMenuList(getMenuList(userType, userId, response.data.category, response.data.district, response.data.zipCode, response.data.fullName, isMobile));
//           } catch (error) {
//             console.log("Error Fetching Data:", error)
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchProfileData();
//       }, [userType, userId, isMobile]);
      
//       useEffect(() => {
//         if (category && district) {
//           setMenuList(getMenuList(userType, userId, category, district, zipCode, fullName, isMobile));
//         }
//       }, [category, district, userType, userId, zipCode, fullName, isMobile]);

//       useEffect(() => {
//   window.addEventListener("storage", () => {
//     setCartImages({});
//   });
//   return () => window.removeEventListener("storage", () => {});
// }, []);

// const fetchImageUrl = async (photoId) => {
//   try { 
//     if (!photoId) return;
//     const response = await axios.get(
//       `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=${photoId}`
//     );
//     if (response.status === 200 && response.data.imageData) {
//       const imageUrl = `data:image/jpeg;base64,${response.data.imageData}`;
//       setProfileImage(imageUrl);
//     }
//   } catch (error) {
//     console.error("Error fetching image:", error);
//   }
// };
  
//  if (loading) {
//   return <div></div>; 
// }

// const updateLocalStorageCart = (product, qty) => {
//   const stored = JSON.parse(localStorage.getItem("allCategories")) || [];
//   const categoryName = product.category || "Search Items";
//   let category = stored.find(c => c.categoryName === categoryName);
//   if (!category) {
//     category = { categoryName, products: [] };
//     stored.push(category);
//   }
  
//   const index = category.products.findIndex(
//     p => (p.productId || p.id) === product.id
//   );

//   if (qty <= 0) {
//     if (index !== -1) category.products.splice(index, 1);
//   } else {
//     const item = {
//       productId: product.id,
//       productName: product.name || product.productName,
//       qty,
//       mrp: product.mrp,
//       discount: product.discount,
//       afterDiscountPrice: product.afterDiscount,
//       stockLeft: product.stockLeft,
//       units: product.units,
//       code: product.code,
//       image: product.imageFile || product.images?.[0] || "",
//     };

//     if (index === -1) {
//       category.products.push(item);
//     } else {       
//       category.products[index] = item;
//     }
//   }

//   localStorage.setItem("allCategories", JSON.stringify(stored));
// };

//   return (
//     <>
//     <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm" 
//       style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1000 }}>
//        {isMobile ? (
//           <div onClick={handleMoreIconClick} style={{ cursor: "pointer" }}>
//           <MenuIcon className="floating-menuIcon" fontSize="medium" />
//         </div>
//        ) : (null)}
//        <img src={Logo} alt="Handy Man Logo" className="logo-img" />
//         <div className="spacer"></div>
//         <div className="d-flex align-items-center w-100">
//     </div>
//         <div className="hdr_icns d-flex align-items-center ">
//       <div id="dropdown-container" className="dropdown-container" style={{ position: "relative" }}>
//         <div className="d-flex align-items-center">
//          {/* Customer Care Number */}
//           <div
//                 className="d-flex align-items-start"
//                 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: "pointer" }}
//                 onClick={handleCustomerCareCall}
//               >
//                 <AddIcCallIcon style={{ color: "green", fontSize: "30px" }} />
//                 <small                  
//                   style={{
//                     display: "flex",      
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 ></small>
//               </div>

//   {/* Profile Image */}
//   <div className="profile-img-wrapper">
//     <img
//       src={profileImage}
//       alt="Profile"
//       className="profile-img"
//     />
//   </div>
// </div>
// </div>
//     </div>
//     </header>
//       <div className="pt-1 mt-100"> 
//     <div
//       className={`container m-1`}
//       style={{
//         padding: isMobile ? "8px" : "0px",
//         borderRadius: "5px",
//         minHeight: "100vh",
//         paddingTop:isMobile ? "70px" : "0px"
//       }}
//     >
//       <div className="row">
//         <div className="col-md-3">
//         <div>
//           {/* Desktop Profile Details */}
//       {!isMobile ? (
//                    <div className="profile-card">
//                      <div className="profile-img-container "> 
//                    <div className="profile-container"> 
//              <div className="profile-info">
//                <div className="webprofile-section">
//                <div className="text-primary fw-bold cust-name">Welcome  <small className="text-dark" style={{fontFamily: "Poppins, sans-serif"}}>{profile.fullName}{" "}</small></div>
//                    <div className="fw-bold fs-4">Lakshmi Sai Service Providers</div>
//                    <div className="webprofile-img-wrapper">
//                      <img src={profileImage} alt="Profile" 
//                      className="webprofile-img" 
//                      />
//                      <input
//                        type="file"
//                        ref={fileInputRef}
//                        style={{ display: "none" }}
//                        accept="image/*"
//                      />
//                     </div>
//                  <div className="label fw-bold fs-5">Name</div>
//                    <p className="value">
//                      {profile.fullName}
//                    </p>
//                   <hr />
//                  <div className="label fw-bold mt-0 fs-5">Mobile</div>
//                  <p className="value">{profile.mobileNumber}</p>
//               <hr />
//                  <div className="label fw-bold mt-0 fs-5">Address</div>
//                  <p className="value">{profile.address}</p>
//                <hr />
//                <p className="logout-btn m-1" onClick={() => window.location.href = "/loginnew"}>
//                  <LogoutIcon />
//                  <span className="fs-5">Logout</span>
//                </p>
//              </div>
//            </div>
//            </div>
//            </div>
//                    </div>
//       ) : null}
//             </div> 
//           {/* Mobile Profile Details */}
//            {showProfile && !showInterestModal && !showNotificationModal && (
//               <div
//                 className="floating-profile-menu"
//                 style={{
//                   position: 'fixed',
//                   top: '60px',
//                   left: '10px',
//                   backgroundColor: '#fff',
//                   zIndex: 1200,
//                   borderRadius: '8px',
//                   boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
//                   padding: '10px',
//                   width: '180px'
//                 }}
//               >
//                 <div className="profile-info">
//                   <div className="fw-bold">Name</div>
//                   <p className="mb-2">{profile.fullName}</p>
//                   <hr style={{ margin: '4px 0' }} />
//                   <div className="fw-bold">Mobile</div>
//                   <p className="mb-2">{profile.mobileNumber}</p>
//                   <hr style={{ margin: '4px 0' }} />
//                   <div className="fw-bold">Address</div>
//                   <p className="mb-2">{profile.address}</p>
//                   <hr style={{ margin: '4px 0' }} />
//                      <div
//                       className="d-flex align-items-start"
//                       style={{ cursor: "pointer" }}
//                       onClick={handleDeliveryPartnerClick}
//                     >
//                       <DeliveryDiningIcon sx={{ fontSize: 24, marginRight: "4px" }} />
//                       <small
//                         style={{
//                           fontSize: "12px",
//                           fontFamily: "Poppins",
//                           lineHeight: "28px",
//                         }}
//                       >
//                         Delivery Partner
//                       </small>
//                     </div>
//                     <hr style={{ margin: '4px 0' }} />
//                     <div className="d-flex align-items-start" style={{ cursor: "pointer" }} onClick={() => document.getElementById('myTicketsSection')?.scrollIntoView({ behavior: 'smooth' })}>
//                       <ConfirmationNumberIcon sx={{ fontSize: 24, marginRight: '8px' }} />
//                       <small style={{ fontSize: "12px", fontFamily: "Poppins", lineHeight: "28px" }}>My Tickets</small>
//                     </div>
//                     <hr style={{ margin: '4px 0' }} />
//                   <div className="d-flex align-items-center logout-btn" style={{ cursor: 'pointer' }} onClick={() => window.location.href = "/loginnew"}>
//                     <LogoutIcon className="me-2" />
//                     <span>Logout</span>
//                   </div>
//                 </div>
//               </div>                         
//             )}
//          </div> 
//        {/* Interest Modal */}
// <Modal show={showInterestModal} onHide={() => setShowInterestModal(false)} centered>
//   <Modal.Header closeButton>
//     <Modal.Title>Are you interested in joining as a delivery partner?</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <div className="d-flex flex-column">
//       <label>
//         <input
//           type="radio"
//           name="interest"
//           value="yes"
//           checked={selectedOption === "yes"}
//           onChange={(e) => setSelectedOption(e.target.value)}
//         />{" "}
//         Yes
//       </label>
//       <label>
//         <input
//           type="radio"
//           name="interest"
//           value="no"
//           checked={selectedOption === "no"}
//           onChange={(e) => setSelectedOption(e.target.value)}
//         />{" "}
//         No
//       </label>
//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowInterestModal(false)}>
//       Cancel
//     </Button>
//     <Button
//       variant="primary"
//       onClick={handleConfirmInterest}
//       disabled={!selectedOption}
//     >
//       Continue
//     </Button>
//   </Modal.Footer>
// </Modal>

// {/* Notification Modal */}
// <Modal
//   show={showNotificationModal}
//   onHide={() => setShowNotificationModal(false)}
//   centered>
//   <Modal.Header closeButton>
//     <Modal.Title>Notification</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     {isRegistered && partnerStatus === "open" ? (
//       loading ? (
//         <p>Loading tickets…</p>
//       ) : groceryData.length === 0 ? (
//         <p>No tickets found.</p>
//       ) : (
//         <div className="notification-list">
//           {groceryData.map((t) => (
//             <div key={t.id || t.martId} className="notification-item mb-3 p-2 border rounded">
//               <div className="notification-header">
//                 <strong>Grocery ID: </strong> {t.martId}
//               </div>
//               <div>
//                 <strong>Customer Name:</strong> {t.customerName}
//               </div>
//               <div>
//                 <strong>Address:</strong>{" "}
//                 {[t.address, t.district, t.state, (t.zipCode || t.pinCode), t.customerPhoneNumber]
//                   .filter(Boolean)
//                   .join(", ")}
//               </div>
//               <div className="notification-date">
//                 <strong>Payment Mode:</strong> {t.paymentMode}
//               </div>
//               {t.status && (
//                 <div>
//                   <strong>Status:</strong> {t.status}
//                 </div>
//               )}

//               {/* ✅ IsPickup checkbox for this ticket */}
//               <div className="form-check mt-2">
//                 <input
//                   id={`isPickup-${t.id || t.martId}`}
//                   className="form-check-input border-dark"
//                   type="checkbox"
//                   checked={!!t.isPickup}
//                   onChange={(e) => {
//                     const updated = groceryData.map((g) =>
//                       g.id === t.id || g.martId === t.martId
//                         ? { ...g, isPickup: e.target.checked }
//                         : g
//                     );
//                     setGroceryData(updated);
//                   }}
//                 />
//                 <label
//                   className="form-check-label"
//                   htmlFor={`isPickup-${t.id || t.martId}`}
//                 >
//                   Is Pickup
//                 </label>
//               </div>

//               {/* Go to Maps */}
//               {t.isPickup && t.latitude && t.longitude && (
//                 <div className="mt-1 text-end">
//                   <a
//                     href={`/deliveryTracking/${t.id}?lat=${t.latitude}&lng=${t.longitude}&isPickup=true`}
//                     className="link-primary"
//                     onClick={() => {
//                       setShowNotificationModal(false);
//                       handleUpdatePaymentMethod(t); 
//                     }}
//                   >
//                     Go to Maps
//                   </a>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )
//     ) : (
//       <p>You are already registered, pending for admin approval.</p>
//     )}
//   </Modal.Body>
// </Modal>

//         {isMobile && (
//             <div>
//                <div style={{ padding: "12px", maxWidth: "1100px", margin: "auto" }}>
//       {/* 🔍 SEARCH + 🎤 MIC */}
//       <div style={{ position: "relative", marginBottom: "12px" }}>
//         <input
//           className="form-control ps-5 pe-5"
//           placeholder={placeholderSuggestions[placeholderIndex]}
//           style={{border: "2px solid #000", borderRadius: "6px"}}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
  
//         <SearchIcon
//           style={{ 
//             position: "absolute",
//             left: "12px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             color: "#000",
//           }}
//         />

//          {/* 🎤 Better Mic Button */}
//   <button
//     onClick={startVoiceSearch}
//     title="Speak product name"
//     style={{
//       position: "absolute",
//       right: "10px",
//       top: "50%",
//       transform: "translateY(-50%)",
//       width: "40px",
//       height: "40px",
//       borderRadius: "50%",
//       border: listening
//         ? "2px solid red"
//         : "2px solid transparent",
//       background: listening ? "rgba(255,0,0,0.1)" : "transparent",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       transition: "0.2s ease-in-out",
//     }}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       height="22"
//       viewBox="0 0 24 24"
//       width="22"
//       fill={listening ? "red" : "#000"}
//     >
//       <path d="M12 14a2 2 0 0 0 2-2V6a2 2 0 1 0-4 0v6a2 2 0 0 0 2 2zm5-2a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 9c-1.1 0-2-.9-2-2h4a2 2 0 0 1-2 2z" />
//     </svg>
//   </button>
// </div>
//  {/* 📦 PRODUCTS */}
//       {loading && <p>Loading products...</p>}
//       <div className="grocery-row flex flex-wrap gap-1" style={{marginBottom: "5px"}}>
//        {displayProducts.map((product) => {
//         const maxQty = getMaxAllowedQty(product);   
//         const isOutOfStock = maxQty <= 0;
//           return (
//             <div
//         key={product.id}
//         className="w-[200px] flex flex-col p-2 bg-white rounded shadow-sm border position-relative"
//         style={{ minHeight: "250px", opacity: isOutOfStock ? 0.6 : 1 }}
//       >
//         <div className="d-flex flex-row justify-content-between absolute top-0 left-0 w-full">
//           {Number(product.discount) > 0 && !isOutOfStock && (
//             <span className="discount-badge">
//               {Math.round(Number(product.discount))}%
//             </span>
//           )}
//   </div>
//   {/* Product Image */}
//   <div
//     className="d-flex justify-content-center align-items-center position-relative"
//     style={{ height: "90px" }}
//   >
//     {imageUrls[product.id] ? (
//       <img
//         src={cartImages[product.id] || imageUrls[product.id]}
//         alt={product.name}
//         decoding="async"
//         loading="eager"
//         fetchpriority="high"
//         style={{
//           maxHeight: "80px",
//           maxWidth: "100%",
//           objectFit: "contain",
//           cursor: isOutOfStock ? "not-allowed" : "pointer",
//           borderRadius: "6px",
//         }}
//         onClick={() => !isOutOfStock && handleImageClick(
//       cartImages[product.id] || imageUrls[product.id],
//       product
//     )}/>
//     ) : (
//       <span className="text-muted small">Loading Image</span>
//     )}

//     {isOutOfStock && (
//       <div
//         className="position-absolute d-flex justify-content-center align-items-center"
//         style={{
//           top: 0, left: 0, width: "100%", height: "100%",
//           background: "rgba(255,255,255,0.75)", borderRadius: "6px", zIndex: 2,
//         }}
//       >
//         <span
//           style={{
//             fontWeight: 500, backgroundColor: "grey", color: "white",
//             fontSize: "10px", borderRadius: "6px", margin: "1px", padding: "2px",
//           }}
//         >
//           Out of Stock
//         </span>
//       </div>
//     )}
//   </div>

//   {/* Product Name */}
//   <h6
//     className="text-start fw-bold m-0"
//     style={{
//       fontSize: "11px",
//       display: "-webkit-box",
//       WebkitLineClamp: 3,
//       WebkitBoxOrient: "vertical",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       lineHeight: "1.2em",
//       maxHeight: "3.6em",
//     }}
//   >
//     {product.name}
//   </h6>

//   {/* Price/MRP/Units — ONLY when in stock */}
//   {!isOutOfStock && (
//     <div className="text-start m-0" style={{ fontSize: "11px" }}>
//       {product.afterDiscount != null && (
//         <b className="text-success me-2">
//           ₹{Math.round(Number(product.afterDiscount))}
//         </b>
//       )}
//       {product.mrp != null && <s className="text-muted">₹{product.mrp}</s>}
//       {product.units && (
//         <b className="text-success" style={{ marginLeft: "5px" }}>
//           {product.units}
//         </b>
//       )}
//     </div>
//   )}

//   {Number(product.limit) > 0 && (
//   <div
//     style={{
//       fontSize: "10px",
//       marginBottom: "5px",
//       color: "#d32f2f",
//     }}
//   >
//     Max {Number(product.limit)} Per User
//   </div>
// )}

//   {/* Checkbox */}
//   {!isOutOfStock && (
//     <div style={{ position: "absolute", bottom: "8px", left: "8px" }}>
//       <input
//         type="checkbox"
//         className="border-dark"
//         checked={cart[product.id] > 0}
//         readOnly
//       />
//     </div>
//   )}

// {/* Add/Counter — ONLY when in stock */}
// {!isOutOfStock && (
//   <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
//     {cart[product.id] ? (
//       <div
//         className="d-flex align-items-center justify-content-between"
//         style={{
//           backgroundColor: "green",
//           color: "white",
//           borderRadius: "8px",
//           padding: "2px",
//           minWidth: "60px",
//         }}
//       >
//         {/* ➖ DECREMENT */}
//         <button
//           className="btn btn-sm p-0 text-white"
//           onClick={() => handleDecrementClick(product)}
//         >
//           –
//         </button>
//         <span className="fw-bold">{cart[product.id]}</span>
//         {/* ➕ INCREMENT */}
//         <button
//           className="btn btn-sm p-0 text-white"
//           disabled={(cart[product.id] || 0) >= maxQty}
//           onClick={() => handleIncrement(product)}
//         >
//           +
//         </button>
//       </div>
//     ) : (
//       <button
//         className="btn fw-bold"
//         style={{
//           border: "1px solid green",
//           color: "green",
//           backgroundColor: "#f6fff6",
//           borderRadius: "8px",
//           padding: "2px 12px",
//           fontSize: "13px",
//         }}
//         onClick={() => handleAddClick(product)}
//       >
//         ADD
//       </button>
//     )}
//   </div>
// )}
// </div>
//     );
//   })}
// {/* Cart Bar */}               
// {(() => {
//   const readAllCategories = () => {
//     if (typeof window === "undefined") return []; 
//     try {
//       const raw = localStorage.getItem("allCategories");
//       if (!raw) return [];
//       const parsed = JSON.parse(raw);
//       const arr = Array.isArray(parsed) ? parsed : [parsed];
//       return arr
//         .filter(Boolean)
//         .map((cat) => ({
//           ...cat,
//           products: Array.isArray(cat?.products) ? cat.products : [],
//         }));
//     } catch (e) {
//       console.error("Invalid JSON in allCategories:", e);
//       return [];
//     }
//   };
//   const allCategories = readAllCategories();
//   const summary = allCategories.reduce(
//     (acc, cat) => {
//       for (const p of cat.products) {
//         const qty = Number(p?.qty) || 0;
//         if (!qty) continue;
//         const price =
//           Number(p?.afterDiscountPrice ?? p?.price ?? p?.finalPrice ?? 0) || 0;
//         acc.items += qty;
//         acc.total += price * qty;
//       }
//       return acc;
//     },
//     { items: 0, total: 0 }
//   );
//   const items = summary.items;
//   const total = Math.round(summary.total);
//   return items > 0 ? (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "40px",
//         left: 0,
//         width: "100%",
//         backgroundColor: "green",
//         color: "white",
//         padding: "12px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         fontWeight: "bold",
//         zIndex: 2000,   
//         borderRadius: "20px",
//         marginTop: "0px",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         🛒
//         <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
//           <span style={{ fontSize: "12px" }}>{items} items</span>
//           <span style={{ fontSize: "12px" }}>₹{total}</span>
//         </div>
//       </div>
//       <button
//         type="button"
//         className="text-white fw-bold d-flex align-items-center gap-1"
//         style={{
//           fontSize: "12px",
//           cursor: "pointer",
//           background: "transparent",
//           border: "none",
//         }}
//         onClick={() => navigate(`/groceryCart/${userType}/${userId}`)}
//       >
//         View Cart →
//       </button>
//     </div>
//   ) : null;
// })()}
//       </div>
//       <Modal show={showZoomModal} onHide={() => { setShowZoomModal(false); setZoomProduct(null); }} centered>
//         <button
//           className="close-button text-end"
//           onClick={() => { setShowZoomModal(false); setZoomProduct(null); }}
//         >
//           &times;
//         </button>
//         <Modal.Body className="text-center">     
//           <div className="zoom-container">
//             <img src={zoomImage} alt={zoomProduct?.name || "Zoomed Product"} className="zoom-image" />
//           </div>
//           <h6 className="text-start fw-bold" style={{ fontSize: "12px" }}>
//             {zoomProduct?.name || ""}
//           </h6>
//         {zoomProduct?.afterDiscount != null && (
//             <p className="text-start" style={{ fontSize: "12px" }}>
//               <b className="text-success me-2">₹{Math.round(Number(zoomProduct.afterDiscount))}</b>
//               {zoomProduct?.mrp ? <s className="text-muted">₹{zoomProduct.mrp}</s> : null}
//             </p>
//           )}
//         </Modal.Body>
//       </Modal>
//               <div className="text-primary fw-bold fs-5">
//                 Welcome{" "}
//                 <small className="text-dark">
//                   {profile.fullName}
//                 </small>
//               </div>
//             </div>
//             </div>
//           )}
    
//           {/* Mobile Dashboard Icons */}
//           {isMobile && (   
//   <div
//     className="mobile-top-icons position-fixed start-0 end-0 bg-white border-bottom shadow-sm"
//     style={{
//       top: '80px',
//       zIndex: 1050,
//       height: '90px',
//       padding: '8px',
//       overflowY: 'hidden',
//     }}
//   >
//     <div className="d-flex flex-wrap justify-content-around align-items-center">
//       {menuList.map((menu, index) => (
//         <a
//           key={index}
//           href={menu.TargetUrl}
//           className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-dark ms-1"
//           style={{ minWidth: '10px', flex: '0 0 auto' }}
//         >
//           <div
//             style={{
//               backgroundColor: '#ffc107', 
//               borderRadius: '50%',        
//               padding: '8px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '40px',
//               height: '40px',
//               boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
//             }}
//           >
//             {React.cloneElement(menu.MenuIcon, { sx: { fontSize: 22, color: '#000' } })}
//           </div>
//           <small
//             style={{
//               fontSize: '12px',
//               fontFamily: "Roboto", 
//               fontWeight: 'bold',
//               textAlign: 'center',
//               lineHeight: '14px',
//               marginTop: '4px',
//               color: '#333',
//               letterSpacing: '0.5px',
//             }}
//           >
//             {menu.MenuTitle.split(' ').map((word, idx) => (
//               <React.Fragment key={idx}>
//                 {word}
//                 {idx !== menu.MenuTitle.split(' ').length - 1 && <br />}
//               </React.Fragment>
//             ))}
//           </small>
//         </a>
//       ))}
//     </div>
//   </div>
// )}
  
//         {/* Address with Location */}
//         <div className="col-md-9">
//           {/* HOME APPLIANCES */}
//     <div
//       className="shadow-lg rounded-4 p-3 mb-2"
//       style={{
//       color: "#000",
//       }}
//     >
//       <h6 className="fw-bold text-center mb-2" style={{ letterSpacing: "1px" }}>
//         Home Appliances
//       </h6>
//       <div className="d-flex justify-content-around align-items-center">
//         {[
//           {
//             label: "Electrical",
//             value: "Electrical Products",
//             image: HomeElectricalImg,
//           },
//           {
//             label: "Plumbing",
//             value: "Plumbing Products",
//             image: HomePlumbingImg,
//           },
//           {
//             label: "Kitchenware",
//             value: "Kitchenware Appliances",
//             image: KitchenImg,
//           },
//         ].map((item) => (
//           <div
//             key={item.value}
//             onClick={() => handleGroceryCategoryClick(item)}
//             style={{
//               cursor: "pointer",
//               textAlign: "center",
//               width: "90px",
//             }}
//           >
//               <img
//                 src={item.image}
//                 alt={item.label}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             <small
//               className="d-block mt-2 fw-semibold"
//               style={{ fontSize: "12px" }}
//             >
//               {item.label}
//             </small>
//           </div>
//         ))}
//       </div>
//     </div>

// <div className="container"  style={{
//    minHeight: "100vh",
//   //  marginTop: `${HEADER_HEIGHT}px`,
//    paddingTop: isMobile ? `${MOBILE_PADDING_TOP}px` : "0px",   
//   }}>
  
//   <div className="shadow-lg p-2 rounded-5 text-center bg-transparent border-0">
//     <h5 className="fw-bold mb-1" style={{color: "#ff5722", fontSize: "20px"}}>
//       Lakshmi Mart  
//     </h5> 

// <div className="row row-cols-3 row-cols-md-6 g-1">
//   {firstCategories.map((cat) => (
//     <div
//        className="col"
//         key={cat.label}
//         onClick={() => handleGroceryCategoryClick(cat)}
//         style={{ cursor: "pointer" }}   
//     >
//       <div
//           className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
//           style={{
//             height: isMobile ? "130px" : "140px",
//             width: isMobile ? "90px" : "120px",
//             cursor: "pointer",
//             padding: "6px",
//             margin: "5px",
//             opacity: 1, 
//             pointerEvents: "auto", 
//           }}
//         >
//           <img
//             src={cat.image}
//             alt={cat.label}
//             style={{
//               height: "80px",
//               width: "80px",
//               borderRadius: "8px",
//               marginTop: "2px",
//               objectFit: "cover",
//             }}
//           />
//           <span
//             style={{
//               fontSize: "11px",
//               fontWeight: "500",
//               marginTop: "6px",
//               minHeight: "24px", 
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               lineHeight: "1.2",
//             }}
//           >
//             {cat.label}
//           </span>
//         </div>
//     </div>
//   ))}
// </div>
              
// <div className="row row-cols-3 row-cols-md-5 g-1">
//   {secondCategories.map((cat) => (
//     <div
//       className="col"
//       key={cat.label}
//       onClick={() => handleGroceryCategoryClick(cat)}
//       style={{ cursor: "pointer" }}
//     >
//       <div
//           className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
//           style={{
//             height: isMobile ? "120px" : "140px",
//             width: isMobile ? "90px" : "120px",
//             cursor: "pointer",
//             padding: "6px",
//             margin: "5px",
//             opacity: 1, 
//             pointerEvents: "auto", 
//           }}
//         >
//           <img
//             src={cat.image}
//             alt={cat.label}
//             style={{
//               height: "80px",
//               width: "80px",
//               borderRadius: "8px",
//               marginTop: "2px",
//               objectFit: "cover",
//             }}
//           />
//           <span
//             style={{
//               fontSize: "11px",
//               fontWeight: "500",
//               marginTop: "5px",
//               minHeight: "24px", 
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",

//               textAlign: "center",
//               lineHeight: "1.2",
//             }}
//           >
//             {cat.label}
//           </span>
//         </div>
//     </div>
//   ))}
// </div>
//   </div>
  
//   {/* Home Products Section */}
//   <div className="shadow-lg p-2 mb-1 rounded-5 bg-transparent border-0">
//     <h5 className="text-center fw-bold mb-3" style={{color: "#ff5722", fontSize: "20px"}}>Home Products</h5>
//     <div className="row row-cols-3 row-cols-md-5 g-2 align-items-stretch">
//       {categories.map((cat) => (
//         <div
//           className="col"
//           key={cat.label}
//           onClick={() => handleCategoryClick(cat)}
//         >
//           <div
//             className="card border-0 shadow-sm text-center"
//             style={{
//               height: isMobile ? "120px" : "140px",
//               width: isMobile ? "90px" : "120px",
//               cursor: "pointer",
//               padding: "8px",
//               marginTop: "5px",
//             }}
//           >
//             <img
//               src={cat.image}
//               alt={cat.label}
//               style={{
//                 height: "70px",
//                 width: "70px",
//                 borderRadius: "8px",
//                 objectFit: "cover",
//               }}
//             />
//             <span
//               style={{
//                 fontSize: "11px",        
//                 fontWeight: "500",
//                 marginTop: "5px",
//                 minHeight: "24px", 
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textAlign: "center",
//                 lineHeight: "1.2",
//               }}
//             >
//               {cat.label}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>

//    {/* Collections Section */}
//   <div className="shadow-lg p-2 rounded-5 text-center bg-transparent border-0">
//    <span
//    style={{
//     background: "linear-gradient(45deg, #ff4081, #ff9800, #ff5722)",
//     backgroundClip: "text",             
//     WebkitBackgroundClip: "text",       
//     color: "transparent",              
//     WebkitTextFillColor: "transparent",    
//     fontSize: "20px",
//     fontWeight: "bold",
//     fontFamily: "'Poppins', sans-serif",
//     display: "inline-block",            
//   }}
// >
//   Lakshmi Collections 
// </span>
//     <div className="row row-cols-3 row-cols-md-5 g-2">
//       {collectionsCategories.map((cat) => (
//         <div className="col" key={cat.label}  
//         onClick={() => handleDressCategoryClick(cat)}
//         >
//           <div
//             className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
//             style={{
//               height: isMobile ? "120px" : "140px",
//               width: isMobile ? "90px" : "120px",
//               cursor: "pointer",
//               padding: "8px",
//               margin: "5px",
//             }}
//           >  
//             <img
//               src={cat.image}
//               alt={cat.label}
//               style={{
//                 height: "80px",
//                 width: "80px",
//                 borderRadius: "8px",
//                 marginTop: "2px",
//                 objectFit: "cover",
//               }}
//             />
//             <span
//               style={{
//                 fontSize: "11px",
//                 fontWeight: "500",
//                 marginBottom: "3px",
//                 marginTop: "5px",
//                 minHeight: "24px", 
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textAlign: "center",
//                 lineHeight: "1.2",
//               }}
//             >
//               {cat.label}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//   {/* Dashboard Desktop */}
//      {!isMobile ? (
//   <>
//     <h5 className="mb-2 fs-4">Dashboard</h5>
//     <div className="row g-2">
//       {menuList.map((menu, index) => (
//         <div className="col-4" key={index}>
//           {menu.MenuTitle === "Delivery Partner" ? (
//             <div
//               className="text-decoration-none"
//               style={{ color: "inherit", cursor: "pointer" }}
//               onClick={handleDeliveryPartnerClick}
//             >
//               <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center">
//                 <span className="material-symbols-outlined custom-icon" style={{ fontSize: "40px" }}>
//                   {menu.MenuIcon}
//                 </span>
//                 <span className="fs-6">{menu.MenuTitle}</span>
//               </div>
//             </div>
//           ) : (
//             <a
//               href={menu.TargetUrl}
//               className="text-decoration-none"
//               style={{ color: "inherit" }}
//             >
//               <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center" style={{ cursor: "pointer" }}>
//                 <span className="material-symbols-outlined custom-icon" style={{ fontSize: "40px" }}>
//                   {menu.MenuIcon}
//                 </span>
//                 <span className="fs-6">{menu.MenuTitle}</span>
//               </div>
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
//   </>
// ) : null}

//               {/* Tickets Section */}
//               <div id="myTicketsSection" className="ticket-container">
//                 <div className="ticket-header">
//                 <h4 className="ticket-title">My Tickets</h4>
//                 </div>
//       <div className="ticket-scroll" ref={ticketScrollRef}>
//       {!loading && allTickets.length > 0 ? (
//           allTickets.map((ticket, index) => (
//               <div key={index} className={`ticket-card1 ${ticket.raiseTicketId ? "raise-ticket-bg" :ticket.martId ? "mart-ticket-bg" : ticket.lakshmiCollectionId ? "lakshmi-collection-bg" : ticket.buyProductId ? "buy-product-bg" : "book-technician-bg"}`}>
//               <div className="ticket-content">
//                 <p><strong>{ticket.raiseTicketId ? "Raise TicketId": ticket.martId ? "Order Id" : ticket.lakshmiCollectionId? "Collection Id": ticket.buyProductId? "Buy ProductId" : "Book TechnicianId"}:</strong> {ticket.raiseTicketId|| ticket.martId || ticket.lakshmiCollectionId || ticket.buyProductId || ticket.bookTechnicianId}</p>
//                 {/* Show View Order only for Mart orders */}
// {ticket.martId && (
//   <>
//   <p className="ticket-content fw-bold">
//     Order:&nbsp;
//     <button
//       type="button"
//       onClick={() => handleViewDetails(ticket)}
//       style={{
//         background: "none",
//         border: "none",
//         padding: 0,
//         color: "blue",
//         textDecoration: "underline",
//         cursor: "pointer",
//       }}
//     >
//       View Order
//     </button>
//   </p>
//   <p className="fw-bold">Grand Total : {ticket.grandTotal} /-</p>
//   </>
// )}

//                 <p><strong>{ticket.subject ? "Subject:" : ticket.productName ? "Product Name" : ticket?.categoriess?.[0]?.productName ? "Collection Name" : ticket.productName ? "Job Description" : ""}</strong> {ticket.subject || ticket.productName || ticket?.categoriess?.[0]?.productName || ticket.jobDescription}</p>
//                 <p><strong>{ticket.category || ticket.lakshmiCollectionId ? "Category:" : "Delivery in 45 minutes"} </strong> {ticket.category || ticket?.categoriess?.[0]?.categoryName || ticket.category}</p>
//                 <p><strong>Status:</strong> 
//                 <span className={ticket.status.toLowerCase()}> {ticket.status}</span>
//                 </p> 
//                 <p><strong>{ticket.assignedTo ? "Assigned To" : "Payment Mode"}: </strong> {ticket.assignedTo || ticket.assignedTo || ticket.assignedTo || `${ticket.paymentMode} or UPI`}</p>
//                 <p><strong>Date:</strong> {ticket.date ? new Date(ticket.date).toLocaleDateString('en-GB') : "N/A"}</p>
              
//                  {/* View Details Button */}
//                   {ticket.paidAmount && (
//                     <>
//                       {/* Only show these if payment is done */}
//                       <p><strong>Transaction Status:</strong> {ticket.transactionStatus}</p>
//                       <p><strong>Paid Date:</strong> {ticket.orderDate}</p>
//                     </>
//                   )}
//               </div>  
//             </div>
//           ))
//         ) : ( 
//           !loading && <p>No tickets found for this {userType}.</p>
//         )}
//       </div>
//     </div>    
//         </div>
//         </div> 
//         </div>
//         </div>
       
//         {/* First Order Cashback Modal */}
//          <Modal
//           show={showCashbackModal}
//           onHide={() => setShowCashbackModal(false)}
//           centered
//           dialogClassName="cashback-modal"
//         >
//           <Modal.Body className="cashback-modal-body text-center">
//             {showConfetti && (
//               <Confetti
//                 width={windowSize.width}
//                 height={windowSize.height}
//                 numberOfPieces={5000}
//                 recycle={false}
//               />
//             )}
//             <div className="cashback-badge">₹50 CASHBACK</div>
//             <h3 className="cashback-title mt-3 mb-2">
//               Thank You for Choosing <span>Handyman</span>!
//             </h3>
//             <p className="cashback-text mb-2">
//               You&apos;ve got <strong>₹50 cashback</strong> on your first order.
//             </p>
//             <p className="cashback-subtext mb-4">
//               Place your first order and you can avail this cashback offer on your bill.
//             </p>
//             <Button
//               variant="light"
//               className="cashback-cta-btn"
//               onClick={() => setShowCashbackModal(false)}
//             > Close
//             </Button>
//           </Modal.Body>
//         </Modal> 
  
//         {/* Modal for Mart Ticket Details */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
//         <Modal.Header
//           closeButton
//           style={{ backgroundColor: "green", color: "white" }}
//         >
//           <Modal.Title style={{ color: "white" }}>Order Details</Modal.Title>
//         </Modal.Header>

//         <Modal.Body style={{ padding: 0 }}>
//           {selectedTicket && (
//             <div>
//               {/* Table Header */}
//               <table className="table table-bordered table-striped mb-0">
//                 <thead className="table-success" style={{top: 0, zIndex: 2 }}>
//                   <tr>
//                     <th style={{ width: "10%" }}>S.No</th>
//                     <th style={{ width: "40%" }}>Product Name</th>
//                     <th style={{ width: "20%" }}>Quantity</th>
//                     <th style={{ width: "30%" }}>Price (₹)</th>
//                   </tr> 
//                 </thead>
//               </table>

//               {/* Scrollable Table Body */}
//               <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//                 <table className="table table-bordered table-striped mb-0">
//                   <tbody>
//                     {selectedTicket.categories
//                       ?.flatMap((cat) => cat.products)
//                       .map((p, idx) => (
//                         <tr key={idx}>
//                           <td style={{ width: "10%" }}>{idx + 1}</td>
//                           <td style={{ width: "40%" }}>{p.productName}</td>
//                           <td style={{ width: "20%" }}>{p.noOfQuantity}</td>
//                           <td style={{ width: "30%" }}>{Math.round(p.afterDiscountPrice)}</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//         {/* Fixed Footer */}
//        <Modal.Footer
//   style={{
//     position: "sticky",
//     bottom: 0,
//     background: "white",
//     zIndex: 2,
//     width: "100%",
//   }}
// >
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "flex-end",
//       alignItems: "center",
//       width: "100%",
//       gap: "20px",
//       flexWrap: "wrap",
//       textAlign: "right",
//     }}
//   >
//      <h5 className="mb-0">
//       Total Amount: ₹
//       {selectedTicket?.categories?.reduce(
//         (sum, category) => sum + (category.totalAmount || 0),
//         0
//       )} /-
//     </h5>

//     {cashbackAmount > 0 && (
//       <div className="fw-bold mb-0">
//         <span className="text-danger me-2">Cashback Applied:</span>
//         <span className="text-success">₹{Math.round(cashbackAmount)} /-</span>
//       </div>
//     )}
//     <h5 className="mb-0">
//       Grand Total: ₹{selectedTicket?.grandTotal} /-
//     </h5>
//   </div>
// </Modal.Footer>
//       </Modal>
//       <Modal
//   show={showOffersModal}
//   onHide={() => setShowOffersModal(false)}
//   centered
//   scrollable
// >
//   <Modal.Header closeButton>
//    <Modal.Title style={{ fontSize: "15px", fontWeight: "bold" }}>🎉Handyman Special Offer Sale!</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>   
//      {/* <ul style={{ paddingLeft: "10px" }}>
//      <li>🛍️ New Users Get  → {" "} 
//   <span style={{ color: "green", fontWeight: "bold" }}>₹50 in Wallet!</span> <br/></li>
//       </ul> */}
     
//      {/* <div className="container"> */}
//           <div className="row">
//             {offers.map((offer, index) => (
//               <div className="col-6 mb-1" key={index}>
//                 <div className="offer-card">
//                   {/* Image */}
//                   {offer.img ? (
//                     <img src={offer.img} alt="offer" className="offer-img" />
//                   ) : (
//                     <div className="offer-img-box"></div>
//                   )}
//                   {/* Text */}
//                  <div className="offer-condition">
//                   {offer.condition.split("|").map((line, i) => (
//                     <div key={i}>{highlightText(line)}</div>
//                   ))}
//                 </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         {/* </div> */}
//     <div className="text-center">
//       <b style={{ color: "red", fontSize: "14px" }}>
//         💥 Handyman App – No Extra Charges. Pay Only Product Cost After Free Home Delivery.
//       </b> <br/>
//        <b style={{ color: "green",fontSize: "13px" }}>
//         For any Queries Contact Customer Care: <span style={{color: "red", fontSize: "15px"}}>6281198953</span>
//       </b>
//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="success" onClick={() => setShowOffersModal(false)}> 
//       Shop Now 🛒
//     </Button>
//   </Modal.Footer>
// </Modal>
//          <Footer />
//         </>    
//   );
// };
// export default ProfilePage;

import React, { useState, useEffect, useRef, useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { Modal, Button} from 'react-bootstrap';
import Confetti from "react-confetti";
import ImageCache from "./utils/ImageCache";
import axios from "axios";    
import Footer from './Footer.js';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import Banner3 from './img/Above45.jpeg'; 
// import BannerVideo from './img/PongalOffers.mp4';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';       
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useNavigate, useParams } from "react-router-dom";   
import Logo from "./img/Hm_Logo 1.png";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";   
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MenuIcon from '@mui/icons-material/Menu';
import Electrical from './img/Electrical.jpeg';
import Electronics from './img/Electronics.jpeg';
import Plumbing from './img/Plumbing.jpeg';
import Hardware from './img/Hardware.jpeg';
import HomeDecor from './img/HomeDecor.jpeg';
import HomeAppliances from './img/Kitchenware.jpeg';
import BabyKidsImg from './img/BabyKids.jpeg';
import PoojaImg from './img/Pooja.jpeg';
import HairImg from './img/HairCare.jpeg';
import BathBodyImg from './img/BathBody.jpeg';
import RavvaImg from './img/RiceRavva.jpeg';
import AttaImg from './img/AttaFlours.jpeg';
import OilsImg from './img/OilDals.jpeg';
import SugarImg from './img/SugarSalt.jpeg';
import MasalaImg from './img/MasalaPickles.jpeg';
import MilkImg from './img/MilkGhee.jpeg';
import BreadsImg from './img/BreadEggs.jpeg';
import DrinkImg from './img/DrinkJuice.jpeg';
import BakeryImg from './img/BakerySweets.jpeg';
import VegetablesImg from './img/Vegetables.jpeg';
import FruitsImg from './img/Fruits.jpeg';
import DryfruitsImg from './img/Bakery.jpeg';
import SoupsImg from './img/SoupsSauces.jpeg';
import KitchenImg from './img/Kitchenware.jpeg';
import BiscuitsImg from './img/Biscuits.jpeg';
import HealthImg from './img/HealthCare.jpeg';
import SkinImg from './img/SkinFace.jpeg';
import TeaImg from './img/teacoffee.jpeg';
import NamkeenImg from './img/InstantFoodImg.jpeg';
import HouseHoldImg from './img/HouseHold.jpeg';   
import ChickenImg from './img/Chicken.jpeg';
import StationaryImg from './img/Stationary.jpeg';
import KidsImg from './img/KidsZone.jpeg';
import setkurti from './img/3pcsset.jpeg';
import kurti from './img/2pcsset.jpeg';
import { CartStorage } from "./CartStorage";
import IcecreamImg from './img/IceCreams.jpeg';
import DwakraProducts from './img/DwakraLogo.jpeg';
import UnbeatableImg from './img/MilkOffers.jpeg';
import Above45Img from './img/Above45.jpeg'; 
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import RoyalImg from './img/LMartLogo.jpeg';
import HomeElectricalImg from './img/HomeElectrical.jpeg';
import HomePlumbingImg from './img/HomePlumbing.jpeg'; 
import Poster from './img/Poster.jpeg';  
// import ReedemCode from "./ReedemCode.js";
// import Container1Img from './img/599.png';
// import Container2Img from './img/599.png';
// import Container3Img from './img/1999.png';       
// import Container4Img from './img/999.png';    
// import { appConfig } from "./config";                     

const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName, isMobile) => {
  const iconSize = isMobile ? 20  : 40;
  const customer = [
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
    }] : []),
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
    ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
    }] : []),
    ...(!isMobile ? [{MenuIcon: <DeliveryDiningIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Delivery Partner", TargetUrl: `/deliveryPartner/${userType}/${userId}`
    }] : []),
      ];
     switch (userType) {
      case "customer":
       return customer; 
     default:
          return []; 
  }
};
const categories = [
{ label: 'Home Decors', value: 'Home Decors', image: HomeDecor }, 
{ label: 'Home Appliances', value: 'Home Appliances', image: HomeAppliances },         
{ label: 'Electrical Items', value: 'Electrical items', image: Electrical }, 
{ label: 'Electronics Appliances', value: 'Electronics appliances', image: Electronics },   
{ label: 'Plumbing & Sanitary', value: 'Sanitary items', image: Plumbing },         
{ label: 'Hardware Items', value: 'Hardware items', image: Hardware },      
]; 
       
const groceryCategories = [
  {label: 'LMart Products', value: 'LMart Special', image: RoyalImg},
  { label: 'Unbeatable 10 Offers', value: 'Unbeatable Offers', image: UnbeatableImg },
  { label: 'Above 45 % Offers', value: 'Offers', image: Above45Img },
  { label: 'Milk, Curd & Ghee', value: 'Milk, Curd & Ghee', image: MilkImg },
   { label: 'Vegetables', value: 'Vegetables', image: VegetablesImg },
  { label: 'Fruits', value: 'Fruits', image: FruitsImg }, 
  { label: 'Ice Creams', value: 'Ice Creams', image: IcecreamImg },
  { label: 'Atta & Flours', value: 'Atta & Flours', image: AttaImg },
  { label: 'Rice & Ravva', value: 'Rice & Ravva', image: RavvaImg },    
  { label: 'Oils & Dals', value: 'Oils & Dals', image: OilsImg },
  { label: 'Sugar, Salt & Jaggery', value: 'Sugar, Salt & Jaggery', image: SugarImg }, 
  { label: 'Masala, Spices & Pickles', value: 'Masala, Spices & Pickles', image: MasalaImg },
  { label: 'Instant Food, Chips & Namkeen', value: 'Instant Food, Chips & Namkeen', image: NamkeenImg },
  { label: 'Bread & Eggs', value: 'Bread & Eggs', image: BreadsImg },
  { label: 'Biscuits & Chocolates', value: 'Biscuits & Chocolates', image: BiscuitsImg },
  { label: 'Drinks & Juices', value: 'Drinks & Juices', image: DrinkImg },
  { label: 'Sweets & Snacks', value: 'Sweets & Snacks', image: BakeryImg },
  { label: 'Dry Fruits & Bakery', value: 'Dry Fruits & Bakery', image: DryfruitsImg },
  { label: 'Soups & Sauces', value: 'Soups & Sauces', image: SoupsImg},
  { label: 'Tea & Coffee', value: 'Tea & Coffee', image: TeaImg },   
  { label: 'Stationary', value: 'Stationary', image: StationaryImg },
  { label: 'Home Needs', value: 'Home Needs', image: HouseHoldImg },
  { label: 'Pooja Essentials', value: 'Puja Essentials', image: PoojaImg },
  { label: 'Skin & Face Care', value: 'Skin & Face Care', image: SkinImg },
  { label: 'Bath & Body Care', value: 'Bath & Body Care', image: BathBodyImg },
  { label: 'Hair Care', value: 'Hair Care', image: HairImg },
  { label: 'Baby Products', value: 'Baby Products', image: BabyKidsImg },
  { label: 'Kids Zone', value: 'Kids Zone', image: KidsImg },
  { label: 'Health Care', value: 'Health Care', image: HealthImg },
  { label: 'DWCRA Products', value: 'DWCRA', image: DwakraProducts },
  { label: 'Chicken', value: 'Chicken', image: ChickenImg },
];
// ${appConfig.apiBaseUrl}
const collectionsCategories = [
  { label: 'Dupatta Sets', value: 'Dupatta Sets', image: setkurti },
  { label: 'Kurta Sets', value: 'Kurta Sets', image: kurti},
  ];

  const IMAGE_API =
  `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=`;

const ProfilePage = () => {
   const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});    
  const [searchQuery, setSearchQuery] = useState("");
   const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {userId} = useParams();
    const {userType} = useParams();
    const [category, setCategory] = useState('');
    const [fullName, setFullName] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [profile, setProfile] = useState({});
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const menuRef = useRef(null);
    const ticketScrollRef = useRef(null);  
   const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    //  const videoRef = useRef(null);
// const [isMuted] = useState(true);
// const [isMuted, setIsMuted] = useState(true);  
const [grocery, setGrocery] = useState([]);
const [cartSummary, setCartSummary] = useState({
  items: 0,
  total: 0,  
  products: [],
}); 
const [dress, setDress] = useState([]);
const [deliveryProfile, setDeliveryProfile] = useState(null);
const [showInterestModal, setShowInterestModal] = useState(false);
const [showNotificationModal, setShowNotificationModal] = useState(false);
const [selectedOption, setSelectedOption] = useState("");
const [groceryData, setGroceryData] = useState([]);
const [state, setState] = useState("");
const [address, setAddress] = useState("");  
const [district, setDistrict] = useState("");
const [zipCode, setZipCode] = useState("");
const [mobileNumber, setMobileNumber] = useState('');
const [status, setStatus] = useState('');  
const [id, setId] = useState('');
const [pinCode, setPinCode] = useState("");
const [martId, setMartId] = useState('');
const [paymentMode, setPaymentMode] = useState('');
const clickLock = useRef(false);
const [isRegistered, setIsRegistered] = useState(false);
const [partnerStatus, setPartnerStatus] = useState("");
// const [isPickup, setIsPickup] = useState(false);
const [cartData, setCartData] = useState(null);
const [transactionDetails, setTransactionDetails] = useState('');
const [transactionStatus, setTransactionStatus] = useState('');
const [longitude, setLongitude] = useState('');
const [latitude, setLatitude] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [date, setDate] = useState('');
const [grandTotal, setGrandTotal] = useState('');
const [items, setItems] = useState('');
const [assignedTo, setAssignedTo] = useState('');
const [deliveryPartnerUserId, setDeliveryPartnerUserId] = useState('');
const [totalItemsSelected, setTotalItemsSelected] = useState('');
const [transactionNumber, setTransactionNumber] = useState('');
const [city, setCity] = useState('');
const HEADER_H = 0;          
const MOBILE_ICONS_H = 0; 
const MOBILE_EXTRA =0;     
const MOBILE_PADDING_TOP = HEADER_H + MOBILE_ICONS_H + MOBILE_EXTRA;
const [cartImages, setCartImages] = useState({});
const [showCashbackModal, setShowCashbackModal] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);
const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});
const [cashbackAmount, setCashbackAmount] = useState(0);
const [cart, setCart] = useState({});
const [showZoomModal, setShowZoomModal] = useState(false);
const [zoomImage, setZoomImage] = useState("");
const [zoomProduct, setZoomProduct] = useState(null);
const displayProducts =
searchQuery.trim().length > 0 ? filteredProducts : products;
const [imageLoading, setImageLoading] = useState(true);
const [placeholderIndex, setPlaceholderIndex] = useState(0);
// const carouselRef = useRef(null);
// const carouselInstance = useRef(null);
const firstCategories = groceryCategories.slice(0, 6);
const secondCategories = groceryCategories.slice(6, 31);
// const thirdCategories = groceryCategories.slice(15, 24);
// const fourthCategories = groceryCategories.slice(24, 30);
// const HEADER_HEIGHT = window.innerWidth <= 768 ? 50 : 100;
const [showOffersModal, setShowOffersModal] = useState(false);
const [showCoinsModal, setShowCoinsModal] = useState(false);
// const offers = [
//   {
//     condition: "New Users Get - ₹50 in Wallet!",
//     img: Container1Img,
//   },
//   {
//     condition: "Cashback|Above ₹599 Order",
//     img: Container2Img,
//   },
//   {
//     condition: "Cashback|Above ₹999 Order",
//     img: Container4Img,
//   },
//   {
//     condition: "Cashback|Above ₹1999 Order",
//     img: Container3Img,
//   },
// ];

//  const highlightText = (text) => {
//   return text.split(/(₹\d+)/g).map((part, index) =>
//     /₹\d+/.test(part) ? (
//       <span key={index} style={{ color: "red", fontWeight: "bold" }}>
//         {part}
//       </span>
//     ) : (
//       <span key={index} style={{ color: "green" }}>
//         {part}
//       </span>
//     )
//   );
// };

// useEffect(() => {
//   setShowOffersModal(true);
// }, []);

const hasRun = useRef(false);

useEffect(() => {
  if (hasRun.current) return; 
  hasRun.current = true;
  const today = new Date().toDateString();
  const storedData = JSON.parse(
    localStorage.getItem("offersModalData") || "{}"
  );
  if (storedData.date === today) {
    if (storedData.count < 10) {
      setShowOffersModal(true);
      localStorage.setItem(
        "offersModalData",
        JSON.stringify({
          date: today,
          count: storedData.count + 1,
        })
      );
    }
  } else {
    setShowOffersModal(true);
    localStorage.setItem(
      "offersModalData",
      JSON.stringify({
        date: today,
        count: 1,
      })
    );
  }
}, []);

const placeholderSuggestions = [
  'Search "Milk"', 'Search "Freedom Refined Sunflower Oil"', 'Search "Sona Masoori Rice"',
  'Search "Paneer"', 'Search "Red Label"', 'Search "Coffee"', 'Search "Aashirvaad"',
  'Search "Surf Excel"', 'Search "Toothpaste"', 'Search "Lizol"', 'Search "Maggi"',
  'Search "Horlicks"', 'Search "Eggs"', 'Search "Chocolate"', 'Search "Butter"',
  'Search "Bread"', 'Search "Chicken"', 'Search "Shampoo"', 'Search "Soap"',
];

const [showRedeem, setShowRedeem] = useState(false);
const [refRecord, setRefRecord] = useState(null);
const [refLoading, setRefLoading] = useState(true);
const [shouldShowGetCoins, setShouldShowGetCoins] = useState(false);
const [referralPoints, setReferralPoints] = useState('');
const [awardedPoints, setAwardedPoints] = useState(0);
const [awardLoading, setAwardLoading] = useState(true);
const [userPoints, setUserPoints] = useState(0);        
const [pointsLoading, setPointsLoading] = useState(true);
const [claimAvailable, setClaimAvailable] = useState(false); 
const AWARDED_POINTS_KEY = `hm_referral_awarded_points_${userId || "guest"}`; 
const [isReferralUsed, setIsReferralUsed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
const [displayNumbers, setDisplayNumbers] = useState("");
// redeemOpen, showRedeem, awardLoading,  awardedPoints, referralPoints,
useEffect(() => {
  console.log( redeemOpen, showRedeem, awardLoading,  awardedPoints, referralPoints);
}, [redeemOpen, showRedeem, awardLoading,  awardedPoints, referralPoints]);

const checkNewOrExisting = useCallback(async (num) => {
  try {
    const res = await fetch(
      `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${encodeURIComponent(
        num
      )}`
    ); 
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (data === null) return "not registered";
    return "registered";
  } catch {
    return "invalid";
  }
}, []);

useEffect(() => {
  const numbers = (refRecord?.referralNumbers || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);
  if (numbers.length === 0) {
    setDisplayNumbers("");
    return;
  }
  let isActive = true;
  const checkAllNumbers = async () => {
    try {
      const results = await Promise.all(
        numbers.map(async (num) => {
          try {
            const status = await checkNewOrExisting(num);
            if (status === "registered") return `${num} ✅ Registered`;
            if (status === "not registered") return `${num} ❌ Not Registered`;
            return `${num} ⚠️ Invalid`;
          } catch {
            return `${num} ⚠️ Error`;
          }
        })
      );
      if (isActive) {
         const joined = results.join(", ");
          setDisplayNumbers(joined);
        // setDisplayNumbers(results.join(", "));
        const allRegistered = results.every(r => r.includes("✅"));

      if (allRegistered) {
        // ✅ store award immediately
        localStorage.setItem(AWARDED_POINTS_KEY, "100");
        // ✅ enable button immediately
        setClaimAvailable(true);
      }
      }
    } catch (error) {
      console.error(error);
    }
  };
  checkAllNumbers();
  // ✅ Auto refresh every 1 seconds
  // const intervalId = setInterval(() => {
  //   checkAllNumbers();
  // }, 1000); 
    const intervalId = setInterval(checkAllNumbers, 1000);

  return () => {
    isActive = false;
    clearInterval(intervalId); 
  };
}, [refRecord?.referralNumbers, checkNewOrExisting, AWARDED_POINTS_KEY]);

// useEffect(() => {
//   const numbers = (refRecord?.referralNumbers || "")
//     .split(",")
//     .map(s => s.trim())
//     .filter(Boolean)
//     .filter((v, i, a) => a.indexOf(v) === i);

//   if (numbers.length === 0) {
//     setDisplayNumbers("");
//     return;
//   }

//   const checkAllNumbers = async () => {
//     setRefLoading(true);
//     const results = await Promise.all(
//       numbers.map(async (num) => {
//         const status = await checkNewOrExisting(num);
//         if (status === "registered") return `${num} ✅ Registered`;
//         if (status === "not registered") return `${num} ❌ Not Registered`;
//         return `${num} ⚠️ Invalid`;
//       })
//     );
//     setDisplayNumbers(results.join(", "));
//     setRefLoading(false);
//   };
//   checkAllNumbers();
// }, [refRecord, checkNewOrExisting]);

useEffect(() => {
  const onResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

useEffect(() => {
  const checkNewUser = async () => {
    try {
      const rec = await getReferralRecord(userId);
      if (!rec || readServerPoints(rec) === 0) {
        setShowRedeem(true);   
      } else {
        setShowRedeem(false);
      }
    } catch (err) {
      setShowRedeem(true);
    }
  };
  if (userId) checkNewUser();
}, [userId]);

useEffect(() => {
  const award = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0");
  if (award === 100 && userPoints === 0) {
    setClaimAvailable(true);
  } else {
    setClaimAvailable(false);
  }
}, [userPoints, AWARDED_POINTS_KEY]);

useEffect(() => {
  let cancelled = false;
  (async () => {
    try {
      // 1) Server points (authoritative UI value)
      const rec = await getReferralRecord(userId);
      const serverPts = rec ? readServerPoints(rec) : 0;
      // 2) Local award (pending 100 from Redeem flow)
      let localAward = 0;
      try { localAward = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0"); } catch {}
      if (!cancelled) {
        setUserPoints(serverPts);
        // Enable "Get Coins" ONLY when server is still 0 AND local says 100 is ready
        // setClaimAvailable(serverPts === 0 && localAward === 100);
        setClaimAvailable(serverPts === 0 && localAward === 100);      }
    } catch {
      if (!cancelled) {
        setUserPoints(0);
        setClaimAvailable(false);
      }
    } finally {
      if (!cancelled) setPointsLoading(false);
    }
  })();
  return () => { cancelled = true; };
}, [userId, AWARDED_POINTS_KEY]);

useEffect(() => {
  const fetchReferral = async () => {
    try {
      const rec = await getReferralRecord(userId);
      if (rec) {
        const raw =
          rec?.referralPoints ??
          rec?.referralpoints ??
          rec?.ReferralPoints ??
          rec?.ReferralPoints ??
          0;
        const pointsValue = Number(raw) || 0;
        setReferralPoints(pointsValue);
        setShouldShowGetCoins(pointsValue === 0); 
      } else {
        setReferralPoints(0);
        setShouldShowGetCoins(true); 
      }
    } catch (e) {
      console.error("Failed to load referral points:", e);
      setShouldShowGetCoins(false);
    }
  };
  fetchReferral();
}, [userId]);

// load once
useEffect(() => {
  let cancelled = false;
  (async () => {
    try {
      const rec = await getReferralRecord(userId);
      if (!cancelled) setRefRecord(rec);
    } finally {
      if (!cancelled) setRefLoading(false);
    }
  })();
  return () => { cancelled = true; };
}, [userId]);

// formatter (optional): clean, unique, spaced
// const displayNumbers = (refRecord?.referralNumbers || "")
//   .split(",")
//   .map(s => s.trim())
//   .filter(Boolean)
//   .filter((v, i, a) => a.indexOf(v) === i)
//   .join(", ");

// ---- load once for this user ----
useEffect(() => {
  let cancelled = false;
  (async () => {
    try {
      const rec = await getReferralRecord(userId);
      const pts = rec ? readServerPoints(rec) : 0;
      if (!cancelled) setUserPoints(pts);
    } catch {
      if (!cancelled) setUserPoints(0);
    } finally {
      if (!cancelled) setPointsLoading(false);
    }
  })();
  return () => { cancelled = true; };
}, [userId]);

// KEY used by ReedemCode
const awardKeyFor = (uid) => `hm_referral_awarded_points_${uid || "guest"}`;

// Read localStorage award (100 only if all 3 registered) — doesn't change UI points
useEffect(() => {
  const KEY = awardKeyFor(userId);
  const readAward = () => {
    try {
      const raw = localStorage.getItem(KEY);
      const n = Number(raw);
      setAwardedPoints(Number.isFinite(n) ? n : 0);
    } catch {
      setAwardedPoints(0);
    } finally {
      setAwardLoading(false);
    }
  };
  readAward();
  const onStorage = (e) => { if (e.key === KEY) readAward(); };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, [userId]);

// When clicked, PUT 100 on server, update UI, clear local award
useEffect(() => {
  const KEY = awardKeyFor(userId);
  const readAward = () => {
    try {
      const raw = localStorage.getItem(KEY);
      const n = Number(raw);
      setAwardedPoints(Number.isFinite(n) ? n : 0);
    } catch {
      setAwardedPoints(0);
    } finally {
      setAwardLoading(false);
    }
  };
  readAward(); 
  // keep in sync if another tab updates
  const onStorage = (e) => {
    if (e.key === KEY) readAward();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, [userId]);

// ---- helpers (keep near your other helpers) ----
 const getReferralRecord = async (userId) => {
  if (!userId) return null;
  const url = `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/ReferralPoints/GetReferralPointsByUserId?referreId=${encodeURIComponent(
    userId
  )}`;
  const res = await fetch(url);
  const text = await res.text();
  let data = [];
  try { data = text ? JSON.parse(text) : []; } catch { data = []; }
  if (Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const record = data[0];
    setReferralPoints(Number(record.referralpoints));  
    setIsReferralUsed(record.isReferralUsed);
    return record;
  }
  setReferralPoints(0);
  setIsReferralUsed(false);
  return null;
};

useEffect(() => {
  const localAward = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0");

  if (userPoints === 0 && localAward === 100) {
    setClaimAvailable(true);
  } else {
    setClaimAvailable(false);
  }
}, [userPoints, AWARDED_POINTS_KEY]);

const readServerPoints = (record) => {
  const raw =
    record?.referralPoints ??
    record?.referralpoints ??
    record?.ReferralPoints ??
    record?.ReferralPoints ??
    0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};   

const handleGetCoins = async () => {
  if (pointsLoading) return;
  const localAward = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0");
  // const isAllRegistered = displayNumbers
  //   ?.split(",")
  //   .every(item => item.includes("✅"));
  // ❌ Already claimed
  if (userPoints >= 100) {
    alert("Coins already claimed");
    return;
  }
  // ❌ Not completed
  if (localAward !== 100) {
    alert("Referral not completed yet");
    return;
  }
  try {
    setPointsLoading(true);
    setShowConfetti(true);
    setShowMessage(true);
    setTimeout(() => setShowConfetti(false), 4000);
    setTimeout(() => setShowMessage(false), 5000);
    const rec = await getReferralRecord(userId);
    if (!rec?.id) {
      alert("No referral record found");
      return;
    }
    const payload = {
      id: rec.id,
      date: rec.date,
      referralNumbers: rec.referralNumbers ?? "",
      referreId: rec.referreId ?? userId,
      isReferralUsed: false,
      referralPoints: "100",
    };
    const res = await fetch(
      `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/ReferralPoints/UpdateReferralPoints?id=${rec.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error("Failed to update coins");
    // Update UI immediately
    setUserPoints(100);
    localStorage.removeItem(AWARDED_POINTS_KEY);
    // Disable button
    setClaimAvailable(false);
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setPointsLoading(false);
  }
};

useEffect(() => {
  let cancelled = false;
  const bootstrapReferrals = async () => {
    if (!userId) return;
    const rec = await getReferralRecord(userId);
    if (!rec) {
      // brand-new user: open popup and start with 0 points
      if (!cancelled) {
        setShowRedeem(true);
        setUserPoints(0);
      }
      return;
    }
    // existing record: load points into UI
    const serverPts = Math.min(readServerPoints(rec), 150);
    if (!cancelled) {
      setUserPoints(serverPts);
      // if they have no numbers and 0 points -> treat as new-ish, open it
      const hasNumbers = Boolean((rec.referralNumbers || "").trim());
      if (!hasNumbers && serverPts === 0) {
        setShowRedeem(true);
      } else {
        setShowRedeem(false);
      }
    }
  };
  bootstrapReferrals();
  return () => { cancelled = true; };
}, [userId]);

  // const handleSendRef = async (index, referralValue) => {
  //   console.log("sendRef", { index, referralValue });
  // };

//   const handleRedeemCoins = async (refsPayload) => {
//   const earned = 50; 
//   setUserPoints((prev) => {
//     const next = (Number(prev) || 0) + earned;
//     try {
//     } catch (e) {
//       console.error("Unable to write userPoints to localStorage on redeem:", e);
//     }
//     return next;
//   });
//   window.alert(`Coins added: ${earned}`);
// };

useEffect(() => {
  const interval = setInterval(() => {
    setPlaceholderIndex((prev) => (prev + 1) % placeholderSuggestions.length);
  }, 1500); 
  return () => clearInterval(interval);
}, [placeholderSuggestions.length]);       

useEffect(() => {
  console.log( imageLoading, zoomProduct, zoomImage, showZoomModal, cartSummary, items, grocery,error, showMenu, products, selectedCategory, dress);
}, [imageLoading, zoomProduct, zoomImage, showZoomModal, cartSummary, items, grocery, error,showMenu, products, selectedCategory, dress]);
 
useEffect(() => {
  if (!selectedCategory) return;
  let cancelled = false;
  const controller = new AbortController();
  // const POLL_MS = 2000;
  // let pollId = null;

  const category = selectedCategory; 
  async function fetchProductsAndFirstImages(warm = false, signal) {
    try {
      if (!warm) setImageLoading(true);
      // https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net
      const url = `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetGroceryItemsBycategory?Category=${category}`;

      const { data: items } = await axios.get(url, { signal });
      const safeItems = (Array.isArray(items) ? items : []).map(normalizeProduct);
      if (cancelled) return;    
      
      setProducts(safeItems);
      if (warm) return;
      const firstImages = safeItems
        .map((p) => ({
          productId: p.id,
          photo: Array.isArray(p.images) ? p.images[0] : null,
        }))
        .filter((x) => !!x.photo);
      const cachedMap = {};
      const misses = [];    
      for (const { productId, photo } of firstImages) {
        const cached = ImageCache.getBase64(photo);
        if (cached) {
          cachedMap[productId] = [`data:image/jpeg;base64,${cached}`];
        } else {
          misses.push({ productId, photo });
        }
      }
      if (Object.keys(cachedMap).length) {
        setImageUrls((prev) => ({ ...prev, ...cachedMap }));
      }
      if (cancelled) return;
      const fetchOne = async ({ productId, photo }) => {
        try {
          const res = await fetch(
            `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=${photo}`,
            { signal }
          );

          const json = await res.json();
          const b64 = json?.imageData || "";
          if (!b64) return;

          ImageCache.setBase64(photo, b64);
          const dataUrl = `data:image/jpeg;base64,${b64}`;

          if (!cancelled) {
            setImageUrls((prev) => {
              if (prev[productId]?.[0] === dataUrl) return prev;
              return { ...prev, [productId]: [dataUrl] };
            });
          }
        } catch {}
      };

      await Promise.allSettled(misses.map(fetchOne));
    } catch (err) {
      if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
        console.error("Error fetching grocery products:", err);
        if (!warm) {
          setProducts([]);
          setImageUrls({});
        }
      }
    } finally {
      if (!cancelled && !warm) setImageLoading(false);
    }
  }
  // First load
  fetchProductsAndFirstImages(false, controller.signal);
  // Polling
  // pollId = setInterval(() => {
  //   const pollController = new AbortController();
  //   fetchProductsAndFirstImages(true, pollController.signal);
  // }, POLL_MS);
  return () => {
    cancelled = true;
    controller.abort();
    // if (pollId) clearInterval(pollId);
  };
}, [selectedCategory]); 

const getMaxAllowedQty = (product) => {
  if (!product) return 0;
  return Math.min(product.stockLeft, product.limit  > 0 ? product.limit : Infinity);
};

useEffect(() => {
  const categories = JSON.parse(localStorage.getItem("allCategories") || "[]");
  categories.forEach(cat => {
    cat.products.forEach(async (p) => {
      if (!p.imageFile || cartImages[p.id]) return;
      try {
        const res = await fetch(
          `${IMAGE_API}${encodeURIComponent(p.imageFile)}`
        );
        const json = await res.json();
        if (json?.imageData) {
          setCartImages(prev => ({
            ...prev,
            [p.id]: `data:image/jpeg;base64,${json.imageData}`,
          }));
        }
      } catch (err) {
        console.error("Cart image load failed", err);
      }
    });
  });
}, [cartImages]); 

useEffect(() => {
  const raw = localStorage.getItem("allCategories");
  if (!raw) return;
  const categories = JSON.parse(raw);
  categories.forEach(cat => {
    cat.products.forEach(async (item) => {
      if (!item.imageFile || cartImages[item.id]) return;
      try {
        const res = await fetch(
          `${IMAGE_API}${encodeURIComponent(item.imageFile)}`
        );
        const json = await res.json();
        if (json?.imageData) {
          setCartImages(prev => ({
            ...prev,
            [item.id]: `data:image/jpeg;base64,${json.imageData}`,
          }));
        }
      } catch (e) {
        console.error("Cart image fetch failed", e);
      }
    });
  });
}, [cartImages]); 

useEffect(() => {
  if (showCashbackModal) {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showCashbackModal]);

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

   const handleImageClick = (imageSrc, product) => {
  setZoomImage(imageSrc);
  setZoomProduct(product);       
  setShowZoomModal(true);
};
  /* ================ VOICE SEARCH ================= */
  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported in this browser");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setSearchQuery(spokenText);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const normalizeProduct = (p) => ({
  ...p,
  stockLeft: Number(p.stockLeft || 0),
  limit: Number(p.limit || 0),
  afterDiscount: Number(p.afterDiscount || 0),
  mrp: Number(p.mrp || 0),
});

/* ================= FETCH PRODUCTS ================= */
// useEffect(() => {
//   let cancelled = false;
//   const POLL_MS = 5000
//   const fetchProducts = async (showLoader = false) => {
//     if (showLoader) setLoading(true);
//     try {
//       const res = await axios.get(
//         "https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetAllGroceryItems"
//       );
//       if (cancelled) return;
//       const normalized = (Array.isArray(res.data) ? res.data : [])
//         .map(normalizeProduct)
//         .filter(p => p.status === "Approved");
//       setAllProducts(prev => {
//         if (
//           prev.length === normalized.length &&
//           prev.every((p, i) =>
//             p.id === normalized[i].id &&
//             p.stockLeft === normalized[i].stockLeft &&
//             p.limit === normalized[i].limit
//           )
//         ) {
//           return prev; 
//         }
//         return normalized;
//       });
//     } catch (err) {
//       console.error("Fetching grocery items failed", err);
//     } finally {
//       if (showLoader && !cancelled) setLoading(false);
//     }
//   };
//   fetchProducts(true);
//   const intervalId = setInterval(() => {
//     fetchProducts(false);
//   }, POLL_MS);
//   return () => {
//     cancelled = true;
//     clearInterval(intervalId);
//   };
// }, []);


useEffect(() => {
  let cancelled = false;
  const POLL_MS = 5000;

  const sendLog = async () => {
    try {
      const payload = {
        id: "1", 
       
        date: "string",
        mobileNumber: profile.mobileNumber, 
        message: "User fetching grocery items in profile page"
      };

      await axios.post(
        `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/LmartLogs/UploadlogsDetails`,
        payload
      );
    } catch (err) {
      console.error("Log API failed", err);
    }
  };

  const fetchProducts = async (showLoader = false) => {
   
    sendLog();

    if (showLoader) setLoading(true);

    try {
      const res = await axios.get(
        `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/UploadGrocery/GetAllGroceryItems`
      );

      if (cancelled) return;

      const normalized = (Array.isArray(res.data) ? res.data : [])
        .map(normalizeProduct)
        .filter((p) => p.status === "Approved");

      setAllProducts((prev) => {
        if (
          prev.length === normalized.length &&
          prev.every(
            (p, i) =>
              p.id === normalized[i].id &&
              p.stockLeft === normalized[i].stockLeft &&
              p.limit === normalized[i].limit
          )
        ) {
          return prev;
        }
        return normalized;
      });

    } catch (err) {
      console.error("Fetching grocery items failed", err);
    } finally {
      if (showLoader && !cancelled) setLoading(false);
    }
  };

  fetchProducts(true);

  const intervalId = setInterval(() => {
    fetchProducts(false);
  }, POLL_MS);

  return () => {
    cancelled = true;
    clearInterval(intervalId);
  };
}, [profile.mobileNumber]);

  /* ================= FILTER ================= */
  useEffect(() => {
    let result = allProducts.filter((p) => p.status === "Approved");
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      result = [];
    }
    setFilteredProducts(result);
  }, [searchQuery, allProducts]);

  /* ================= FETCH IMAGES ================= */
  useEffect(() => {
    if (!filteredProducts.length) return;
    const controller = new AbortController();
    filteredProducts.forEach(async (p) => {
      if (!p.images?.[0] || imageUrls[p.id]) return;
      try {
        const res = await fetch(
          `${IMAGE_API}${encodeURIComponent(p.images[0])}`,
          { signal: controller.signal }
        );
        const json = await res.json();
        if (!json?.imageData) return;
        setImageUrls((prev) => ({
          ...prev,
          [p.id]: `data:image/jpeg;base64,${json.imageData}`,
        }));
      } catch {}
    });
    return () => controller.abort();
  }, [filteredProducts, imageUrls]);

const handleAddClick = (product) => {
  const maxQty = getMaxAllowedQty(product);
  if (maxQty <= 0) return;
  updateLocalStorageCart(
    { ...product, imageFile: product.images?.[0] || "" },
    1
  );
  setCart(prev => ({ ...prev, [product.id]: 1 }));
};

 const handleIncrement = (product) => {
  const maxQty = getMaxAllowedQty(product);

  setCart(prev => {
    const current = prev[product.id] || 0;
    if (current >= maxQty) return prev;

    const next = current + 1;
    updateLocalStorageCart(product, next);
    return { ...prev, [product.id]: next };
  });
};

  const handleDecrementClick = (product) => {
  setCart(prev => {
    const qty = prev[product.id] || 0;
    const newQty = qty - 1;

    updateLocalStorageCart(product, newQty);

    if (newQty <= 0) {
      const copy = { ...prev };
      delete copy[product.id];
      return copy;
    }
    return { ...prev, [product.id]: newQty };
  });
};

  // cashback logic
useEffect(() => {
  if (!showCashbackModal) return; 
  const timer = setTimeout(() => {
    setShowCashbackModal(false);
  }, 5000);
  return () => clearTimeout(timer); 
}, [showCashbackModal]);

useEffect(() => {
  const fetchDeliveryData = async () => {
    try {    
      const response = await fetch(
        `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/GetProductDetails?id=${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch grocery product data");
      }
      const data = await response.json();
      console.log("Fetched Grocery Data:", data);
      setCartData(data);
      setId(data.id);
      setMartId(data.martId);
      setDate(data.date);
      setMobileNumber(data.customerPhoneNumber);
      setAddress(data.address);
      setState(data.state);
      setCity(data.district);
      setPinCode(data.zipCode);
      setPaymentMode(data.paymentMode);
      setTransactionDetails(data.utrTransactionNumber);
      setLongitude(data.longitude);
      setLatitude(data.latitude);
      setGrandTotal(data.grandTotal);
      setPaymentMode(data.paymentMode);
      setTotalItemsSelected(data.totalItemsSelected);
      setTransactionStatus(data.transactionStatus);
      setPaidAmount(data.paidAmount);
      setTransactionNumber(data.transactionNumber);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setTotalItemsSelected(data.totalItemsSelected);
      setDeliveryPartnerUserId(data.deliveryPartnerUserId);
      setAssignedTo(data.assignedTo);
      let allProducts = [];
      let totalAmountFromApi = 0;

      if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((cat) => {
          totalAmountFromApi += Number(cat.totalAmount) || 0;
          cat.products.forEach((p, idx) => {
            allProducts.push({
              serial: allProducts.length + 1,
              name: p.productName,
              category: cat.categoryName,
              mrp: p.mrp,
              discount: p.discount,
              afterDiscountPrice: p.afterDiscountPrice,
              quantity: p.noOfQuantity,
              total: p.afterDiscountPrice * p.noOfQuantity,
            });
          });
        });
        setItems(allProducts);
      }
      const grandTotalNumeric = Number(data.grandTotal) || 0;
      const cashback = totalAmountFromApi - grandTotalNumeric;
      if ((cashback >= 49 && cashback <= 51) ||(cashback >= 99 && cashback <= 101) || (cashback >= 199 && cashback <= 201))
      {
        setCashbackAmount(cashback); 
      } else {
        setCashbackAmount(0);     
      }
    } catch (error) {
      console.error("Error fetching grocery product data:", error);
    } finally {
      setLoading(false);
    }
  };
  if (id) {
    fetchDeliveryData();
  }
}, [id]);

 useEffect(() => {
  const fetchGroceryData = async () => {
    try {
      const response = await fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/GetMartTicketsByUserId?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch ticket data');
      const data = await response.json();
      const tickets = Array.isArray(data) ? data : (data && typeof data === "object" ? [data] : []);
      setGroceryData(tickets);
      const first = tickets[0] || {};
      setMartId(first.martId || "");
      setState(first.state || "");
      setDistrict(first.district);
      setPinCode(first.zipCode || first.pinCode || "");
      setAddress(first.address || "");
      setId(first.id || "");
      setPaymentMode(first.paymentMode || "");
      setStatus(first.status || "");
      setFullName(first.customerName || "");
      setMobileNumber(first.customerPhoneNumber || "");
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      setGroceryData([]);
    } finally {
      setLoading(false);
    }
  };
  fetchGroceryData();
}, [userId]);

  useEffect(() => {            
    console.log(deliveryProfile);
  }, [deliveryProfile]);

const handleDeliveryPartnerClick = async () => {
  if (clickLock.current) return;
  clickLock.current = true;
  try {
    const res = await axios.get(
      `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/DeliveryPartner/GetDeliveryPartnerDetailsByUserId?userId=${userId}`
    );
    const raw = res?.data ?? null;
    const profile = Array.isArray(raw)
      ? (raw.length > 0 ? raw[0] : null)
      : (raw && typeof raw === "object" && Object.keys(raw).length > 0 ? raw : null);
    setDeliveryProfile(profile);
    const reg = profile?.isRegistered === true;
    const st = (profile?.status || "").toLowerCase();
    setIsRegistered(reg);
    setPartnerStatus(st);
    if (reg) {
      setShowNotificationModal(true); 
    } else {
      setShowInterestModal(true);
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
    setShowInterestModal(true);
  } finally {
    setTimeout(() => { clickLock.current = false; }, 200);
  }
};

const handleConfirmInterest = () => {
  if (selectedOption === "yes") {
    setShowInterestModal(false);
    navigate(`/deliveryPartner/${userType}/${userId}`);
  } else {
    setShowInterestModal(false);
  }
};

useEffect(() => {
  const summary = CartStorage.grandSummary();
  setCartSummary(summary);
}, []);

const handleUpdatePaymentMethod = async () => {
    try {
  const payload = {
    ...cartData,
    customerName: fullName,
    address: address, 
    state: state,
    district: city,
    zipCode: pinCode,
    customerPhoneNumber: mobileNumber,
    id: id,
    userId: userId, 
    martId: martId,
    date: date,
    grandTotal: grandTotal,
    totalItemsSelected: totalItemsSelected,
    status: status,
    paymentMode: paymentMode,
    utrTransactionNumber: transactionDetails,
    transactionNumber: transactionNumber,
    transactionStatus: transactionStatus,
    paidAmount: paidAmount,
    AssignedTo: assignedTo,
    DeliveryPartnerUserId: deliveryPartnerUserId,
    latitude: latitude,
    longitude: longitude,
    isPickUp: true,
    isDelivered: false,    
  };

    let response = await fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/Mart/UpdateProductDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to Update Technician.');
    }
    window.location.href = `/deliveryTracking/${id}`;
  } catch (error) {
    console.error('Error:', error);
    window.alert('Failed to Update Technician. Please try again later.');
  }
};

useEffect(() => {
  const autoOpenForNewUser = async () => {
    if (!userId) return;
    try {
      const rec = await getReferralRecord(userId);
      const REFERRAL_LOCK_KEY = `hm_referral_lock_${userId}`;
      const lock = localStorage.getItem(REFERRAL_LOCK_KEY);
      const hasNumbers = Boolean((rec?.referralNumbers || "").trim());
      // ✅ FINAL CONDITION
      if (!lock && !hasNumbers) {
        setRedeemOpen(true);   
      } else {
        setRedeemOpen(false);  
      }
    } catch (e) {
      console.error(e);
      setRedeemOpen(true); 
    }
  };
  autoOpenForNewUser();
}, [userId]);

const handleCategoryClick = async (category) => {
  const { value } = category; 
  try {
    setSelectedCategory(category);
    setProducts([]);
    setError("");
    const encodedCategory = encodeURIComponent(value);
    localStorage.setItem("encodedCategory", encodedCategory);
    navigate(`/offers/${userType}/${userId}`, {
      state: { encodedCategory }, 
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    setProducts([]);
    setError(`Oops! No products found for ${value} category.`);
  }
};

const handleGroceryCategoryClick = (category) => {
  const { value } = category;
  const mobileNumber = profile?.mobileNumber || "";
  const encodedCategory = encodeURIComponent(value);
  localStorage.setItem("encodedCategory", encodedCategory);
  if (value === "Kitchenware Appliances") {
    navigate(`/grocery/${userType}/${userId}`, {
      state: { mobileNumber },
    });
    return;
  }
  if (value === "Electrical Products" || value === "Plumbing Products") {
    navigate(`/martHomeAppliances/${userType}/${userId}`, {
      state: { applianceType: value }, 
    });
    return;
  }
  
  if (value === "Unbeatable Offers") {
    navigate(`/groceryOffers/${userType}/${userId}`, {
      state: { mobileNumber },
    });     
  } else {
    navigate(`/grocery/${userType}/${userId}`, {
      state: { mobileNumber },
    });
  }
};

const handleDressCategoryClick = async (category) => {
  const { value } = category;
  try {
    setSelectedCategory(category);
    setDress([]);
    setError("");
    const encodedCategory = encodeURIComponent(value);
    localStorage.setItem("encodedCategory", encodedCategory);
    navigate(`/lakshmiCollections/${userType}/${userId}`, {
      state: { encodedCategory },  
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    setGrocery([]);
    setError(`Oops! No collections found for ${value} category.`);
  }
};    
        useEffect(() => {
          const fetchAllTickets = async () => {
            try { 
              const [ticketResponse, productResponse, technicianResponse, groceriesResponse, lakshmiResponse] = await Promise.all([
                fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=raiseTicket`),
                fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=buyProduct`),
                fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=bookTechnician`),
                fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=mart`),
                fetch(`https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=collections`),
              ]);      
              if (!ticketResponse.ok || !productResponse.ok || !technicianResponse || !groceriesResponse || !lakshmiResponse) {
                throw new Error("Failed to fetch ticket, product and technician data");
              }
              const ticketData = await ticketResponse.json();
              const productData = await productResponse.json();
              const technicianData = await technicianResponse.json(); 
              const groceryData = await groceriesResponse.json(); 
              const collectionsData = await lakshmiResponse.json(); 
              const groceryOpenTickets = Array.isArray(groceryData)
              ? groceryData.filter(item => String(item?.status).toLowerCase() === "open")
              : [];
              const collectionOpenTickets = Array.isArray(collectionsData)
              ? collectionsData.filter(item => String(item?.status).toLowerCase() === "open")
              : [];
              setAllTickets([...ticketData, ...productData, ...technicianData, ...groceryOpenTickets, ...collectionOpenTickets]);
            } catch (error) {
              console.error("Error fetching ticket, product data:", error);
            } finally {
              setLoading(false);
            }
          };
          fetchAllTickets();
        }, [userId]);

        const calculateCashback = (ticket) => {
  if (!ticket || !ticket.categories) return 0;

  let totalAmountFromApi = 0;

  ticket.categories.forEach((cat) => {
    if (cat.totalAmount != null) {
      totalAmountFromApi += Number(cat.totalAmount) || 0;
    } else if (Array.isArray(cat.products)) {
      cat.products.forEach((p) => {
        const price = Number(p.afterDiscountPrice || 0);
        const qty = Number(p.noOfQuantity || 0);
        totalAmountFromApi += price * qty;
      });
    }
  });

  const grandTotalNumeric = Number(ticket.grandTotal) || 0;
  const cashback = totalAmountFromApi - grandTotalNumeric;
  if ((cashback >= 49 && cashback <= 51) ||(cashback >= 99 && cashback <= 101) || (cashback >= 199 && cashback <= 201)) {
    return cashback;
  }
  return 0;
};

const handleCustomerCareCall = () => {
    window.location.href = "tel:6281198953";
  };

        const handleViewDetails = (ticket) => {
          setSelectedTicket(ticket);
          const cb = calculateCashback(ticket);
          setCashbackAmount(cb);
          setShowModal(true);
        };
      
        useEffect(() => {
          if (profile?.mobileNumber) {
            localStorage.setItem('customerMobileNumber', profile.mobileNumber);
          }
        }, [profile]);        

  const handleMoreIconClick = () => {
    setShowProfile(!showProfile);
  };

      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (!document.getElementById("dropdown-container")?.contains(event.target)) {
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }, []);

      useEffect(() => { 
        const handleCloseMenuOnClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
          }
        };
        document.addEventListener("mousedown", handleCloseMenuOnClickOutside);
        return () => document.removeEventListener("mousedown", handleCloseMenuOnClickOutside);
      }, []);
            
      useEffect(() => {
        if (!userId || !userType) return;
        const fetchProfileData = async () => {
          try {
            let apiUrl = "";
            if (userType === "customer") {
              apiUrl = `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`;
            }
            if (!apiUrl) return;
            const response = await axios.get(apiUrl);
            setProfile(response.data); 
            setCategory(response.data.category);
            setDistrict(response.data.district);
            setZipCode(response.data.zipCode);
            setFullName(response.data.fullName);
            if (response.data.photoAttachmentId) {
              fetchImageUrl(response.data.photoAttachmentId);
            }
              setMenuList(getMenuList(userType, userId, response.data.category, response.data.district, response.data.zipCode, response.data.fullName, isMobile));
          } catch (error) {
            console.log("Error Fetching Data:", error)
          } finally {
            setLoading(false);
          }
        };
        fetchProfileData();
      }, [userType, userId, isMobile]);
      
      useEffect(() => {
        if (category && district) {
          setMenuList(getMenuList(userType, userId, category, district, zipCode, fullName, isMobile));
        }
      }, [category, district, userType, userId, zipCode, fullName, isMobile]);

      useEffect(() => {
  window.addEventListener("storage", () => {
    setCartImages({});
  });
  return () => window.removeEventListener("storage", () => {});
}, []);

const fetchImageUrl = async (photoId) => {
  try { 
    if (!photoId) return;
    const response = await axios.get(
      `https://handymanwebapp1-ezgyf8bxf4dtcqd2.z01.azurefd.net/api/FileUpload/download?generatedfilename=${photoId}`
    );
    if (response.status === 200 && response.data.imageData) {
      const imageUrl = `data:image/jpeg;base64,${response.data.imageData}`;
      setProfileImage(imageUrl);
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
  
 if (loading) {
  return <div></div>; 
}

const updateLocalStorageCart = (product, qty) => {
  const stored = JSON.parse(localStorage.getItem("allCategories")) || [];
  const categoryName = product.category || "Search Items";
  let category = stored.find(c => c.categoryName === categoryName);
  if (!category) {
    category = { categoryName, products: [] };
    stored.push(category);
  }
  
  const index = category.products.findIndex(
    p => (p.productId || p.id) === product.id
  );

  if (qty <= 0) {
    if (index !== -1) category.products.splice(index, 1);
  } else {
    const item = {
      productId: product.id,
      productName: product.name || product.productName,
      qty,
      mrp: product.mrp,
      discount: product.discount,
      afterDiscountPrice: product.afterDiscount,
      stockLeft: product.stockLeft,
      units: product.units,
      code: product.code,
      image: product.imageFile || product.images?.[0] || "",
    };

    if (index === -1) {
      category.products.push(item);
    } else {       
      category.products[index] = item;
    }
  }

  localStorage.setItem("allCategories", JSON.stringify(stored));
};

  return (
    <>
    <header className="header d-flex align-items-center justify-content-between p-2 bg-white shadow-sm" 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1000 }}>
       {isMobile ? (
          <div onClick={handleMoreIconClick} style={{ cursor: "pointer" }}>
          <MenuIcon className="floating-menuIcon" fontSize="medium" />
        </div>
       ) : (null)}
       <img src={Logo} alt="Handy Man Logo" className="logo-img" />
        <div className="spacer"></div>
        <div className="d-flex align-items-center w-100">
    </div>
        <div className="hdr_icns d-flex align-items-center ">
      <div id="dropdown-container" className="dropdown-container" style={{ position: "relative" }}>
        <div className="d-flex align-items-center">
         {/* Customer Care Number */}
          <div
                className="d-flex align-items-start"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: "pointer" }}
                onClick={handleCustomerCareCall}
              >
                <AddIcCallIcon style={{ color: "green", fontSize: "30px" }} />
                <small                  
                  style={{
                    display: "flex",      
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                ></small>
              </div>
               <div className="d-flex align-items-center">
            {/* Coins (Clickable) */}
            {/* <div 
              className="coin-wrap"
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => setShowCoinsModal(true)}
            >
              <span className="coin-value">
                {pointsLoading ? "0" : userPoints}
              </span>
            </div> */}
          </div>
 
  {/* Profile Image */}
  <div className="profile-img-wrapper">
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
    />
  </div>
</div>
</div>
    </div>
    </header>

     <Modal
  show={showCoinsModal}
  onHide={() => setShowCoinsModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>🎁 Redeem Coins</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Coins Display */}
    <div className="text-center mb-3">
    <h5 className="gold-shine-text">{pointsLoading ? "0" : userPoints} Coins</h5>
    </div>
    {/* Get Coins Button */}
    {shouldShowGetCoins && !isReferralUsed && (
      <button
        onClick={handleGetCoins}
        disabled={pointsLoading || userPoints >= 100 || !claimAvailable}
        className="bg-primary w-100"
        style={{
          fontSize: 14,
          borderRadius: 6,
          color: "white",
          padding: "8px",
          border: "none",
        }}
      >
        {pointsLoading ? "Checking..." : "Get Coins"}
      </button>
    )}
    {/* Confetti overlay */}
                    {showConfetti && (
                      <Confetti width={windowSize.width} height={windowSize.height} />
                    )}
                    {/* Toast-like “Congrats” message */}
                    {showMessage && (
                      <div
                        style={{
                          position: "fixed",
                          top: "40%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "#fff",
                          color: "#000",
                          padding: "20px 40px",
                          borderRadius: "12px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          fontSize: 18,
                          fontWeight: "bold",
                          zIndex: 9999,
                          animation: "fadeInUp 0.5s ease",
                        }}
                      >
                        🎉 Congrats! You got <span style={{ color: "#007bff" }}>100</span> points!
                      </div>
                    )}
          {/* Referral Numbers */}
          <div style={{ fontSize: "12px" }}>
          {refLoading ? (
            "Loading..."
          ) : (
            displayNumbers.split(",").map((item, index) => (
              <div key={index}>
                {item.trim()}
              </div>
            ))
          )}
      </div>
  </Modal.Body>
</Modal>

      <div className="pt-1 mt-100"> 
    <div
      className={`container m-1`}
      style={{
        padding: isMobile ? "8px" : "0px",
        borderRadius: "5px",
        minHeight: "100vh",
        paddingTop:isMobile ? "70px" : "0px"
      }}
    >
      <div className="row">
        <div className="col-md-3">
        <div>
          {/* Desktop Profile Details */}
      {!isMobile ? (
                   <div className="profile-card">
                     <div className="profile-img-container "> 
                   <div className="profile-container"> 
             <div className="profile-info">
               <div className="webprofile-section">
               <div className="text-primary fw-bold cust-name">Welcome  <small className="text-dark" style={{fontFamily: "Poppins, sans-serif"}}>{profile.fullName}{" "}</small></div>
                   <div className="fw-bold fs-4">Lakshmi Sai Service Providers</div>
                   <div className="webprofile-img-wrapper">
                     <img src={profileImage} alt="Profile" 
                     className="webprofile-img" 
                     />
                     <input
                       type="file"
                       ref={fileInputRef}
                       style={{ display: "none" }}
                       accept="image/*"
                     />
                    </div>
                 <div className="label fw-bold fs-5">Name</div>
                   <p className="value">
                     {profile.fullName}
                   </p>
                  <hr />
                 <div className="label fw-bold mt-0 fs-5">Mobile</div>
                 <p className="value">{profile.mobileNumber}</p>
              <hr />
                 <div className="label fw-bold mt-0 fs-5">Address</div>
                 <p className="value">{profile.address}</p>
               <hr />
               <p className="logout-btn m-1" onClick={() => window.location.href = "/loginnew"}>
                 <LogoutIcon />
                 <span className="fs-5">Logout</span>
               </p>
             </div>
           </div>
           </div>
           </div>
                   </div>
      ) : null}
            </div> 
          {/* Mobile Profile Details */}
           {showProfile && !showInterestModal && !showNotificationModal && (
              <div
                className="floating-profile-menu"
                style={{
                  position: 'fixed',
                  top: '60px',
                  left: '10px',
                  backgroundColor: '#fff',
                  zIndex: 1200,
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                  padding: '10px',
                  width: '180px'
                }}
              >
                <div className="profile-info">
                  <div className="fw-bold">Name</div>
                  <p className="mb-2">{profile.fullName}</p>
                  <hr style={{ margin: '4px 0' }} />
                  <div className="fw-bold">Mobile</div>
                  <p className="mb-2">{profile.mobileNumber}</p>
                  <hr style={{ margin: '4px 0' }} />
                  <div className="fw-bold">Address</div>
                  <p className="mb-2">{profile.address}</p>
                  <hr style={{ margin: '4px 0' }} />
                     <div
                      className="d-flex align-items-start"
                      style={{ cursor: "pointer" }}
                      onClick={handleDeliveryPartnerClick}
                    >
                      <DeliveryDiningIcon sx={{ fontSize: 24, marginRight: "4px" }} />
                      <small
                        style={{
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          lineHeight: "28px",
                        }}
                      >
                        Delivery Partner
                      </small>
                    </div>
                    <hr style={{ margin: '4px 0' }} />
                    <div className="d-flex align-items-start" style={{ cursor: "pointer" }} onClick={() => document.getElementById('myTicketsSection')?.scrollIntoView({ behavior: 'smooth' })}>
                      <ConfirmationNumberIcon sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "12px", fontFamily: "Poppins", lineHeight: "28px" }}>My Tickets</small>
                    </div>
                    <hr style={{ margin: '4px 0' }} />
                  <div className="d-flex align-items-center logout-btn" style={{ cursor: 'pointer' }} onClick={() => window.location.href = "/loginnew"}>
                    <LogoutIcon className="me-2" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>                         
            )}
         </div> 
       {/* Interest Modal */}
<Modal show={showInterestModal} onHide={() => setShowInterestModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Are you interested in joining as a delivery partner?</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="d-flex flex-column">
      <label>
        <input
          type="radio"
          name="interest"
          value="yes"
          checked={selectedOption === "yes"}
          onChange={(e) => setSelectedOption(e.target.value)}
        />{" "}
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="interest"
          value="no"
          checked={selectedOption === "no"}
          onChange={(e) => setSelectedOption(e.target.value)}
        />{" "}
        No
      </label>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowInterestModal(false)}>
      Cancel
    </Button>
    <Button
      variant="primary"
      onClick={handleConfirmInterest}
      disabled={!selectedOption}
    >
      Continue
    </Button>
  </Modal.Footer>
</Modal>

{/* Notification Modal */}
<Modal
  show={showNotificationModal}
  onHide={() => setShowNotificationModal(false)}
  centered>
  <Modal.Header closeButton>
    <Modal.Title>Notification</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {isRegistered && partnerStatus === "open" ? (
      loading ? (
        <p>Loading tickets…</p>
      ) : groceryData.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="notification-list">
          {groceryData.map((t) => (
            <div key={t.id || t.martId} className="notification-item mb-3 p-2 border rounded">
              <div className="notification-header">
                <strong>Grocery ID: </strong> {t.martId}
              </div>
              <div>
                <strong>Customer Name:</strong> {t.customerName}
              </div>
              <div>
                <strong>Address:</strong>{" "}
                {[t.address, t.district, t.state, (t.zipCode || t.pinCode), t.customerPhoneNumber]
                  .filter(Boolean)
                  .join(", ")}
              </div>
              <div className="notification-date">
                <strong>Payment Mode:</strong> {t.paymentMode}
              </div>
              {t.status && (
                <div>
                  <strong>Status:</strong> {t.status}
                </div>
              )}

              {/* ✅ IsPickup checkbox for this ticket */}
              <div className="form-check mt-2">
                <input
                  id={`isPickup-${t.id || t.martId}`}
                  className="form-check-input border-dark"
                  type="checkbox"
                  checked={!!t.isPickup}
                  onChange={(e) => {
                    const updated = groceryData.map((g) =>
                      g.id === t.id || g.martId === t.martId
                        ? { ...g, isPickup: e.target.checked }
                        : g
                    );
                    setGroceryData(updated);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`isPickup-${t.id || t.martId}`}
                >
                  Is Pickup
                </label>
              </div>

              {/* Go to Maps */}
              {t.isPickup && t.latitude && t.longitude && (
                <div className="mt-1 text-end">
                  <a
                    href={`/deliveryTracking/${t.id}?lat=${t.latitude}&lng=${t.longitude}&isPickup=true`}
                    className="link-primary"
                    onClick={() => {
                      setShowNotificationModal(false);
                      handleUpdatePaymentMethod(t); 
                    }}
                  >
                    Go to Maps
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )
    ) : (
      <p>You are already registered, pending for admin approval.</p>
    )}
  </Modal.Body>
</Modal>

{/* {showRedeem && (
            <ReedemCode
              openOverride={true}     
              showTrigger={false} 
              initialOpen={true}
              userPoints={userPoints}
              onSendRef={handleSendRef}
              onRedeem={handleRedeemCoins}
              referrerId={userId}
              customerName={profile.fullName}
             onInviteSuccess={(data) => {
              setShowCoinsModal(true);
              setRefRecord(data.refRecord);
              setUserPoints(data.points || 0);
            }}
            />
        )} */}

        {isMobile && (
            <div>
               <div style={{ padding: "12px", maxWidth: "1100px", margin: "auto" }}>
      {/* 🔍 SEARCH + 🎤 MIC */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        <input
          className="form-control ps-5 pe-5"
          placeholder={placeholderSuggestions[placeholderIndex]}
          style={{border: "2px solid #000", borderRadius: "6px"}}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <SearchIcon
          style={{ 
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#000",
          }}
        />

         {/* 🎤 Better Mic Button */}
  <button
    onClick={startVoiceSearch}
    title="Speak product name"
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: listening
        ? "2px solid red"
        : "2px solid transparent",
      background: listening ? "rgba(255,0,0,0.1)" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "0.2s ease-in-out",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      fill={listening ? "red" : "#000"}
    >
      <path d="M12 14a2 2 0 0 0 2-2V6a2 2 0 1 0-4 0v6a2 2 0 0 0 2 2zm5-2a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 9c-1.1 0-2-.9-2-2h4a2 2 0 0 1-2 2z" />
    </svg>
  </button>
</div>
 {/* 📦 PRODUCTS */}
      {loading && <p>Loading products...</p>}
      <div className="grocery-row flex flex-wrap gap-1" style={{marginBottom: "5px"}}>
       {displayProducts.map((product) => {
        const maxQty = getMaxAllowedQty(product);   
        const isOutOfStock = maxQty <= 0;
          return (
            <div
        key={product.id}
        className="w-[200px] flex flex-col p-2 bg-white rounded shadow-sm border position-relative"
        style={{ minHeight: "250px", opacity: isOutOfStock ? 0.6 : 1 }}
      >
        <div className="d-flex flex-row justify-content-between absolute top-0 left-0 w-full">
          {Number(product.discount) > 0 && !isOutOfStock && (
            <span className="discount-badge">
              {Math.round(Number(product.discount))}%
            </span>
          )}
  </div>
  {/* Product Image */}
  <div
    className="d-flex justify-content-center align-items-center position-relative"
    style={{ height: "90px" }}
  >
    {imageUrls[product.id] ? (
      <img
        src={cartImages[product.id] || imageUrls[product.id]}
        alt={product.name}
        decoding="async"
        loading="eager"
        fetchpriority="high"
        style={{
          maxHeight: "80px",
          maxWidth: "100%",
          objectFit: "contain",
          cursor: isOutOfStock ? "not-allowed" : "pointer",
          borderRadius: "6px",
        }}
        onClick={() => !isOutOfStock && handleImageClick(
      cartImages[product.id] || imageUrls[product.id],
      product
    )}/>
    ) : (
      <span className="text-muted small">Loading Image</span>
    )}

    {isOutOfStock && (
      <div
        className="position-absolute d-flex justify-content-center align-items-center"
        style={{
          top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(255,255,255,0.75)", borderRadius: "6px", zIndex: 2,
        }}
      >
        <span
          style={{
            fontWeight: 500, backgroundColor: "grey", color: "white",
            fontSize: "10px", borderRadius: "6px", margin: "1px", padding: "2px",
          }}
        >
          Out of Stock
        </span>
      </div>
    )}
  </div>

  {/* Product Name */}
  <h6
    className="text-start fw-bold m-0"
    style={{
      fontSize: "11px",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "1.2em",
      maxHeight: "3.6em",
    }}
  >
    {product.name}
  </h6>

  {/* Price/MRP/Units — ONLY when in stock */}
  {!isOutOfStock && (
    <div className="text-start m-0" style={{ fontSize: "11px" }}>
      {product.afterDiscount != null && (
        <b className="text-success me-2">
          ₹{Math.round(Number(product.afterDiscount))}
        </b>
      )}
      {product.mrp != null && <s className="text-muted">₹{product.mrp}</s>}
      {product.units && (
        <b className="text-success" style={{ marginLeft: "5px" }}>
          {product.units}
        </b>
      )}
    </div>
  )}

  {Number(product.limit) > 0 && (
  <div
    style={{
      fontSize: "10px",
      marginBottom: "5px",
      color: "#d32f2f",
    }}
  >
    Max {Number(product.limit)} Per User
  </div>
)}

  {/* Checkbox */}
  {!isOutOfStock && (
    <div style={{ position: "absolute", bottom: "8px", left: "8px" }}>
      <input
        type="checkbox"
        className="border-dark"
        checked={cart[product.id] > 0}
        readOnly
      />
    </div>
  )}

{/* Add/Counter — ONLY when in stock */}
{!isOutOfStock && (
  <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
    {cart[product.id] ? (
      <div
        className="d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "green",
          color: "white",
          borderRadius: "8px",
          padding: "2px",
          minWidth: "60px",
        }}
      >
        {/* ➖ DECREMENT */}
        <button
          className="btn btn-sm p-0 text-white"
          onClick={() => handleDecrementClick(product)}
        >
          –
        </button>
        <span className="fw-bold">{cart[product.id]}</span>
        {/* ➕ INCREMENT */}
        <button
          className="btn btn-sm p-0 text-white"
          disabled={(cart[product.id] || 0) >= maxQty}
          onClick={() => handleIncrement(product)}
        >
          +
        </button>
      </div>
    ) : (
      <button
        className="btn fw-bold"
        style={{
          border: "1px solid green",
          color: "green",
          backgroundColor: "#f6fff6",
          borderRadius: "8px",
          padding: "2px 12px",
          fontSize: "13px",
        }}
        onClick={() => handleAddClick(product)}
      >
        ADD
      </button>
    )}
  </div>
)}
</div>
    );
  })}
{/* Cart Bar */}               
{(() => {
  const readAllCategories = () => {
    if (typeof window === "undefined") return []; 
    try {
      const raw = localStorage.getItem("allCategories");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      return arr
        .filter(Boolean)
        .map((cat) => ({
          ...cat,
          products: Array.isArray(cat?.products) ? cat.products : [],
        }));
    } catch (e) {
      console.error("Invalid JSON in allCategories:", e);
      return [];
    }
  };
  const allCategories = readAllCategories();
  const summary = allCategories.reduce(
    (acc, cat) => {
      for (const p of cat.products) {
        const qty = Number(p?.qty) || 0;
        if (!qty) continue;
        const price =
          Number(p?.afterDiscountPrice ?? p?.price ?? p?.finalPrice ?? 0) || 0;
        acc.items += qty;
        acc.total += price * qty;
      }
      return acc;
    },
    { items: 0, total: 0 }
  );
  const items = summary.items;
  const total = Math.round(summary.total);
  return items > 0 ? (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: 0,
        width: "100%",
        backgroundColor: "green",
        color: "white",
        padding: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        zIndex: 2000,   
        borderRadius: "20px",
        marginTop: "0px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        🛒
        <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
          <span style={{ fontSize: "12px" }}>{items} items</span>
          <span style={{ fontSize: "12px" }}>₹{total}</span>
        </div>
      </div>
      <button
        type="button"
        className="text-white fw-bold d-flex align-items-center gap-1"
        style={{
          fontSize: "12px",
          cursor: "pointer",
          background: "transparent",
          border: "none",
        }}
        onClick={() => navigate(`/groceryCart/${userType}/${userId}`)}
      >
        View Cart →
      </button>
    </div>
  ) : null;
})()}
      </div>
      <Modal show={showZoomModal} onHide={() => { setShowZoomModal(false); setZoomProduct(null); }} centered>
        <button
          className="close-button text-end"
          onClick={() => { setShowZoomModal(false); setZoomProduct(null); }}
        >
          &times;
        </button>
        <Modal.Body className="text-center">     
          <div className="zoom-container">
            <img src={zoomImage} alt={zoomProduct?.name || "Zoomed Product"} className="zoom-image" />
          </div>
          <h6 className="text-start fw-bold" style={{ fontSize: "12px" }}>
            {zoomProduct?.name || ""}
          </h6>
        {zoomProduct?.afterDiscount != null && (
            <p className="text-start" style={{ fontSize: "12px" }}>
              <b className="text-success me-2">₹{Math.round(Number(zoomProduct.afterDiscount))}</b>
              {zoomProduct?.mrp ? <s className="text-muted">₹{zoomProduct.mrp}</s> : null}
            </p>
          )}
        </Modal.Body>
      </Modal>
              <div className="text-primary fw-bold fs-5">
                Welcome{" "}
                <small className="text-dark">
                  {profile.fullName}
                </small>
              </div>
            </div>
            </div>
          )}
    
          {/* Mobile Dashboard Icons */}
          {isMobile && (   
  <div
    className="mobile-top-icons position-fixed start-0 end-0 bg-white border-bottom shadow-sm"
    style={{
      top: '80px',
      zIndex: 1050,
      height: '90px',
      padding: '8px',
      overflowY: 'hidden',
    }}
  >
    <div className="d-flex flex-wrap justify-content-around align-items-center">
      {menuList.map((menu, index) => (
        <a
          key={index}
          href={menu.TargetUrl}
          className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-dark ms-1"
          style={{ minWidth: '10px', flex: '0 0 auto' }}
        >
          <div
            style={{
              backgroundColor: '#ffc107', 
              borderRadius: '50%',        
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            {React.cloneElement(menu.MenuIcon, { sx: { fontSize: 22, color: '#000' } })}
          </div>
          <small
            style={{
              fontSize: '12px',
              fontFamily: "Roboto", 
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '14px',
              marginTop: '4px',
              color: '#333',
              letterSpacing: '0.5px',
            }}
          >
            {menu.MenuTitle.split(' ').map((word, idx) => (
              <React.Fragment key={idx}>
                {word}
                {idx !== menu.MenuTitle.split(' ').length - 1 && <br />}
              </React.Fragment>
            ))}
          </small>
        </a>
      ))}
    </div>
  </div>
)}
  
        {/* Address with Location */}
        <div className="col-md-9">
          {/* HOME APPLIANCES */}
    <div
      className="shadow-lg rounded-4 p-3 mb-2"
      style={{
      color: "#000",
      }}
    >
      <h6 className="fw-bold text-center mb-2" style={{ letterSpacing: "1px" }}>
        Home Appliances
      </h6>
      <div className="d-flex justify-content-around align-items-center">
        {[
          {
            label: "Electrical",
            value: "Electrical Products",
            image: HomeElectricalImg,
          },
          {
            label: "Plumbing",
            value: "Plumbing Products",
            image: HomePlumbingImg,
          },
          {
            label: "Kitchenware",
            value: "Kitchenware Appliances",
            image: KitchenImg,
          },
        ].map((item) => (
          <div
            key={item.value}
            onClick={() => handleGroceryCategoryClick(item)}
            style={{
              cursor: "pointer",
              textAlign: "center",
              width: "90px",
            }}
          >
              <img
                src={item.image}
                alt={item.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            <small
              className="d-block mt-2 fw-semibold"
              style={{ fontSize: "12px" }}
            >
              {item.label}
            </small>
          </div>
        ))}
      </div>
    </div>

<div className="container"  style={{
   minHeight: "100vh",
  //  marginTop: `${HEADER_HEIGHT}px`,
   paddingTop: isMobile ? `${MOBILE_PADDING_TOP}px` : "0px",   
  }}>
  
  <div className="shadow-lg p-2 rounded-5 text-center bg-transparent border-0">
    <h5 className="fw-bold mb-1" style={{color: "#ff5722", fontSize: "20px"}}>
      Lakshmi Mart  
    </h5> 

<div className="row row-cols-3 row-cols-md-6 g-1">
  {firstCategories.map((cat) => (
    <div
       className="col"
        key={cat.label}
        onClick={() => handleGroceryCategoryClick(cat)}
        style={{ cursor: "pointer" }}   
    >
      <div
          className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
          style={{
            height: isMobile ? "130px" : "140px",
            width: isMobile ? "90px" : "120px",
            cursor: "pointer",
            padding: "6px",
            margin: "5px",
            opacity: 1, 
            pointerEvents: "auto", 
          }}
        >
          <img
            src={cat.image}
            alt={cat.label}
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "8px",
              marginTop: "2px",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              marginTop: "6px",
              minHeight: "24px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            {cat.label}
          </span>
        </div>
    </div>
  ))}
</div>
              
<div className="row row-cols-3 row-cols-md-5 g-1">
  {secondCategories.map((cat) => (
    <div
      className="col"
      key={cat.label}
      onClick={() => handleGroceryCategoryClick(cat)}
      style={{ cursor: "pointer" }}
    >
      <div
          className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
          style={{
            height: isMobile ? "120px" : "140px",
            width: isMobile ? "90px" : "120px",
            cursor: "pointer",
            padding: "6px",
            margin: "5px",
            opacity: 1, 
            pointerEvents: "auto", 
          }}
        >
          <img
            src={cat.image}
            alt={cat.label}
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "8px",
              marginTop: "2px",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              marginTop: "5px",
              minHeight: "24px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            {cat.label}
          </span>
        </div>
    </div>
  ))}
</div>
  </div>
  
  {/* Home Products Section */}
  <div className="shadow-lg p-2 mb-1 rounded-5 bg-transparent border-0">
    <h5 className="text-center fw-bold mb-3" style={{color: "#ff5722", fontSize: "20px"}}>Home Products</h5>
    <div className="row row-cols-3 row-cols-md-5 g-2 align-items-stretch">
      {categories.map((cat) => (
        <div
          className="col"
          key={cat.label}
          onClick={() => handleCategoryClick(cat)}
        >
          <div
            className="card border-0 shadow-sm text-center"
            style={{
              height: isMobile ? "120px" : "140px",
              width: isMobile ? "90px" : "120px",
              cursor: "pointer",
              padding: "8px",
              marginTop: "5px",
            }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontSize: "11px",        
                fontWeight: "500",
                marginTop: "5px",
                minHeight: "24px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              {cat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

   {/* Collections Section */}
  <div className="shadow-lg p-2 rounded-5 text-center bg-transparent border-0">
   <span
   style={{
    background: "linear-gradient(45deg, #ff4081, #ff9800, #ff5722)",
    backgroundClip: "text",             
    WebkitBackgroundClip: "text",       
    color: "transparent",              
    WebkitTextFillColor: "transparent",    
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    display: "inline-block",            
  }}
>
  Lakshmi Collections 
</span>
    <div className="row row-cols-3 row-cols-md-5 g-2">
      {collectionsCategories.map((cat) => (
        <div className="col" key={cat.label}  
        onClick={() => handleDressCategoryClick(cat)}
        >
          <div
            className="groceryIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
            style={{
              height: isMobile ? "120px" : "140px",
              width: isMobile ? "90px" : "120px",
              cursor: "pointer",
              padding: "8px",
              margin: "5px",
            }}
          >  
            <img
              src={cat.image}
              alt={cat.label}
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "8px",
                marginTop: "2px",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "500",
                marginBottom: "3px",
                marginTop: "5px",
                minHeight: "24px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              {cat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  {/* Dashboard Desktop */}
     {!isMobile ? (
  <>
    <h5 className="mb-2 fs-4">Dashboard</h5>
    <div className="row g-2">
      {menuList.map((menu, index) => (
        <div className="col-4" key={index}>
          {menu.MenuTitle === "Delivery Partner" ? (
            <div
              className="text-decoration-none"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={handleDeliveryPartnerClick}
            >
              <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center">
                <span className="material-symbols-outlined custom-icon" style={{ fontSize: "40px" }}>
                  {menu.MenuIcon}
                </span>
                <span className="fs-6">{menu.MenuTitle}</span>
              </div>
            </div>
          ) : (
            <a
              href={menu.TargetUrl}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div className="mnu_mn text-center d-flex flex-column justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                <span className="material-symbols-outlined custom-icon" style={{ fontSize: "40px" }}>
                  {menu.MenuIcon}
                </span>
                <span className="fs-6">{menu.MenuTitle}</span>
              </div>
            </a>
          )}
        </div>
      ))}
    </div>
  </>
) : null}

              {/* Tickets Section */}
              <div id="myTicketsSection" className="ticket-container">
                <div className="ticket-header">
                <h4 className="ticket-title">My Tickets</h4>
                </div>
      <div className="ticket-scroll" ref={ticketScrollRef}>
      {!loading && allTickets.length > 0 ? (
          allTickets.map((ticket, index) => (
              <div key={index} className={`ticket-card1 ${ticket.raiseTicketId ? "raise-ticket-bg" :ticket.martId ? "mart-ticket-bg" : ticket.lakshmiCollectionId ? "lakshmi-collection-bg" : ticket.buyProductId ? "buy-product-bg" : "book-technician-bg"}`}>
              <div className="ticket-content">
                <p><strong>{ticket.raiseTicketId ? "Raise TicketId": ticket.martId ? "Order Id" : ticket.lakshmiCollectionId? "Collection Id": ticket.buyProductId? "Buy ProductId" : "Book TechnicianId"}:</strong> {ticket.raiseTicketId|| ticket.martId || ticket.lakshmiCollectionId || ticket.buyProductId || ticket.bookTechnicianId}</p>
                {/* Show View Order only for Mart orders */}
{ticket.martId && (
  <>
  <p className="ticket-content fw-bold">
    Order:&nbsp;
    <button
      type="button"
      onClick={() => handleViewDetails(ticket)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      View Order
    </button>
  </p>
  <p className="fw-bold">Grand Total : {ticket.grandTotal} /-</p>
  </>
)}

                <p><strong>{ticket.subject ? "Subject:" : ticket.productName ? "Product Name" : ticket?.categoriess?.[0]?.productName ? "Collection Name" : ticket.productName ? "Job Description" : ""}</strong> {ticket.subject || ticket.productName || ticket?.categoriess?.[0]?.productName || ticket.jobDescription}</p>
                <p><strong>{ticket.category || ticket.lakshmiCollectionId ? "Category:" : "Delivery in 45 minutes"} </strong> {ticket.category || ticket?.categoriess?.[0]?.categoryName || ticket.category}</p>
                <p><strong>Status:</strong> 
                <span className={ticket.status.toLowerCase()}> {ticket.status}</span>
                </p> 
                <p><strong>{ticket.assignedTo ? "Assigned To" : "Payment Mode"}: </strong> {ticket.assignedTo || ticket.assignedTo || ticket.assignedTo || `${ticket.paymentMode} or UPI`}</p>
                <p><strong>Date:</strong> {ticket.date ? new Date(ticket.date).toLocaleDateString('en-GB') : "N/A"}</p>
              
                 {/* View Details Button */}
                  {ticket.paidAmount && (
                    <>
                      {/* Only show these if payment is done */}
                      <p><strong>Transaction Status:</strong> {ticket.transactionStatus}</p>
                      <p><strong>Paid Date:</strong> {ticket.orderDate}</p>
                    </>
                  )}
              </div>  
            </div>
          ))
        ) : ( 
          !loading && <p>No tickets found for this {userType}.</p>
        )}
      </div>
    </div>    
        </div>
        </div> 
        </div>
        </div>
       
        {/* First Order Cashback Modal */}
         <Modal
          show={showCashbackModal}
          onHide={() => setShowCashbackModal(false)}
          centered
          dialogClassName="cashback-modal"
        >
          <Modal.Body className="cashback-modal-body text-center">
            {showConfetti && (
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={5000}
                recycle={false}
              />
            )}
            <div className="cashback-badge">₹50 CASHBACK</div>
            <h3 className="cashback-title mt-3 mb-2">
              Thank You for Choosing <span>Handyman</span>!
            </h3>
            <p className="cashback-text mb-2">
              You&apos;ve got <strong>₹50 cashback</strong> on your first order.
            </p>
            <p className="cashback-subtext mb-4">
              Place your first order and you can avail this cashback offer on your bill.
            </p>
            <Button
              variant="light"
              className="cashback-cta-btn"
              onClick={() => setShowCashbackModal(false)}
            > Close
            </Button>
          </Modal.Body>
        </Modal> 
  
        {/* Modal for Mart Ticket Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "green", color: "white" }}
        >
          <Modal.Title style={{ color: "white" }}>Order Details</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: 0 }}>
          {selectedTicket && (
            <div>
              {/* Table Header */}
              <table className="table table-bordered table-striped mb-0">
                <thead className="table-success" style={{top: 0, zIndex: 2 }}>
                  <tr>
                    <th style={{ width: "10%" }}>S.No</th>
                    <th style={{ width: "40%" }}>Product Name</th>
                    <th style={{ width: "20%" }}>Quantity</th>
                    <th style={{ width: "30%" }}>Price (₹)</th>
                  </tr> 
                </thead>
              </table>

              {/* Scrollable Table Body */}
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table className="table table-bordered table-striped mb-0">
                  <tbody>
                    {selectedTicket.categories
                      ?.flatMap((cat) => cat.products)
                      .map((p, idx) => (
                        <tr key={idx}>
                          <td style={{ width: "10%" }}>{idx + 1}</td>
                          <td style={{ width: "40%" }}>{p.productName}</td>
                          <td style={{ width: "20%" }}>{p.noOfQuantity}</td>
                          <td style={{ width: "30%" }}>{Math.round(p.afterDiscountPrice)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Modal.Body>
        {/* Fixed Footer */}
       <Modal.Footer
  style={{
    position: "sticky",
    bottom: 0,
    background: "white",
    zIndex: 2,
    width: "100%",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      gap: "20px",
      flexWrap: "wrap",
      textAlign: "right",
    }}
  >
     <h5 className="mb-0">
      Total Amount: ₹
      {selectedTicket?.categories?.reduce(
        (sum, category) => sum + (category.totalAmount || 0),
        0
      )} /-
    </h5>

    {cashbackAmount > 0 && (
      <div className="fw-bold mb-0">
        <span className="text-danger me-2">Cashback Applied:</span>
        <span className="text-success">₹{Math.round(cashbackAmount)} /-</span>
      </div>
    )}
    <h5 className="mb-0">
      Grand Total: ₹{selectedTicket?.grandTotal} /-
    </h5>
  </div>
</Modal.Footer>
      </Modal>
      <Modal
  show={showOffersModal}
  onHide={() => setShowOffersModal(false)}
  centered
  scrollable
>
  <Modal.Header closeButton>
   <Modal.Title style={{ fontSize: "15px", fontWeight: "bold" }}>🎉Handyman Special Offer Sale!</Modal.Title>
  </Modal.Header>
  <Modal.Body>   
     {/* <ul style={{ paddingLeft: "10px" }}>
     <li>🛍️ New Users Get  → {" "} 
  <span style={{ color: "green", fontWeight: "bold" }}>₹50 in Wallet!</span> <br/></li>
      </ul> */}
     
     {/* <div className="container"> */}
          {/* <div className="row">
            {offers.map((offer, index) => (
              <div className="col-6 mb-1" key={index}>
                <div className="offer-card">
                  {/* Image 
                  {offer.img ? (
                    <img src={offer.img} alt="offer" className="offer-img" />
                  ) : (
                    <div className="offer-img-box"></div>
                  )}
                  {/* Text *
                 <div className="offer-condition">
                  {offer.condition.split("|").map((line, i) => (
                    <div key={i}>{highlightText(line)}</div>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div> */}
        {/* </div> */}
        <div className="text-center">
        <img  
          src={Poster} 
          alt="Grocery Offer Poster"
          style={{ width: "100%", maxWidth: "500px", height: "50%" }}
        />
      </div>
    <div className="text-center">
      {/* <b style={{ color: "red", fontSize: "14px" }}>
        💥 Handyman App – No Extra Charges. Pay Only Product Cost After Free Home Delivery.
      </b> <br/> */}
       <b style={{ color: "green",fontSize: "13px" }}>
        For any Queries Contact Customer Care: <span style={{color: "red", fontSize: "15px"}}>6281198953</span>
      </b>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="success" onClick={() => setShowOffersModal(false)}> 
      Shop Now 🛒
    </Button>
  </Modal.Footer>
</Modal>
         <Footer />
        </>    
  );
};
export default ProfilePage;


