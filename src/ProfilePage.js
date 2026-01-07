import React, { useState, useEffect, useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel as BsCarousel } from "bootstrap";
import './App.css';
import { Modal, Button} from 'react-bootstrap';
import Confetti from "react-confetti";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import NotificationBell from "./NotificationsBell";
// import OrdersNotificationBell from "./OrdersBellNotifications";
// import TrackStatusNotificationBell from "./TrackStatusBellNotifications";
import ImageCache from "./utils/ImageCache";
import axios from "axios";    
import Footer from './Footer.js';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RouteIcon from "@mui/icons-material/Route";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import AddToCartCount from "./AddToCartCount.js";
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UploadIcon from '@mui/icons-material/Upload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';  
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
// import Banner from './img/ChristmasVideo.mp4';
// import Banner2 from './img/MilkOffers.jpeg';   
// import Banner2 from './img/ChickenOffers.jpeg';
// import Banner2 from './img/DrinkOffers.jpeg';   F
// import Banner3 from './img/Above45.jpeg'; 
import BannerVideo from './img/PongalOffers.mp4';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';    
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import Banner3 from './img/banner-4.jpg';  
import { useNavigate, useParams } from "react-router-dom";   
import Logo from "./img/Hm_Logo 1.png";
import SearchIcon from "@mui/icons-material/Search";
// import ArticleIcon from '@mui/icons-material/Article';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LogoutIcon from "@mui/icons-material/Logout";   
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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
// import FamilyPackImg from './img/FamilyPack.jpeg';
// import PersonalCareImg from './img/PersonalCare.jpeg';
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
import Banner1Img from './img/50Cashback.jpeg';
import Banner2Img from './img/100Cashback.jpeg';
import Banner3Img from './img/300Cashback.jpeg';
import UnbeatableImg from './img/Unbeatable.jpeg';
import Above45Img from './img/Above45.jpeg';       
// import DeliveryImg from './img/DeliveryPoster.jpeg';
  
// import DeliveryImg from './img/DeliveryPoster.jpeg';      
// import BathImg from './img/bathImg.jpeg';
// import FlourImg from './img/FlourImg.jpeg';
// import FaceImg from './img/FaceImg.jpeg';  
// import NeedImg from './img/NeedsImg.jpeg';
// import RiceImg from './img/Ravva.jpeg';  
// import CoffeeImg from './img/Coffee.jpeg';
// import ThumsUpBottle from './img/thumsup.jpeg';
//import ReedemCode from "./ReedemCode";     
// import RedeemIcon from "@mui/icons-material/Redeem";

// function ReedemCode({
//   initialOpen = true,
//   userPoints = 0,          
//   onPointsChange,             
//   onSendRef,               
//   onRedeem,                
//   referrerId = "",
//   customerName,
//   showTrigger = false,     
//   badgeClassName = "redeem-badge",
//   openOverride,
//   onClose,        
//   closeOnInvite = true,    
//   initialConsumed = false,
// }) {
//   const [open, setOpen] = useState(initialOpen);
//   const [refs, setRefs] = useState(["", "", ""]);
//   const [status, setStatus] = useState(["", "", ""]);     
//   const [errors, setErrors] = useState(["", "", ""]);
//   const [submitting, setSubmitting] = useState(false);
//   const [consumed] = useState(initialConsumed);
//   const [polling, setPolling] = useState(false);
//   const mountedRef = useRef(false);
//   // Poll every 1s (as requested)
//   const POLL_MS = 1000;
//   // localStorage key for *awarded* points (per referrer)
//   const AWARDED_POINTS_KEY = useMemo(
//     () => `hm_referral_awarded_points_${referrerId || "guest"}`,
//     [referrerId]
//   );
//    // ----- external visibility control -----
//   useEffect(() => {
//     if (typeof openOverride === "boolean") setOpen(openOverride);
//   }, [openOverride]);

//   useEffect(() => {
//     if (initialOpen) setOpen(true);
//   }, [initialOpen]);

//   const closeDialog = useCallback(() => {
//     setOpen(false);
//     if (typeof onClose === "function") onClose();
//   }, [onClose]);

//   // ---------- helpers ----------
//   const onlyDigits10 = useCallback((v) => (v || "").replace(/\D/g, "").slice(0, 10), []);
//   const isTen = useCallback((v) => /^\d{10}$/.test(v || ""), []);
//   const isDuplicate = useCallback(
//     (val, idx, arr) => val && arr.some((v, i) => i !== idx && v === val),
//     []
//   );
//   const splitCsvNumbers = useCallback(
//     (csv = "") =>
//       (csv || "")
//         .split(",")
//         .map((s) => s.trim())
//         .filter(isTen)
//         .filter((v, i, arr) => arr.indexOf(v) === i),
//     [isTen]
//   );
//   const fixed4 = useCallback(
//     (arr) => [arr[0] || "", arr[1] || "", arr[2] || "", arr[3] || ""].join(","),
//     []
//   );

//   // ----- server calls -----
//   const checkNewOrExisting = useCallback(async (num) => {
//     try {
//       const res = await fetch(
//         `https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${encodeURIComponent(
//           num
//         )}`
//       );
//       const text = await res.text();
//       let data = null;
//       try { data = text ? JSON.parse(text) : null; } catch { data = null; }
//       // API contract: null => not existing
//       if (data === null) return "eligible"; 
//       return "exists";                      
//     } catch {
//       return "invalid";
//     }
//   }, []);

//   const isNowRegistered = useCallback(
//     async (num) => (await checkNewOrExisting(num)) === "exists",
//     [checkNewOrExisting]
//   );

//   const getReferralRecord = async (userId) => {
//   if (!userId) return null;
//   const url = `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/GetReferralPointsByUserId?referreId=${encodeURIComponent(
//     userId
//   )}`;
//   const res = await fetch(url);
//   const text = await res.text();
//   let data = [];
//   try { data = text ? JSON.parse(text) : []; } catch { data = []; }
//   if (Array.isArray(data) && data.length > 0) {
//     data.sort((a, b) => new Date(b.date) - new Date(a.date));
//     const record = data[0];
//     return record;
//   }
//   return null;
// };

// const hydrateFromServer = useCallback(async () => {
//   // If we already awarded earlier in this browser, respect that.
//   const lsAward = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0");
//   if (!Number.isFinite(lsAward)) {
//     try { localStorage.setItem(AWARDED_POINTS_KEY, "0"); } catch {}
//   }
//   // If no referrerId, treat as new/guest and show the modal if asked to.
//   if (!referrerId) {
//     if (initialOpen) setOpen(true);
//     return;
//   }
//   try {
//     const record = await getReferralRecord(referrerId);
//     // Brand-new user: no record yet → open popup if initialOpen
//     if (!record) {
//       if (initialOpen) setOpen(true);
//       // ensure awarded stays 0
//       try { localStorage.setItem(AWARDED_POINTS_KEY, "0"); } catch {}
//       return;
//     }
//     // Bind any server numbers
//     const serverNums = splitCsvNumbers(record.referralNumbers);
//     const nextRefs = [serverNums[0] || "", serverNums[1] || "", serverNums[2] || "", serverNums[3] || ""];
//     setRefs(nextRefs);
//     // Check which are registered now
//     const checks = await Promise.all(
//       nextRefs.map((n) => (isTen(n) ? isNowRegistered(n) : false))
//     );
//     const nextStatus = nextRefs.map((n, i) => {
//       if (!isTen(n)) return "";
//       return checks[i] ? "registered" : "not-registered-yet";
//     });
//     setStatus(nextStatus);
//     setErrors(["", "", "", ""]);
//     const regCount = nextStatus.filter((s) => s === "registered").length;
//     const allRegistered = regCount === 4;
//     if (allRegistered) {
//       // Award and close if fully registered already
//       try { localStorage.setItem(AWARDED_POINTS_KEY, "100"); } catch {}
//       if (typeof onPointsChange === "function") onPointsChange(100);
//       setOpen(false);
//       return;
//     }
//     // - If there are no numbers at all, or some pending, and we have not awarded yet → show modal
//     const hasAnyNumber = nextRefs.some((n) => isTen(n));
//     const alreadyAwarded = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0") === 100;
//     if (!alreadyAwarded && initialOpen && (!hasAnyNumber || regCount < 4)) {
//       setOpen(true);
//     }
//   } catch (e) {
//     console.error("Failed to fetch referral record:", e);
//     // If server fails and user wanted initial open, still open to let them enter numbers
//     if (initialOpen) setOpen(true);
//   }
// }, [referrerId, initialOpen, AWARDED_POINTS_KEY, splitCsvNumbers, isNowRegistered, isTen, onPointsChange]);

// useEffect(() => {
//   if (mountedRef.current) return;
//   mountedRef.current = true;
//   hydrateFromServer();
// }, [hydrateFromServer]);

// useEffect(() => {
//   hydrateFromServer();
// }, [hydrateFromServer, referrerId]);

//   // Keep dialog open while waiting; close only when fully done.
// useEffect(() => {
//   if (!open) return;
//   const allRegistered = status.every((s) => s === "registered") && status.some((s) => s);
//   if (allRegistered) closeDialog();
// }, [status, open, closeDialog]);

//   // ---------- input change ----------
//   const handlePhoneChange = async (index, raw) => {
//     const value = onlyDigits10(raw);
//     // Lock fields that are already registered
//     if (status[index] === "registered") return;
//     const nextRefs = [...refs];
//     nextRefs[index] = value;
//     setRefs(nextRefs);
//     const nextStatus = [...status];
//     const nextErrors = [...errors];
//     if (!value) {
//       nextStatus[index] = "";
//       nextErrors[index] = "";
//       setStatus(nextStatus);
//       setErrors(nextErrors);
//       return;
//     }
//     if (!isTen(value)) {
//       nextStatus[index] = "invalid";
//       nextErrors[index] = "Enter 10-digit mobile number.";
//       setStatus(nextStatus);
//       setErrors(nextErrors);
//       return;
//     }
//     if (isDuplicate(value, index, nextRefs)) {
//       nextStatus[index] = "invalid";
//       nextErrors[index] = "Duplicate number — enter a different one.";
//       setStatus(nextStatus);
//       setErrors(nextErrors);
//       return;
//     }
//     // Check with GuestUserVerification
//     nextStatus[index] = "checking";
//     nextErrors[index] = "";
//     setStatus([...nextStatus]);
//     setErrors([...nextErrors]);
//     const kind = await checkNewOrExisting(value);
//     if (kind === "eligible") {
//       // NEW number (good)
//       nextStatus[index] = "eligible";
//       nextErrors[index] = "";
//     } else if (kind === "exists") {
//       // Existing user (invalid per requirement)
//       nextStatus[index] = "invalid";
//       nextErrors[index] = "Already an existing user. Enter a NEW number.";
//     } else {
//       nextStatus[index] = "invalid";
//       nextErrors[index] = "Unable to verify number. Try again.";
//     }
//     setStatus([...nextStatus]);
//     setErrors([...nextErrors]);
//   };

//   // ---------- Invite is enabled only when all three NEW (eligible) ----------
//   const canInvite = useMemo(() => {
//     const ok = [0, 1, 2, 3].every((i) => isTen(refs[i]) && status[i] === "eligible");
//     return ok;
//   }, [refs, status, isTen]);

//   // ---------- Server upsert (store numbers only) ----------
//   const upsertReferral = async ({ record, numbersCsv }) => {
//     const payload = {
//       id: record?.id || "string",
//       date: record?.date || new Date().toISOString(),
//       referralNumbers: numbersCsv,
//       referreId: referrerId,
//       isReferralUsed :false,
//       referralPoints: String(
//         record?.referralPoints ??
//         record?.referralpoints ??
//         record?.ReferralPoints ??
//         record?.ReferralPoints ??
//         0
//       ),
//     };

//     if (record?.id) {
//       const putUrl = `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/UpdateReferralPoints?id=${encodeURIComponent(
//         record.id
//       )}`;
//       const r = await fetch(putUrl, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json; charset=utf-8" },
//         body: JSON.stringify(payload),
//       });
//       const t = await r.text();
//       let d = null;
//       try { d = t ? JSON.parse(t) : null; } catch {}
//       if (!r.ok) throw new Error(d?.message || `PUT failed: ${r.status}`);
//       return d || { ok: true };
//     } else {
//       const postUrl = `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/UploadReferralPoints`;
//       const r = await fetch(postUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json; charset=utf-8" },
//         body: JSON.stringify(payload),
//       });
//       const t = await r.text();
//       let d = null;
//       try { d = t ? JSON.parse(t) : null; } catch {}
//       if (!r.ok) throw new Error(d?.message || `POST failed: ${r.status}`);
//       return d || { ok: true };
//     }
//   };

//   // Always save (registered first, then eligible) in 3 slots
//   const buildNumbersCsvForSave = (currentRefs, currentStatus) => {
//     const locked = [];
//     const fill = [];
//     for (let i = 0; i < 4; i++)
//       if (currentStatus[i] === "registered") locked.push(currentRefs[i]);
//     for (let i = 0; i < 4; i++)
//       if (currentStatus[i] === "eligible") fill.push(currentRefs[i]);
//     const merged = [...locked, ...fill].filter(isTen).slice(0, 4);
//     return fixed4(merged);
//   };
//   // ---------- INVITE ----------
//   const handleRedeem = async () => {
//     try {
//       setSubmitting(true);
//       if (!canInvite) {
//         alert("Please enter three NEW (eligible) 10-digit numbers.");
//         return;
//       }
//       // 1) Save numbers to ReferralPoints (create or update)
//       const record = await getReferralRecord(referrerId);
//       const numbersCsv = buildNumbersCsvForSave(refs, status);
//       const numbersArr = splitCsvNumbers(numbersCsv);
//       await upsertReferral({ record, numbersCsv: fixed4(numbersArr), userId: referrerId });
//       // 2) Send promo SMS to all 4 new numbers
//       const smsRes = await fetch(`https://handymanapiv2.azurewebsites.net/api/Auth/sendpromosms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile: numbersArr.join(","), name: customerName }),
//       });
//       alert(`🎉 Thank you for referring your friend! ₹100 referral amount has been added to your wallet after your friend or neighbour registered. 🙏
//       Keep referring and keep earning more 💰✨`);
//       closeDialog();
//       if (!smsRes.ok) throw new Error(`Promo SMS failed: ${smsRes.status}`);
//       const nextStatus = [0, 1, 2, 3].map(() => "not-registered-yet");
//       setStatus(nextStatus);
//       setErrors(["", "", "", ""]);
//       setPolling(true);
//     } catch (err) {
//       console.error("Invite failed:", err);
//       alert(err.message || "Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ---------- Poll until all three become registered ----------
//   const recheckRegistration = useCallback(async () => {
//     const next = await Promise.all(
//       refs.map(async (n, i) => {
//         if (!isTen(n)) return "";
//         const was = status[i];
//         if (was === "registered") return "registered"; 
//         if (was === "" || was === "invalid") return was;
//         const reg = await isNowRegistered(n);
//         return reg ? "registered" : "not-registered-yet";
//       })
//     );
//     setStatus(next);
//     const regCount = next.filter((s) => s === "registered").length;
//     // Award coins only when 4/4 registered; persist to localStorage
//     if (regCount === 4) {
//       try { localStorage.setItem(AWARDED_POINTS_KEY, "100"); } catch {}
//       if (typeof onPointsChange === "function") onPointsChange(100);
//       setPolling(false);
//       if (closeOnInvite) closeDialog();
//       setTimeout(() => {
//       window.location.reload();
//     }, 800);
//     }
//   }, [refs, status, isTen, isNowRegistered, AWARDED_POINTS_KEY, onPointsChange, closeOnInvite, closeDialog]);

//   useEffect(() => {
//     if (!polling) return;
//     const hasPending = status.some((s) => s === "not-registered-yet");
//     if (!hasPending) {
//       setPolling(false);
//       return;
//     }
//     const id = setInterval(() => { recheckRegistration(); }, POLL_MS);
//     return () => clearInterval(id);
//   }, [polling, status, recheckRegistration]);

//   // ---------- UI helpers ----------
//   const inputDisabledGlobal = consumed; 
//   const renderIcon = (s) => {
//     if (s === "checking")
//       return <span style={{ fontSize: 12, position: "absolute", right: 8 }}>…</span>;
//     if (s === "eligible")
//       return (
//         <span title="New number (eligible)"
//           style={{ color: "#0ea5e9", fontSize: 16, position: "absolute", right: 8 }}>
//           ✔
//         </span>
//       );
//     if (s === "registered")
//       return (
//         <span title="User registered (locked)"
//           style={{ color: "green", fontSize: 16, position: "absolute", right: 8 }}>
//           ✔
//         </span>
//       );
//     if (s === "not-registered-yet" || s === "exists" || s === "invalid")
//       return (
//         <span
//           title={s === "not-registered-yet" ? "Not registered yet" : "Invalid or existing user"}
//           style={{ color: "red", fontSize: 16, position: "absolute", right: 8 }}>
//           ✖
//         </span>
//       );
//     return null;
//   };

//   return (
//     <div>
//       {/* Optional badge trigger — hidden by default on profile */}
//       {showTrigger && (
//         <button
//           type="button"
//           className={badgeClassName}
//           title="Redeem Coins"
//           aria-label="Redeem Coins"
//           onClick={() => setOpen(true)}
//           style={{ marginTop: 0, border: "none", background: "transparent", padding: 0 }}
//         >
//           <span style={{ display: "inline-flex" }}>{0}</span>
//         </button>
//       )}

//       {/* Modal */}
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="redeem-title"
//         style={{
//           position: "fixed",
//           inset: 0,
//           display: open ? "flex" : "none",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1055,
//           background: "rgba(0,0,0,0.3)"
//         }}
//       >
//         <div
//           role="document"
//           style={{
//             background: "#fff",
//             width: "100%",
//             maxWidth: 520,
//             borderRadius: 12,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "12px",
//               borderBottom: "1px solid #f3f4f6",
//             }}
//           >
//             <RedeemIcon fontSize="small" />
//             <h2 id="redeem-title" style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>
//               Referral Amount
//             </h2>
//             {/* We allow closing manually, but will re-open on hydrate if needed */}
//             <button
//               type="button"
//               aria-label="Close"
//               onClick={closeDialog}
//               style={{
//                 marginLeft: "auto",
//                 backgroundColor: "red",
//                 color: "white",
//                 border: "none",
//                 fontSize: 18,
//                 cursor: "pointer",
//                 borderRadius: "50%",
//                 width: "30px",
//                 height: "30px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center"
//               }}
//             >
//               ✕
//             </button>
//           </div>
//           <div style={{ padding: 10 }}>
//             {/* <p
//               style={{
//                 color: "#333",
//                 fontSize: "13px",
//                 fontWeight: 500,
//                 marginBottom: "8px",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               🪔 Invite <b>3 new friends</b> — get <b>₹100</b> after they register🪔
//             </p> */}
//             <div className="offer-line">
//               {/* <div className="diya-container">
//                 <span className="diya-icon flip-diya">🪔</span>
//               </div> */}
//               <span className="offer-text">
//                 🎉 Invite <b>4 New Friends</b> - Get <b>₹100</b> after they Register 🎉
//               </span>
//               {/* <div className="diya-container">
//                 <span className="diya-icon">🪔</span>
//               </div> */}
//             </div>
//             {[0, 1, 2, 3].map((i) => {
//               const v = refs[i];
//               const s = status[i];
//               const isLockedField = s === "registered" || inputDisabledGlobal;
//               const isInvalid = s === "invalid" || s === "exists";
//               const border =
//                 s === "registered"
//                   ? "1px solid green"
//                   : s === "eligible"
//                   ? "1px solid #16a34a"
//                   : isInvalid || s === "not-registered-yet"
//                   ? "1px solid red"
//                   : s === "checking"
//                   ? "1px dashed #9ca3af"
//                   : "1px solid #e5e7eb";

//               return (
//                 <div
//                   key={i}
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 4,
//                     marginBottom: errors[i] ? 18 : 8,
//                     position: "relative",
//                     width: "100%",
//                     maxWidth: 320,
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
//                     <input
//                       id={`ref-${i}`}
//                       type="text"
//                       inputMode="numeric"
//                       placeholder={`Enter Your Friend or Relative Phone Number ${i + 1}`}
//                       value={v}
//                       onChange={(e) => handlePhoneChange(i, e.target.value)}
//                       maxLength={10}
//                       readOnly={isLockedField}
//                       style={{
//                         flex: 1,
//                         padding: "8px",
//                         background: isLockedField ? "#f8fafc" : "white",
//                         cursor: isLockedField ? "not-allowed" : "text",
//                         border,
//                         borderRadius: 6,
//                         fontSize: 13,
//                       }}
//                     />
//                     {renderIcon(s)}
//                   </div>

//                   {errors[i] && <p style={{ color: "red", fontSize: 12 }}>{errors[i]}</p>}
//                   {s === "registered" && !inputDisabledGlobal && (
//                     <p style={{ color: "#16a34a", fontSize: 12 }}>
//                       Registered ✅ (locked)
//                     </p>
//                   )}
//                   {/* {s === "not-registered-yet" && !inputDisabledGlobal && (
//                     <p style={{ color: "#dc2626", fontSize: 12 }}>
//                       Not registered yet — we’ll keep checking.
//                     </p>
//                   )} */}
//                 </div>
//               );
//             })}
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 8,
//               padding: "12px",
//               borderTop: "1px solid #f3f4f6",
//             }}
//           >
//             <div>
//               <div className="text-danger blinking-text" style={{ margin: 0, fontSize: 14, fontWeight: "bold", textAlign: "center"}}>
//                🎉 Limited Time Only — Offer Ends 9th Nov! Don’t miss it 🎁
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => {
//                   if (inputDisabledGlobal) return;
//                   const nextRefs = [...refs];
//                   const nextStatus = [...status];
//                   const nextErrs = [...errors];
//                   [0, 1, 2, 3].forEach((i) => {
//                     if (nextStatus[i] !== "registered") {
//                       nextRefs[i] = "";
//                       nextStatus[i] = "";
//                       nextErrs[i] = "";
//                     }
//                   });
//                   setRefs(nextRefs);
//                   setStatus(nextStatus);
//                   setErrors(nextErrs);
//                 }}
//                 disabled={inputDisabledGlobal}
//               >
//                 Clear
//               </button>
//             </div>
//             <button
//               type="button"
//               className="btn btn-success"
//               onClick={handleRedeem}
//               disabled={!canInvite || submitting}
//               aria-disabled={!canInvite || submitting}
//             >
//               Invite
//             </button>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         .redeem-badge {
//           position: relative;
//           background: #d4af37;
//           color: #000;
//           width: 30px;
//           height: 30px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 12px;
//           font-weight: 600;
//           overflow: hidden;
//           box-shadow: 0 0 10px #ffd700;
//           animation: glowPulse 1.5s infinite ease-in-out;
//         }
//         .redeem-badge::before {
//           content: "";
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(
//             120deg,
//             rgba(255,255,255,0) 0%,
//             rgba(255,255,255,0.4) 50%,
//             rgba(255,255,255,0) 100%
//           );
//           transform: rotate(45deg) translateX(-120%);
//           animation: sparkleSweep 2.5s infinite;
//         }
//         @keyframes sparkleSweep {
//           0%   { transform: rotate(45deg) translateX(-120%); }
//           100% { transform: rotate(45deg) translateX(120%);  }
//         }
//         @keyframes glowPulse {
//           0%   { box-shadow: 0 0 5px #d4af37, 0 0 10px #d4af37, 0 0 20px #d4af37; transform: scale(1); }
//           50%  { box-shadow: 0 0 15px #ffd700, 0 0 30px #ffd700, 0 0 50px #ffd700; transform: scale(1.07); }
//           100% { box-shadow: 0 0 5px #d4af37, 0 0 10px #d4af37, 0 0 20px #d4af37; transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// };

const getMenuList = (userType, userId, category, district ,ZipCode,technicianFullName, isMobile) => {
  const iconSize = isMobile ? 20  : 40;
  const customer = [
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <PersonOutlineIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      ...(!isMobile ? [{MenuIcon: <LocalOfferIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Buy Product Offers", TargetUrl: `/offersIcons/${userType}/${userId}`
    }] : []),
      { MenuIcon: <ApartmentIcon sx={{ fontSize: 40 }} />,  MenuTitle: isMobile ? "Apartment AMC" : "Apartment Common Area Maintenance", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
    //   ...(!isMobile ? [{MenuIcon: <TrackStatusNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: isMobile ? "Track Ticket" : "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}`
    // }] : []),
    //   ...(!isMobile ? [{MenuIcon: <NotificationBell sx={{ fontSize: 40 }} />, MenuTitle: "Notifications", TargetUrl: `/customerNotification/${userType}/${userId}`
    // }] : []),
    //  ...(!isMobile ? [{MenuIcon: <OrdersNotificationBell sx={{ fontSize: iconSize }} />, MenuTitle: "Orders", TargetUrl: `/customerOrders/${userType}/${userId}`
    // }] : []),
    ...(!isMobile ? [{MenuIcon: <PermIdentityIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Accounts"
    }] : []),
    ...(!isMobile ? [{MenuIcon: <DeliveryDiningIcon sx={{ fontSize: iconSize }} />, MenuTitle: "Delivery Partner", TargetUrl: `/deliveryPartner/${userType}/${userId}`
    }] : []),
      ];

      const admin = [
      // { MenuIcon: <ShoppingCartIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Lakshmi Mart", TargetUrl: `/groceryIcons/${userType}/${userId}`},
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

  const builder = [
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Member" },
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote" },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications" },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: "/BuyProducts" },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account" },
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: "/TicketRaise" },
      { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status" }
  ];
 
  const dealer = [
      { MenuIcon: <UploadIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Upload Products" },
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote" },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account" },
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
  ];

  const trader = [
    { MenuIcon: <UploadIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Upload Products" },
    { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote"},
    { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications", TargetUrl: `/dealerNotifications/${userType}/${userId}/${category}/${district}` },
    { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
    { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account" },
    { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account"},
    { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
    { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status", TargetUrl: `/trackStatusNotifications/${userType}/${userId}` }
];

  const technician = [
      { MenuIcon: <PersonAddAltIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Technician"},
      { MenuIcon: <RequestQuoteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise a Quote", TargetUrl: `/notificationTechnician/${userType}/${userId}/${category}/${district}` },
      { MenuIcon: <NotificationsNoneIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Notifications" ,TargetUrl:`/technicianDetailsNotifications/${userType}/${userId}/${category}/${ZipCode}/${technicianFullName}`},
      { MenuIcon: <TransferWithinAStationIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Technician" },
      { MenuIcon: <PermIdentityIcon sx={{ fontSize: 40 }}/>, MenuTitle: "My Account"},
      { MenuIcon: <AccountBalanceIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Add Bank Account" },
      { MenuIcon: <StorefrontIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
      { MenuIcon: <SupportAgentIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
      { MenuIcon: <RouteIcon sx={{ fontSize: 40 }}/>, MenuTitle: "Track Ticket Status" }
  ]; 
     switch (userType) {
      case "builder":
          return builder;
      case "dealer":
          return dealer;
      case "trader":
          return trader;
      case "technician":
          return technician;
      case "customer":
       return customer; 
      case "admin":
          return admin; 
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
  { label: 'Unbeatable 10 Offers', value: 'Grocery Offers', image: UnbeatableImg },
  { label: 'Above 45% Offers', value: 'Offers', image: Above45Img },
  { label: 'Kitchenware Appliances', value: 'Kitchenware Appliances', image: KitchenImg },
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
  { label: 'Puja Essentials', value: 'Puja Essentials', image: PoojaImg },
  { label: 'Skin & Face Care', value: 'Skin & Face Care', image: SkinImg },
  { label: 'Bath & Body Care', value: 'Bath & Body Care', image: BathBodyImg },
  { label: 'Hair Care', value: 'Hair Care', image: HairImg },
  { label: 'Baby Products', value: 'Baby Products', image: BabyKidsImg },
  { label: 'Kids Zone', value: 'Kids Zone', image: KidsImg },
  { label: 'Health Care', value: 'Health Care', image: HealthImg },
  { label: 'DWCRA Products', value: 'DWCRA', image: DwakraProducts },
  { label: 'Chicken', value: 'Chicken', image: ChickenImg },
];

const collectionsCategories = [
  { label: 'Dupatta Sets', value: 'Dupatta Sets', image: setkurti },
  { label: 'Kurta Sets', value: 'Kurta Sets', image: kurti},
  ];

  // const API_URL = "https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetAllGroceryItems";
  const IMAGE_API =
  "https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=";

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
    // const [loading, setLoading] = useState(true); 
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
    const [selectedCategory, setSelectedCategory] = useState(null);
     const videoRef = useRef(null);
// const [isMuted] = useState(true);
// const [isMuted, setIsMuted] = useState(true);
const [unreadCount, setUnreadCount] = useState(0);
const [messageCounts, setMessageCounts] = useState({
  news:     0,
  buysell:  0,
  tolet:    0  
});    
const [grocery, setGrocery] = useState([]);
const [cartSummary, setCartSummary] = useState({
  items: 0,
  total: 0,  
  products: [],
}); 
// const [dress] = useState([]);
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
const [isPickup] = useState(false);
// const [isPickup, setIsPickup] = useState(false);
const [cartData, setCartData] = useState(null);
const [transactionDetails, setTransactionDetails] = useState('');
const [transactionStatus, setTransactionStatus] = useState('');
const [longitude, setLongitude] = useState('');
const [latitude, setLatitude] = useState('');
const [paidAmount, setPaidAmount] = useState('');
const [date, setDate] = useState('');
// const [customerId, setCustomerId] = useState('');
const [grandTotal, setGrandTotal] = useState('');
const [items, setItems] = useState('');
const [assignedTo, setAssignedTo] = useState('');
const [deliveryPartnerUserId, setDeliveryPartnerUserId] = useState('');
// const [customerName, setCustomerName] = useState('');
const [totalItemsSelected, setTotalItemsSelected] = useState('');
const [transactionNumber, setTransactionNumber] = useState('');
const [city, setCity] = useState('');
const HEADER_H = 20;          
const MOBILE_ICONS_H = 20; 
const MOBILE_EXTRA =20;     
const MOBILE_PADDING_TOP = HEADER_H + MOBILE_ICONS_H + MOBILE_EXTRA;
const [cartImages, setCartImages] = useState({});
const [showCashbackModal, setShowCashbackModal] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);
const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});
const [hasCheckedFirstOrder, setHasCheckedFirstOrder] = useState(false);
const [cashbackAmount, setCashbackAmount] = useState(0);
const [cart, setCart] = useState({});
const [showZoomModal, setShowZoomModal] = useState(false);
const [zoomImage, setZoomImage] = useState("");
const [zoomProduct, setZoomProduct] = useState(null);
const displayProducts =
searchQuery.trim().length > 0 ? filteredProducts : products;
const [imageLoading, setImageLoading] = useState(true);
const [placeholderIndex, setPlaceholderIndex] = useState(0);
const carouselRef = useRef(null);
const carouselInstance = useRef(null);
const firstCategories = groceryCategories.slice(0, 6);
const secondCategories = groceryCategories.slice(6, 15);
const thirdCategories = groceryCategories.slice(15, 24);
const fourthCategories = groceryCategories.slice(24, 30);

useEffect(() => {
  if (!carouselRef.current || carouselInstance.current) return;
  carouselInstance.current = new BsCarousel(carouselRef.current, {
    interval: 3000,
    ride: "carousel",
    pause: false,
    wrap: true,
    touch: true,
  });
  carouselInstance.current.cycle();
  return () => {
    carouselInstance.current?.dispose();
    carouselInstance.current = null;
  };
}, []);

const placeholderSuggestions = [
  'Search "Milk"',
  'Search "Freedom Refined Sunflower Oil"',
  'Search "Sona Masoori Rice"',
  'Search "Paneer"',
  'Search "Red Label"',
  'Search "Coffee"',
  'Search "Aashirvaad"',
  'Search "Surf Excel"',
  'Search "Toothpaste"',
  'Search "Lizol"',
  'Search "Maggi"',
  'Search "Horlicks"',
  'Search "Eggs"',
  'Search "Chocolate"',
  'Search "Butter"',
  'Search "Bread"',
  'Search "Chicken"',
  'Search "Shampoo"',
  'Search "Soap"',
];

useEffect(() => {
  const interval = setInterval(() => {
    setPlaceholderIndex((prev) => (prev + 1) % placeholderSuggestions.length);
  }, 1500); 
  return () => clearInterval(interval);
}, [placeholderSuggestions.length]);

useEffect(() => {
  console.log( imageLoading, zoomProduct, zoomImage, showZoomModal, cartSummary, items, grocery,error, unreadCount, showMenu, products, selectedCategory, dress);
}, [imageLoading, zoomProduct, zoomImage, showZoomModal, cartSummary, items, grocery, error,unreadCount, showMenu, products, selectedCategory, dress]);
 
function getItemTime(p) {
  if (p?.date) {
    const t = Date.parse(p.date); 
    if (!Number.isNaN(t)) return t;
  }

  const candidates = [
    p.createdAt, p.created_on, p.createdDate, p.createDate,
    p.updatedAt, p.updated_on, p.modifiedAt, p.modified_on,
    p.addedDate, p.added_at, p.timestamp, p.timeStamp,
  ];
  for (const c of candidates) {
    const t = Date.parse(c);
    if (!Number.isNaN(t)) return t;
  }

  if (typeof p.id === "number") return p.id;
  const idNum = Number(String(p.id || "").replace(/\D/g, "")) || 0;
  return idNum;
}

useEffect(() => {
  if (!selectedCategory) return;
  let cancelled = false;
  const controller = new AbortController();
  const POLL_MS = 2000;
  let pollId = null;

  const category = selectedCategory; 
  async function fetchProductsAndFirstImages(warm = false, signal) {
    try {
      if (!warm) setImageLoading(true);

      // No encodeURIComponent used
      const url = `https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetGroceryItemsBycategory?Category=${category}`;

      const { data: items } = await axios.get(url, { signal });
      const safeItems = Array.isArray(items) ? items : [];

      if (cancelled) return;

      const sorted = [...safeItems].sort((a, b) => {
        const tb = getItemTime(b);
        const ta = getItemTime(a);
        if (tb !== ta) return tb - ta;
        return String(b.id).localeCompare(String(a.id));
      });

      setProducts(sorted);

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
            `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`,
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
  pollId = setInterval(() => {
    const pollController = new AbortController();
    fetchProductsAndFirstImages(true, pollController.signal);
  }, POLL_MS);

  return () => {
    cancelled = true;
    controller.abort();
    if (pollId) clearInterval(pollId);
  };
}, [selectedCategory]); // use selectedCategory only

// const cartProducts = React.useMemo(() => {
//   try {
//     const raw = localStorage.getItem("allCategories");
//     if (!raw) return [];
//     const categories = JSON.parse(raw);   
//     return categories.flatMap(cat =>
//       (cat.products || []).filter(p => Number(p.qty) > 0)
//     );
//   } catch {
//     return [];
//   }
// }, []);

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

// useEffect(() => {
//   const categories = JSON.parse(localStorage.getItem("allCategories") || "[]");
//   const products = categories.flatMap(cat => cat.products || []);
//   products.forEach(async (p) => {
//     if (!p.images?.[0] || cartImages[p.id]) return;
//     try {
//       const res = await fetch(
//         `${IMAGE_API}${encodeURIComponent(p.images[0])}`
//       );
//       const json = await res.json();
//       if (json?.imageData) {
//         setCartImages(prev => ({
//           ...prev,
//           [p.id]: `data:image/jpeg;base64,${json.imageData}`,
//         }));
//       }
//     } catch (e) {
//       console.error("Cart image load failed", e);
//     }
//   });
// }, [cartImages]);


// const norm = (s) => String(s || "").trim().toLowerCase();
// const isOffersCat = (cat) => norm(cat) === "offers";
// function decideCartRoute(products) {
//   const hasOffers = (products || []).some(p => isOffersCat(p.category));
//   const hasNonOffers = (products || []).some(p => !isOffersCat(p.category));
//   if (hasOffers && !hasNonOffers) return "groceryOffersCart";
// if (hasNonOffers && !hasOffers) return "groceryCart";
//   return "groceryCart";
// }
// const [showCashbackModal] = useState(false);
// Grocery Search & Filter States
// const [allGroceryProducts, setAllGroceryProducts] = useState([]);
// const [filteredGroceryProducts, setFilteredGroceryProducts] = useState([]);
// const [activeGroceryCategory, setActiveGroceryCategory] = useState(null);
// const [grocerySearch, setGrocerySearch] = useState("");
// const [groceryLoading, setGroceryLoading] = useState(false);
// const [groceryQty, setGroceryQty] = useState({});

// const increaseQty = (product) => {
//   setGroceryQty((prev) => ({
//     ...prev,
//     [product.id]: (prev[product.id] || 0) + 1,
//   }));
// };

// const decreaseQty = (product) => {
//   setGroceryQty((prev) => {
//     const current = prev[product.id] || 0;
//     if (current <= 1) {
//       const copy = { ...prev };
//       delete copy[product.id];
//       return copy;
//     }
//     return {
//       ...prev,
//       [product.id]: current - 1,
//     };
//   });
// };

// useEffect(() => {
//   const fetchAllGroceries = async () => {
//     setGroceryLoading(true);
//     try {
//       const res = await axios.get(
//         "https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetAllGroceryItems"
//       );
//       setAllGroceryProducts(res.data || []);
//     } catch (err) {
//       console.error("Error fetching grocery items", err);
//     } finally {
//       setGroceryLoading(false);
//     }
//   };
//   fetchAllGroceries();
// }, []);

// useEffect(() => {
//   let result = allGroceryProducts.filter(
//     (p) => p.status === "Approved"
//   );
//   if (grocerySearch.trim()) {
//     result = result.filter((p) =>
//       p.name.toLowerCase().includes(grocerySearch.toLowerCase())
//     );
//   } else if (activeGroceryCategory) {
//     result = result.filter(
//       (p) => p.category === activeGroceryCategory
//     );
//   } else {
//     result = [];
//   }
//   setFilteredGroceryProducts(result);
// }, [grocerySearch, activeGroceryCategory, allGroceryProducts]);

// const getGroceryImage = (p) => {
//   if (!p?.images || p.images.length === 0) {
//     return "/no-image.png"; 
//   }
//   return `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${encodeURIComponent(
//     p.images[0]
//   )}`;
// };

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

// const [showRedeem, setShowRedeem] = useState(false);
// const [refRecord, setRefRecord] = useState(null);
// const [refLoading, setRefLoading] = useState(true);
// const [shouldShowGetCoins, setShouldShowGetCoins] = useState(false);
// const [referralPoints, setReferralPoints] = useState('');
// const [awardedPoints, setAwardedPoints] = useState(0);
// const [awardLoading, setAwardLoading] = useState(true);
// const [userPoints, setUserPoints] = useState(0);        
// const [pointsLoading, setPointsLoading] = useState(true);
// const [claimAvailable, setClaimAvailable] = useState(false); 
// const AWARDED_POINTS_KEY = `hm_referral_awarded_points_${userId || "guest"}`; 
// const [isReferralUsed, setIsReferralUsed] = useState(false);
//  const [showConfetti, setShowConfetti] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//   const [redeemOpen, setRedeemOpen] = useState(false);
//    const shouldMountRedeem = redeemOpen;
// const [windowSize, setWindowSize] = useState({
//   width: typeof window !== "undefined" ? window.innerWidth : 0,
//   height: typeof window !== "undefined" ? window.innerHeight : 0,
// });
// const [displayNumbers, setDisplayNumbers] = useState("");
// redeemOpen, showRedeem, awardLoading,  awardedPoints, referralPoints,

// const checkNewOrExisting = useCallback(async (num) => {
//   try {
//     const res = await fetch(
//       `https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${encodeURIComponent(
//         num
//       )}`
//     );
//     const text = await res.text();
//     let data = null;
//     try { data = text ? JSON.parse(text) : null; } catch { data = null; }
//     if (data === null) return "not registered";
//     return "registered";
//   } catch {
//     return "invalid";
//   }
// }, []);

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

// useEffect(() => {
//   const onResize = () => {
//     setWindowSize({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     });
//   };
//   window.addEventListener("resize", onResize);
//   return () => window.removeEventListener("resize", onResize);
// }, []);

// useEffect(() => {
//   const checkNewUser = async () => {
//     try {
//       const rec = await getReferralRecord(userId);
//       if (!rec || readServerPoints(rec) === 0) {
//         setShowRedeem(true);   
//       } else {
//         setShowRedeem(false);
//       }
//     } catch (err) {
//       setShowRedeem(true);
//     }
//   };
//   if (userId) checkNewUser();
// }, [userId]);

// useEffect(() => {
//   let cancelled = false;
//   (async () => {
//     try {
//       // 1) Server points (authoritative UI value)
//       const rec = await getReferralRecord(userId);
//       const serverPts = rec ? readServerPoints(rec) : 0;
//       // 2) Local award (pending 100 from Redeem flow)
//       let localAward = 0;
//       try { localAward = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0"); } catch {}
//       if (!cancelled) {
//         setUserPoints(serverPts);
//         // Enable "Get Coins" ONLY when server is still 0 AND local says 100 is ready
//         setClaimAvailable(serverPts === 0 && localAward === 100);
//       }
//     } catch {
//       if (!cancelled) {
//         setUserPoints(0);
//         setClaimAvailable(false);
//       }
//     } finally {
//       if (!cancelled) setPointsLoading(false);
//     }
//   })();
//   return () => { cancelled = true; };
// }, [userId, AWARDED_POINTS_KEY]);

// useEffect(() => {
//   const fetchReferral = async () => {
//     try {
//       const rec = await getReferralRecord(userId);
//       if (rec) {
//         const raw =
//           rec?.referralPoints ??
//           rec?.referralpoints ??
//           rec?.ReferralPoints ??
//           rec?.ReferralPoints ??
//           0;
//         const pointsValue = Number(raw) || 0;
//         setReferralPoints(pointsValue);
//         setShouldShowGetCoins(pointsValue === 0); 
//       } else {
//         setReferralPoints(0);
//         setShouldShowGetCoins(true); 
//       }
//     } catch (e) {
//       console.error("Failed to load referral points:", e);
//       setShouldShowGetCoins(false);
//     }
//   };
//   fetchReferral();
// }, [userId]);

// // load once
// useEffect(() => {
//   let cancelled = false;
//   (async () => {
//     try {
//       const rec = await getReferralRecord(userId);
//       if (!cancelled) setRefRecord(rec);
//     } finally {
//       if (!cancelled) setRefLoading(false);
//     }
//   })();
//   return () => { cancelled = true; };
// }, [userId]);

// // formatter (optional): clean, unique, spaced
// // const displayNumbers = (refRecord?.referralNumbers || "")
// //   .split(",")
// //   .map(s => s.trim())
// //   .filter(Boolean)
// //   .filter((v, i, a) => a.indexOf(v) === i)
// //   .join(", ");

// // ---- load once for this user ----
// useEffect(() => {
//   let cancelled = false;
//   (async () => {
//     try {
//       const rec = await getReferralRecord(userId);
//       const pts = rec ? readServerPoints(rec) : 0;
//       if (!cancelled) setUserPoints(pts);
//     } catch {
//       if (!cancelled) setUserPoints(0);
//     } finally {
//       if (!cancelled) setPointsLoading(false);
//     }
//   })();
//   return () => { cancelled = true; };
// }, [userId]);

// // KEY used by ReedemCode
// const awardKeyFor = (uid) => `hm_referral_awarded_points_${uid || "guest"}`;

// // Read localStorage award (100 only if all 3 registered) — doesn't change UI points
// useEffect(() => {
//   const KEY = awardKeyFor(userId);
//   const readAward = () => {
//     try {
//       const raw = localStorage.getItem(KEY);
//       const n = Number(raw);
//       setAwardedPoints(Number.isFinite(n) ? n : 0);
//     } catch {
//       setAwardedPoints(0);
//     } finally {
//       setAwardLoading(false);
//     }
//   };
//   readAward();
//   const onStorage = (e) => { if (e.key === KEY) readAward(); };
//   window.addEventListener("storage", onStorage);
//   return () => window.removeEventListener("storage", onStorage);
// }, [userId]);

// // When clicked, PUT 100 on server, update UI, clear local award
// useEffect(() => {
//   const KEY = awardKeyFor(userId);
//   const readAward = () => {
//     try {
//       const raw = localStorage.getItem(KEY);
//       const n = Number(raw);
//       setAwardedPoints(Number.isFinite(n) ? n : 0);
//     } catch {
//       setAwardedPoints(0);
//     } finally {
//       setAwardLoading(false);
//     }
//   };
//   readAward(); 
//   // keep in sync if another tab updates
//   const onStorage = (e) => {
//     if (e.key === KEY) readAward();
//   };
//   window.addEventListener("storage", onStorage);
//   return () => window.removeEventListener("storage", onStorage);
// }, [userId]);

// // ---- helpers (keep near your other helpers) ----
//  const getReferralRecord = async (userId) => {
//   if (!userId) return null;
//   const url = `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/GetReferralPointsByUserId?referreId=${encodeURIComponent(
//     userId
//   )}`;
//   const res = await fetch(url);
//   const text = await res.text();
//   let data = [];
//   try { data = text ? JSON.parse(text) : []; } catch { data = []; }
//   if (Array.isArray(data) && data.length > 0) {
//     data.sort((a, b) => new Date(b.date) - new Date(a.date));
//     const record = data[0];
//     setReferralPoints(Number(record.referralpoints));  
//     setIsReferralUsed(record.isReferralUsed);
//     return record;
//   }
//   setReferralPoints(0);
//   setIsReferralUsed(false);
//   return null;
// };

// const readServerPoints = (record) => {
//   const raw =
//     record?.referralPoints ??
//     record?.referralpoints ??
//     record?.ReferralPoints ??
//     record?.ReferralPoints ??
//     0;
//   const n = Number(raw);
//   return Number.isFinite(n) ? n : 0;
// };

// const handleGetCoins = async () => {
//   if (!claimAvailable || pointsLoading) return;
//   try {
//     setPointsLoading(true);
//     setShowConfetti(true);
//     setShowMessage(true);

//     // Stop confetti after 4 seconds
//     setTimeout(() => {
//       setShowConfetti(false);
//     }, 4000);

//     // Hide message after 5 seconds
//     setTimeout(() => {
//       setShowMessage(false);
//     }, 5000);
//     // Re-check pending award
//     const localAward = Number(localStorage.getItem(AWARDED_POINTS_KEY) || "0");
//     if (localAward !== 100) {
//       setClaimAvailable(false);
//       return;
//     }
//     // Get latest referral record
//     const rec = await getReferralRecord(userId);
//     if (!rec?.id) {
//       alert("No referral record found to credit coins.");
//       return;
//     }
//     // PUT: set referralPoints to "100"
//     const payload = {
//       id: rec.id,
//       date: rec.date,
//       referralNumbers: rec.referralNumbers ?? "",
//       referreId: rec.referreId ?? userId ?? "",
//       isReferralUsed :false,
//       referralPoints: "100", 
//     };
//     const putUrl = `https://handymanapiv2.azurewebsites.net/api/ReferralPoints/UpdateReferralPoints?id=${encodeURIComponent(rec.id)}`;
//     const r = await fetch(putUrl, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json; charset=utf-8" },
//       body: JSON.stringify(payload),
//     });
//     if (!r.ok) {
//       const t = await r.text().catch(() => "");
//       throw new Error(`Failed to credit coins (${r.status}). ${t}`);
//     }
//     // Success → reflect in UI + clear local pending
//     setUserPoints(100);
//     setClaimAvailable(false);
//     try { localStorage.setItem(AWARDED_POINTS_KEY, "0"); } catch {}
//   } catch (err) {
//     console.error("Get Coins failed:", err);
//     alert(err.message || "Something went wrong while applying coins.");
//   } finally {
//     setPointsLoading(false);
//   }
// };

// // Read silent award from localStorage and listen for changes
// useEffect(() => {
//   const key = awardKeyFor(userId);
//   const readNow = () => {
//     try {
//       const raw = localStorage.getItem(key);
//       const n = Number(raw);
//       setAwardedPoints(Number.isFinite(n) ? n : 0);
//     } catch {
//       setAwardedPoints(0);
//     } finally {
//       setAwardLoading(false);
//     }
//   };
//   readNow();
//   const onStorage = (e) => {
//     if (e.key === key) readNow();
//   };
//   window.addEventListener("storage", onStorage);
//   return () => window.removeEventListener("storage", onStorage);
// }, [userId]);

// useEffect(() => {
//   let cancelled = false;
//   const bootstrapReferrals = async () => {
//     if (!userId) return;
//     const rec = await getReferralRecord(userId);
//     if (!rec) {
//       // brand-new user: open popup and start with 0 points
//       if (!cancelled) {
//         setShowRedeem(true);
//         setUserPoints(0);
//       }
//       return;
//     }
//     // existing record: load points into UI
//     const serverPts = Math.min(readServerPoints(rec), 150);
//     if (!cancelled) {
//       setUserPoints(serverPts);
//       // if they have no numbers and 0 points -> treat as new-ish, open it
//       const hasNumbers = Boolean((rec.referralNumbers || "").trim());
//       if (!hasNumbers && serverPts === 0) {
//         setShowRedeem(true);
//       } else {
//         setShowRedeem(false);
//       }
//     }
//   };
//   bootstrapReferrals();
//   return () => { cancelled = true; };
// }, [userId]);

//   const handleSendRef = async (index, referralValue) => {
//     console.log("sendRef", { index, referralValue });
//   };

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

   const handleImageClick = (imageSrc, product) => {
  setZoomImage(imageSrc);
  setZoomProduct(product);       
  setShowZoomModal(true);
};
  /* ================= VOICE SEARCH ================= */
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

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://handymanapiv2.azurewebsites.net/api/UploadGrocery/GetAllGroceryItems`);
        setAllProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching grocery items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  /* ================= CART HANDLERS ================= */
//  const handleAddClick = (product) => {
//   setCart(prev => ({ ...prev, [product.id]: 1 }));
//   updateLocalStorageCart(product, 1);
// };

const handleAddClick = (product) => {
  // const imageSource =
  //   product.generatedFileName ||
  //   (product.imageData ? base64ToBlobUrl(product.imageData) : "");
  updateLocalStorageCart(
    {
      ...product,
     imageFile: product.images?.[0] || ""
    },
    1
  );
  setCart(prev => ({ ...prev, [product.id]: 1 }));
};

 const handleIncrement = (product, stockLeft) => {
  setCart(prev => {
    const qty = prev[product.id] || 0;
    if (qty >= stockLeft) return prev;
    const newQty = qty + 1;
    updateLocalStorageCart(product, newQty);
    return { ...prev, [product.id]: newQty };
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

  const canAddMore = (id, stockLeft) => (cart[id] || 0) < stockLeft;

// useEffect(() => {
//   const element = document.getElementById("productCarousel");
//   if (!element) return;
//   if (element._bsCarouselInstance) {
//     element._bsCarouselInstance.dispose();
//   }
//   const carousel = new BsCarousel(element, {
//     interval: 2000,   
//     ride: "carousel", 
//     pause: false,     
//     wrap: true,       
//   });
//   element._bsCarouselInstance = carousel;
//   return () => {
//     carousel.dispose();
//     element._bsCarouselInstance = null;
//   };
// }, []);

// // cashback logic
useEffect(() => {
  if (!showCashbackModal) return; 
  const timer = setTimeout(() => {
    setShowCashbackModal(false);
  }, 5000);
  return () => clearTimeout(timer); 
}, [showCashbackModal]);

useEffect(() => {
  // Cricket logic 
  // if (!animationCompleted) return;  
  if (!profile.mobileNumber) {
    console.log("CheckFirstOrder: no mobileNumber yet");
    return;
  }
  const alreadyShown = localStorage.getItem("handymanFirstOrderPopupShown");
  if (alreadyShown === "true") {
    console.log("Cashback popup shown");
    return;
  }
  if (hasCheckedFirstOrder) {
    console.log("CheckFirstOrder: already checked, skipping");
    return;
  }
  console.log("CheckFirstOrder: starting for", profile.mobileNumber);
  const checkFirstOrder = async () => {
    try {
      const url = `https://handymanapiv2.azurewebsites.net/api/Mart/CheckFirstOrder?CustomerPhoneNumber=${profile.mobileNumber}`;
      const response = await fetch(url);
      const rawText = await response.text();
      console.log("CheckFirstOrder response status:", response.status);
      console.log("CheckFirstOrder rawText:", rawText);
      const text = (rawText || "").trim().toLowerCase();
      if (text.includes("firstorder can not be found")) {
        console.log("Match found -> opening cashback modal");
         setShowCashbackModal(true);
       } else {
        console.log("No match in response text, not showing modal");
      }
    } catch (err) {
      console.error("Error calling CheckFirstOrder:", err);
    } finally {
      setHasCheckedFirstOrder(true);
    }
  };
  checkFirstOrder();
}, [profile.mobileNumber, hasCheckedFirstOrder]);

useEffect(() => {
  const fetchDeliveryData = async () => {
    try { 
      const response = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/Mart/GetProductDetails?id=${id}`
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

      // if ((cashback >= 49 && cashback <= 51) || (cashback >= 99 && cashback <= 101))
      if ((cashback >= 49 && cashback <= 51) || (cashback >= 99 && cashback <= 101) || (cashback >= 299 && cashback <= 301))
      // if ((cashback >= 99 && cashback <= 101))
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
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/GetMartTicketsByUserId?userId=${userId}`);
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
      `https://handymanapiv2.azurewebsites.net/api/DeliveryPartner/GetDeliveryPartnerDetailsByUserId?userId=${userId}`
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

// useEffect(() => {
//   const updateCartSummary = () => {
//     let savedCategories = [];
//     try {
//       const raw = localStorage.getItem("allCategories");
//       if (raw) {
//         const parsed = JSON.parse(raw);
//         savedCategories = Array.isArray(parsed) ? parsed : [parsed];
//       }
//     } catch (e) {
//       console.error("Invalid JSON in localStorage:", e);
//     }
//     let items = 0, total = 0, products = [];
//     savedCategories.forEach((cat) => {
//       (cat.products || []).forEach((p) => {
//         if (Number(p.qty) > 0) {
//           items += Number(p.qty);
//           const afterDiscountPrice = Number(
//             p.afterDiscountPrice || p.price || p.finalPrice || 0
//           );
//           total += afterDiscountPrice * Number(p.qty);
//           products.push({
//             id: p.productId || p.id,
//             productName: p.productName || p.name || "",
//             image: p.image || p.img || "",
//             mrp: Number(p.mrp) || Number(p.mrpPrice) || 0,
//             discount: Number(p.discount) || Number(p.discountPercent) || 0,
//             afterDiscountPrice,
//             qty: Number(p.qty),
//             category: cat.categoryName,
//           });
//         }
//       });
//     });
//     setCartSummary({ items, total, products });
//     console.log("cartSummary:", { items, total, products });
//   };
//   updateCartSummary();
//   window.addEventListener("storage", updateCartSummary);
//   return () => window.removeEventListener("storage", updateCartSummary);
// }, []);

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
    isPickUp: isPickup,
    isDelivered: false,    
  };

    let response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Mart/UpdateProductDetails/${id}`, {
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
  const storedCounts = localStorage.getItem("chatCounts");
  if (storedCounts) {
    try { 
      const parsedCounts = JSON.parse(storedCounts);
      setMessageCounts(parsedCounts); 
    } catch (err) {
      console.error("Error parsing stored counts:", err);
    }
  }
}, []);

const totalUnreadMessages = messageCounts.news + messageCounts.buysell + messageCounts.tolet;

  // const toggleMute = () => {
  //   const video = videoRef.current;
  //   if (video) {
  //     video.muted = !isMuted; 
  //     setIsMuted(!isMuted);
  //   }
  // };

  useEffect(() => {
  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessages`);
      const data = await response.json();
      const lastReadTime = localStorage.getItem('lastReadTime');
      const unreadMessages = data.filter(msg => {
        return !lastReadTime || new Date(msg.dateTime) > new Date(lastReadTime);
      });
      setUnreadCount(unreadMessages.length);         
    } catch (error) {
      console.error("Failed to fetch unread message count:", error);
    }
  };
  if (userId && userType) {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }
}, [userId, userType]);

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
// useEffect(() => {
//   const autoOpenForNewUser = async () => {
//     if (!userId) return;
//     try {
//       const rec = await getReferralRecord(userId);
//       if (!rec) {
//         // first time only
//         setRedeemOpen(true);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   autoOpenForNewUser();
// }, [userId]);

// const handleCrazyDealsGroceryClick = async (category) => {
//   const { value } = category;
//   try {
//     setSelectedCategory(category);
//     setGrocery([]);
//     setError("");
//     const encodedCategory = encodeURIComponent(value);
//     localStorage.setItem("encodedCategory", encodedCategory);
//     navigate(`/groceryCrazyOffers/${userType}/${userId}`);
//     //   {
//     //     state: { encodedCategory, userPoints },  
//     // });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     setGrocery([]);
//     setError(`Oops! No grocery items found for ${value} category.`);
//   }
// };

const handleGroceryCategoryClick = async (category) => {
  const { value } = category;
  try {
    setSelectedCategory(category);
    setGrocery([]);
    setError("");
    const encodedCategory = encodeURIComponent(value);
    localStorage.setItem("encodedCategory", encodedCategory);
    if (value === "Grocery Offers") {
      navigate(`/groceryOffers/${userType}/${userId}`);
      return;  
    }
    navigate(`/grocery/${userType}/${userId}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    setGrocery([]);
    setError(`Oops! No grocery items found for ${value} category.`);
  }
};


//  const goToCategory = (categoryValue, route = "groceryOffers") => {
//     const encodedCategory = encodeURIComponent(categoryValue);
//     localStorage.setItem("encodedCategory", encodedCategory);
//     navigate(`/${route}/${userType}/${userId}`, { state: { encodedCategory } });
//   };

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
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=raiseTicket`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=buyProduct`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=bookTechnician`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=mart`),
                fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetAllTicketsList?userId=${userId}&type=collections`),
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
  // if ((cashback >= 49 && cashback <= 51) || (cashback >= 99 && cashback <= 101)) {
  if ((cashback >= 49 && cashback <= 51) || (cashback >= 99 && cashback <= 101) || (cashback >= 299 && cashback <= 301)) {
    return cashback;
  }
  return 0;
};

        const handleViewDetails = (ticket) => {
          setSelectedTicket(ticket);
          const cb = calculateCashback(ticket);
          setCashbackAmount(cb);
          setShowModal(true);
        };
      
        useEffect(() => {
          if (profile?.mobileNumber) {
            localStorage.setItem('mobileNumber', profile.mobileNumber);
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
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`;
            }
              else if (userType === "admin") {
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`;
            }
              else if (userType === "technician") {
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/technician/technicianProfileData?profileType=${userType}&UserId=${userId}`;
            } else if (userType === "dealer") {
              apiUrl = `https://handymanapiv2.azurewebsites.net/api/dealer/dealerProfileData?profileType=${userType}&UserId=${userId}`;
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
      `https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photoId}`
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
    return 
  }

const updateLocalStorageCart = (product, qty) => {
  const stored = JSON.parse(localStorage.getItem("allCategories")) || [];
  const categoryName = product.category || "Search Items";
  let category = stored.find(c => c.categoryName === categoryName);
  if (!category) {
    category = { categoryName, products: [] };
    stored.push(category);
  }
  // const imageValue =
  //   product.image ||
  //   product.productImage ||
  //   product.generatedFileName ||
  //   "";

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
      {/* {!isMobile && (
        <div className="srch_dv flex-grow-1 position-relative">
          <input type="text" className="form-control src_input" placeholder="Search / Ask a question" />
          <SearchIcon
            className="position-absolute search-icon"
          />
        </div>
      )} */}
    </div>
        <div className="hdr_icns d-flex align-items-center ">
      <div id="dropdown-container" className="dropdown-container" style={{ position: "relative" }}>
       {/* {isMobile && ( */}
        <div className="d-flex align-items-center">
          {/* Fixed Chat Icon at bottom right */}
            <div
          className="blinking-icon"
          style={{
            backgroundColor: '#03c03cb3',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            position: 'relative', 
          }}
          onClick={() => navigate(`/chatPage/${userType}/${userId}`)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnnouncementIcon style={{ color: 'white', fontSize: '28px' }} />  
          </div>

          {totalUnreadMessages > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {totalUnreadMessages}
            </span>
          )}
        </div>

  {/* Profile Image */}
  <div className="profile-img-wrapper">
    <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
    />
  </div>
  {/* <div className="profile-img-wrapper"> */}
  {/* <a href="tel:+916281198953">    */}
    {/* <img
      src={profileImage}
      alt="Profile"
      className="profile-img"
      style={{ width: "40px", height: "40px", borderRadius: "20%", objectFit: "cover", cursor: "pointer" }}
    /> */}
  {/* </a> */}
{/* </div> */}
</div>
{/* )} */}
</div>
    </div>
    </header>
  {/* <div className="d-flex align-items-center" onClick={() => navigate(`/customerNotification/${userType}/${userId}`)} style={{ cursor: "pointer" }}>
  <NotificationBell fontSize="medium" />
</div> */}
{/* <div
  className="d-flex align-items-center"
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}
>
  <div style={{ position: "relative", display: "inline-block" }}>
    <OrdersNotificationBell fontSize="medium" />
  </div>
</div> */}
{/* <div
  style={{backgroundColor: 'transparent',  display: 'inline-flex', 
    alignItems: 'center', justifyContent: 'center',
  }}
>
  <AddToCartCount style={{ fontSize: 40, color: 'black', }} />
</div> */}
{/* <div
  className="d-flex align-items-center"
  style={{ cursor: "pointer" }}
  // onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}
>
</div> */}
{/* <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => navigate(`/customerOrders/${userType}/${userId}`)}>
                      <OrdersNotificationBell sx={{ fontSize: 24, marginRight: '8px' }} />
                      <small style={{ fontSize: "13px", fontFamily: "Poppins", lineHeight: "28px" }}>My Orders</small>
                    </div> */}

       {/* {showDropdown && (
        <div className="dropdown-menu">                   
          <div className="dropdown-content">
            <div className="dropdown-item">
              <span className="settings-title">Settings</span>
                      <a href="/user-settings" role="button" className="settings-link">User Settings</a>
            </div>
            <div className="dropdown-item logout" onClick={() => console.log("Logging out...")}>
              <span className="logout-icon"><LogoutIcon /></span>
              <span>Logout</span>
            </div>
          </div>
        </div>
       )} */}
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
                   {/* <div className="text-warning fs-3 mt-0">{profile.userProfileType}</div> */}
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
                   {/* Reedem Coins */}
                    {/* <div className="d-flex align-items-center" style={{ gap: 10, minHeight: 46 }}> */}
                       {/* Coin  */}
                      {/* <div className="coin-wrap">
                        <span className="coin-value">{pointsLoading ? "0" : userPoints}</span>
                      </div> */}
                      {/* Label  */}
                      {/* <small style={{ fontSize: 12, lineHeight: 1, cursor: "pointer", color: "#2a50a1", fontWeight: "bold" }}>
                        Referral Offer
                      </small> */}
                       {/* Button (only when available and referral not used)  */}
                      {/* {shouldShowGetCoins && !isReferralUsed && (
                        <button
                          onClick={handleGetCoins}
                          disabled={!claimAvailable || pointsLoading || userPoints > 0 || isReferralUsed === true}
                          className="bg-primary"
                          style={{
                            fontSize: 12,
                            borderRadius: 6,
                            color: "white",
                            padding: "6px 10px",
                            border: "none",
                            marginLeft: 6,
                          }}
                        >
                          {pointsLoading ? "Checking..." : "Get Coins"}
                        </button>
                      )} */}
                    {/* </div>  */}
                    {/* Confetti overlay */}
                    {/* {showConfetti && (
                      <Confetti width={windowSize.width} height={windowSize.height} />
                    )} */}
                    {/* Toast-like “Congrats” message */}
                    {/* {showMessage && (
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
                    )} */}

                    {/* <div style={{ fontSize: "11px", whiteSpace: "pre-wrap" }}>
                        {refLoading ? "Loading..." : displayNumbers}
                    </div> */}
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

        {/* ReedemCode Component */}
        {/* {redeemOpen && (
        <ReedemCode
          // Parent is explicitly saying: show the modal.
          openOverride={true}
          initialOpen={true}
          showTrigger={false}
          userPoints={userPoints}
          onSendRef={handleSendRef}
          onRedeem={handleRedeemCoins}
          referrerId={userId}
          customerName={profile.fullName}
          onClose={() => {
            setRedeemOpen(false);
          }}
        />
      )} */}

        {/* {shouldMountRedeem && (
          <ReedemCode
            openOverride={redeemOpen || showRedeem}
            onClose={() => {
              setRedeemOpen(false);
              setShowRedeem(false);
            }}
            showTrigger={false}
            initialOpen={false}
            userPoints={userPoints}
            onSendRef={handleSendRef}
            onRedeem={handleRedeemCoins}
            referrerId={userId}
            customerName={profile.fullName}
          />
        )} */}
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
            />
        )} */}

        {isMobile && (
            <div>
             {/* <div ref={containerRef} style={{ position: "relative", marginTop: 10 }}> */}
              {/* <input
                type="text"
                className="form-control"
                placeholder="Search products or groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              /> */}
              {/* {showDropdown && (
                <div style={{
                  position: "absolute", zIndex: 2000, top: "calc(100% + 6px)",
                  left: 0, right: 0, background: "#fff", border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 8, maxHeight: "40vh", overflowY: "auto", boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                }}>
                  {isFetching ? (
                    <div className="p-3">Loading items...</div>
                  ) : suggestions.length === 0 ? (
                    <div className="p-3 text-muted">No matches</div>
                  ) : suggestions.map((item, idx) => {
                    const primary = (item.title && item.title.trim()) ? item.title : (item.raw?.name || item.raw?.productName || item.category || "Unnamed Item");
                    const secondary = item.category || (item.source === "grocery" ? "Grocery" : "Product");
                    return (
                      <button
                        key={`${item.id}-${idx}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        style={{
                          display: "flex", alignItems: "center", width: "100%", padding: "10px 12px",
                          background: idx === activeIndex ? "rgba(0,0,0,0.04)" : "transparent", border: "none", textAlign: "left"
                        }}
                        type="button"
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, whiteSpace: "normal" }}>{primary}</div>
                          <small className="text-muted">{secondary} • {item.source === "grocery" ? "Grocery" : "Product"}</small>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )} */}
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
        const stock = Number(product.stockLeft);
        const isOutOfStock = isNaN(stock) || stock <= 0;
          return (
            <div
        key={product.id}
        className="w-[200px] flex flex-col p-2 bg-white rounded shadow-sm border position-relative"
        style={{ minHeight: "230px", opacity: isOutOfStock ? 0.6 : 1 }}
      >
        <div className="d-flex flex-row justify-content-between absolute top-0 left-0 w-full">
          {Number(product.discount) > 0 && !isOutOfStock && (
            <span className="discount-badge">
              {Math.round(Number(product.discount))}%
            </span>
          )}
    {/* {!isOutOfStock && (
      <span
        style={{ cursor: "pointer", marginRight: "6px", marginTop: "2px", zIndex: 3 }}
        onClick={() => toggleLike(product.id)}
      >
        {likedProducts[product.id] ? (
          <FavoriteIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon style={{ color: "grey" }} />
        )}
      </span>
    )} */}
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
          disabled={!canAddMore(product.id, stock)}
          onClick={() => handleIncrement(product, stock)}
        >
          +
        </button>
      </div>
    ) : (
      /* ADD */
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
  // Safe reader that ALWAYS returns an array of categories
  const readAllCategories = () => {
    if (typeof window === "undefined") return []; // SSR guard
    try {
      const raw = localStorage.getItem("allCategories");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      // ensure each category has an array `products`
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
              <div className="text-primary fw-bold fs-5 ">
                Welcome{" "}
                <small className="text-dark">
                  {profile.fullName}
                </small>
              </div>
            </div>
            </div>
          )}
          {/* 🔍 Grocery Search */}
          {/* <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              className="form-control ps-5 "
              placeholder="Search grocery products"
              value={grocerySearch}
              onChange={(e) => {
                setGrocerySearch(e.target.value);
                setActiveGroceryCategory(null);
              }}
            />
            <SearchIcon
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#777",
              }}
            />
          </div> */}
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
                        {/* <img
                          src={ChristmasWish}
                          className="d-block w-100 img-fluid rounded mb-1"
                          style={{ objectFit: "contain" }}
                          alt="Cashback"
                        /> */}
        {/* Address with Location */}
        <div className="col-md-9">
          {/* <div className="carousel-item active"
                    onClick={() => goToCategory("Grocery Offers", "groceryOffers")}
                      style={{ cursor: "pointer" }} >
                <img 
                  src={Banner2}
                  className="d-block w-100 img-fluid rounded"
                  style={{ width: '50%', height: 'auto', objectFit: 'contain', marginBottom: "200px" }}
                  alt="Poster"
                />
              </div>  */}
      {/* Carousel className="mx-auto"*/}
               {/* <div className="container">
                <div>
              <div
                id="productCarousel"
                className="carousel slide mb-4 rounded"
                data-bs-ride="carousel"
                data-bs-interval="3000"
                data-bs-pause="false"
                data-bs-touch="true"
              > */}
                {/* Indicators */}
                {/* <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 0"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="1"
                      aria-label="Slide 1"
                    ></button>
                    <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3" 
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="3"
                    aria-label="Slide 1" 
                  ></button> */}
                   {/* <button
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to="3"
                    aria-label="Slide 4" 
                  ></button> */}
                {/* </div> */}
                {/* Carousel items */}
                {/* <div className="carousel-inner"> */}
                 {/* <div className="carousel-item active"
                    onClick={() => goToCategory("Chicken Offers", "groceryOffers")}
                      style={{ cursor: "pointer" }} >
                <img 
                  src={Banner1}
                  className="d-block w-100 img-fluid rounded"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  alt="Slide 1"
                />
              </div>  */}
                 {/* <div className="carousel-item"> 
                <div
                    onClick={() => goToCategory("Grocery Offers", "groceryOffers")}
                      style={{ cursor: "pointer" }} >  
                  <img
                    src={Banner2}
                    className="d-block w-100 img-fluid rounded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Slide 2"
                  />
                  </div>   
                </div>  */}
                 {/* <div className="carousel-item ">
                    <video
                      ref={videoRef}
                      className="d-block w-100 rounded"
                      style={{ width: '90%', height: 'auto', objectFit: 'cover' }}
                      autoPlay
                      // loop
                      playsInline
                      muted
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();  
                        const encodedCategory = encodeURIComponent("Christmas Offers");
                        localStorage.setItem("encodedCategory", encodedCategory);
                        navigate(`/groceryChristmasOffers/${userType}/${userId}`, {
                          state: { encodedCategory },
                        });
                      }}
                       onEnded={() => {
                          const carousel = document.querySelector('#productCarousel');
                          if (carousel) {
                            const bsCarousel = window.bootstrap.Carousel.getOrCreateInstance(carousel);
                            bsCarousel.next();
                          }
                        }}                     
                           // muted={isMuted}
                    >
                      <source src={BannerVideo} type="video/mp4" />
                    </video> */}
                    {/* <button
                      onClick={toggleMute}
                      style={{
                        position: 'absolute',    
                        bottom: '20px',
                        right: '20px' ,
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '10px',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                      aria-label="Toggle Mute"
                    >
                      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </button> */}
                {/* </div>
                 <div className="carousel-item">
                  <img
                    src={Banner3}
                    className="d-block w-100 img-fluid rounded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Slide 3"
                  />
                </div> 
              </div> */}
                {/* Controls */}
                 {/* <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="prev">
                  <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="next">
                  <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button> 
              </div>
              </div>  
              </div>  */}
              {/* <div style={{ cursor: "pointer"}}>
                        <img
                          src={DeliveryImg}
                          className="d-block w-100 img-fluid rounded mb-2"
                          style={{ objectFit: "contain" }}
                          alt="Poster"
                        /> 
                      </div> */}
                      <div className="carousel-item active">
                          <video
                            ref={videoRef}
                            className="d-block w-100 rounded"     
                            style={{ objectFit: "cover" }}
                            autoPlay
                            playsInline
                            muted
                            loop
                            // onClick={(e) => {
                            //   e.stopPropagation();
                            //   e.preventDefault();
                            //   const encodedCategory = encodeURIComponent("Christmas Offers");
                            //   localStorage.setItem("encodedCategory", encodedCategory);
                            //   navigate(`/groceryChristmasOffers/${userType}/${userId}`, {
                            //     state: { encodedCategory },
                            //   });
                            // }}
                          onEnded={() => {
                            if (!carouselRef.current) return;
                            const carousel =
                              BsCarousel.getOrCreateInstance(carouselRef.current);
                            carousel.next();
                            carousel.cycle(); 
                          }}
                          >
                            <source src={BannerVideo} type="video/mp4" />
                          </video>
                        </div>
              {/* Top Carousel Section */}
                {/* <div className="container">
                  <div>
                    <div
                    ref={carouselRef}
                      id="productCarousel"
                      className="carousel slide mb-2 rounded" */}
                      {/* // data-bs-ride="carousel"
                      // data-bs-interval="3000"
                      // data-bs-pause="false"
                      // data-bs-wrap="true"
                      // data-bs-touch="true"
                    // > */}
                      {/* Indicators */}
                      {/* <div className="carousel-indicators">
                        <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
                        <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="1"></button> */}
                        {/* <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="2"></button> */}
                        {/* <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="3"></button> */}
                      {/* </div> */}
                      {/* Carousel Items */}
                      {/* <div className="carousel-inner"> */}
                        {/* Slide 1 */}
                        {/* <div
                        className="carousel-item active"
                        onClick={() => goToCategory("Grocery Offers", "groceryOffers")}
                        style={{ cursor: "pointer"}}
                      >
                        <img
                          src={Banner2}
                          className="d-block w-100 img-fluid rounded"
                          style={{ objectFit: "contain" }}
                          alt="Slide 1"
                        />
                      </div> */}
                        {/* <div 
                          className="carousel-item active"
                          onClick={() => goToCategory("Chicken Offers", "groceryOffers")}
                          style={{ cursor: "pointer" }}
                        >
                          <img 
                            src={Banner1}
                            className="d-block w-100 img-fluid rounded"
                            style={{ objectFit: "contain" }}
                            alt="Slide 1"
                          />
                        </div> */}
                        {/* Slide 2 - Video */}
                        {/* <div className="carousel-item">
                          <video
                            ref={videoRef}
                            className="d-block w-100 rounded"
                            style={{ objectFit: "cover" }}
                            autoPlay
                            playsInline
                            muted
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const encodedCategory = encodeURIComponent("Christmas Offers");
                              localStorage.setItem("encodedCategory", encodedCategory);
                              navigate(`/groceryChristmasOffers/${userType}/${userId}`, {
                                state: { encodedCategory },
                              });
                            }}
                          onEnded={() => {
                            if (!carouselRef.current) return;
                            const carousel =
                              BsCarousel.getOrCreateInstance(carouselRef.current);
                            carousel.next();
                            carousel.cycle(); 
                          }}
                          >
                            <source src={BannerVideo} type="video/mp4" />
                          </video>
                        </div> */}

                        {/* Slide 3 */}
                        {/* <div className="carousel-item">
                          <img
                            src={Banner3}
                            className="d-block w-100 img-fluid rounded"
                            onClick={() => goToCategory("Offers", "groceryOffers")}
                            style={{ objectFit: "contain" }}
                            alt="Slide 3"
                          />
                        </div>
                      </div> */}
                      {/* Controls */}
                      {/* <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon custom-carousel-icon"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon custom-carousel-icon"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>  
                  </div>
                </div> */}

              {/* <div className="d-flex flex-column align-items-center gap-3 mb-3">
              // {/* Refer & Earn Strip 
                <button
                type="button"
                onClick={() => setRedeemOpen(true)}
                className="redeem-ribbon-btn mt-0"
                aria-label="Open Redeem Offer"
              >
                🎁 Refer & Earn ₹100
              </button>
            </div> */}
            {/* <div className="d-flex flex-column align-items-center gap-3">
                {/* Big Sale Strip */}
              {/* <button
                type="button"
                onClick={() => goToCategory("Offers", "groceryOffers")}
                className="redeem-ribbon-btn mt-0 blinking-text"
                aria-label="Open Redeem Offer"
              >
                🎉 30% ABOVE OFF – Nov Month Sale! 🎉
              </button> */}
            {/* </div> */} 

<div className="container"  style={{
    // padding: isMobile ? "2px" : "0px",
    // borderRadius: "5px",
    minHeight: "100vh",
    // paddingTop: isMobile ? "70px" : "0px"
    paddingTop: isMobile ? `${MOBILE_PADDING_TOP}px` : "0px",
  }}>

  {/* <div
  className="shadow-lg p-2 rounded-5 mb-1 text-center border-0">
    <h5 className="deal-3d">🎉 CRAZY DEALS 🎉</h5>
      <div style={{color: "#ff5722", fontSize: "14px", fontWeight: "500"}}>
        Buy Monthly Groceries 
        <span style = {{ fontSize: "18px", fontWeight: "700"}}> ₹1999 </span> 
        Get Extra Discount 
        <span style = {{ fontSize: "18px", fontWeight: "700"}}> ₹250</span>
      </div>
     <div className="row row-cols-3 row-cols-md-5 g-1">
      {offerCategories.map((cat) => {
        return (  
          <div   
            className="col"  
            key={cat.label}  
            style={{ cursor: "pointer" }}  
            onClick={() => handleCrazyDealsGroceryClick(cat)}>
            <div
              className="OfferIcon-card border-0 shadow-sm text-center d-flex flex-column align-items-center justify-content-between"
              style={{
                height: isMobile ? "120px" : "140px",
                width: isMobile ? "90px" : "120px",
                cursor: "pointer",
                opacity: 1,
                pointerEvents: "auto"
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
            </div>
          </div>
        );
      })}
    </div>
    <span style={{color: "#ff5722", fontSize: "14px", fontWeight: 500}}>Offer Valid Till 10th December!</span>
</div>  */}
  {/* Grocery Categories Section className="container my-3"*/}
  {/* {(activeGroceryCategory || grocerySearch) && (
  <div
    style={{ cursor: "pointer", color: "green", marginBottom: "10px" }}
    onClick={() => {
      setActiveGroceryCategory(null);
      setGrocerySearch("");
    }}
  >
    ← Back to Categories
  </div>
)}
{groceryLoading && <p>Loading products...</p>}
<div className="row">
  {filteredGroceryProducts.map((p) => (
    <div key={p.id} className="col-6 col-md-3 mb-3">
      <div className="border rounded p-2 h-100">
        <img
          src={getGroceryImage(p)}
          alt={p.name}
          onError={(e) => {
            e.target.src = "/no-image.png";
          }}
          style={{
            height: "80px",
            objectFit: "contain",
            width: "100%",
          }}
        />
        <div style={{ fontSize: "12px", fontWeight: "bold", minHeight: "36px" }}>
          {p.name}
        </div>
        <div style={{ fontSize: "12px" }}>
          <b className="text-success">₹{Math.round(p.afterDiscount)}</b>{" "}
          <s className="text-muted">₹{p.mrp}</s>
        </div>
       {groceryQty[p.id] ? (
        <div className="d-flex justify-content-between align-items-center mt-2">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => decreaseQty(p)}
          >
            −
          </button>
          <span className="fw-bold">
            {groceryQty[p.id]}
          </span>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => increaseQty(p)}
            disabled={groceryQty[p.id] >= Number(p.stockLeft)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="btn btn-sm btn-outline-success w-100 mt-2"
          onClick={() => increaseQty(p)}
          disabled={Number(p.stockLeft) <= 0}
        >
          ADD
        </button>
      )}
      </div>
    </div>
  ))}
</div>
{!groceryLoading &&
  (activeGroceryCategory || grocerySearch) &&
  filteredGroceryProducts.length === 0 && (
    <p className="text-center text-muted mt-4">
      No products found
    </p>
)} */}   

  <div className="shadow-lg p-2 rounded-5 text-center bg-transparent border-0">
    <h5 className="fw-bold mb-1" style={{color: "#ff5722", fontSize: "20px"}}>
      Lakshmi Mart  
    </h5> 
    {/* <div className="row row-cols-3 row-cols-md-5 g-1">
  {groceryCategories.map((cat) => {
    //  const isBlockedCategory  = cat.value === "Vegetables & Fruits";
    return (
      <div
        className="col"
        key={cat.label}
        onClick={() => handleGroceryCategoryClick(cat)}
        style={{ cursor: "pointer" }}     
        // onClick={() => !isBlockedCategory  && handleGroceryCategoryClick(cat)}
        // style={{ cursor: isBlockedCategory  ? "not-allowed" : "pointer" }}     
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
    );
  })}
</div> */}
{/* <div className="shadow-lg p-2 rounded-5 mb-1 bg-transparent"> */}
  {/* ---------- FIRST CATEGORIES ---------- */}
  {/* <div className="row row-cols-3 row-cols-md-5 g-1">
      {firstCategories.map((cat) => {
    return (
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
    );
  })}
  </div> */}

  {/* ---------- REMAINING CATEGORIES ---------- */}
  {/* <div className="row row-cols-3 row-cols-md-5 g-1">
      {remainingCategories.map((cat) => {
    return (
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
    );
  })}
  </div> */}
{/* </div> */}

<div className="row row-cols-3 row-cols-md-5 g-1">
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
                     <div style={{ cursor: "pointer"}}>
                        <img
                          src={Banner1Img}
                          className="d-block w-100 img-fluid rounded"
                          style={{ objectFit: "contain" }}
                          alt="Cashback"
                        />
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
                      <div style={{ cursor: "pointer"}}>
                        <img
                          src={Banner2Img}
                          className="d-block w-100 img-fluid rounded"
                          style={{ objectFit: "contain" }}
                          alt="Cashback"
                        />
                      </div>
<div className="row row-cols-3 row-cols-md-5 g-1">
  {thirdCategories.map((cat) => (
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
 <div style={{ cursor: "pointer"}}>
                        <img
                          src={Banner3Img}
                          className="d-block w-100 img-fluid rounded"
                          style={{ objectFit: "contain" }}
                          alt="Cashback"
                        />
                      </div>
                      <div className="row row-cols-3 row-cols-md-5 g-1">
  {fourthCategories.map((cat) => (
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

{/* {cartSummary.items > 0 && (
  <div
    style={{
      position: "fixed",
      bottom: "60px",
      left: 0,
      width: "100%",
      backgroundColor: "green",
      color: "white",
      padding: "12px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 2000,
      borderRadius: "20px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      🛒
      <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
        <span style={{ fontSize: "12px" }}>{cartSummary.items} items</span>
      <span style={{ fontSize: "12px" }}>₹{Math.round(cartSummary.total)}</span>
      </div>
    </div>

    {/* <button
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
  </button> *
  <button
  type="button"
  className="text-white fw-bold d-flex align-items-center gap-1"
  style={{
    fontSize: "12px",
    cursor: "pointer",
    background: "transparent",
    border: "none",
  }}
  onClick={() => {
    const prodsFromState = cartSummary?.products;
    let prods = prodsFromState;
    if (!Array.isArray(prods)) {   
      try {
        const raw = localStorage.getItem("allCategories");
        const cats = raw ? JSON.parse(raw) : [];
        prods = [];
        (cats || []).forEach(cat => {
          (cat.products || []).forEach(p => {
            if (Number(p.qty) > 0) {
              prods.push({
                category: cat.categoryName,
                productName: p.productName || p.name || "",
              });
            }
          });
        });
      } catch { prods = []; }
    }

    const route = decideCartRoute(prods);
    navigate(`/${route}/${userType}/${userId}`);
  }}
>
  View Cart →
</button>
  </div> 
)}  */}

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
        //  onClick={() => navigate(`/lakshmiCollections/${userType}/${userId}`)}
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
                {/* <p><strong>Category:</strong>{ticket.category ? ticket.category : "Delivery in 45 minutes"}</p> */}
                <p><strong>Status:</strong> 
                <span className={ticket.status.toLowerCase()}> {ticket.status}</span>
                </p> 
                <p><strong>{ticket.assignedTo ? "Assigned To" : "Payment Mode"}: </strong> {ticket.assignedTo || ticket.assignedTo || ticket.assignedTo || `${ticket.paymentMode} or UPI`}</p>
                {/* <p><strong>Assigned To:</strong> {ticket.assignedTo}</p> */}
                <p><strong>Date:</strong> {ticket.date ? new Date(ticket.date).toLocaleDateString('en-GB') : "N/A"}</p>
              
                {/* {ticket.paidAmount ? ( 
                    <> 
                      <p><strong>Paid Amount:</strong> {ticket.paidAmount}</p>
                    </>
                  ) : ( 
                    <>
                     <p><strong>Paid Amount:</strong> Not Paid</p>
                    </> 
                  )} */}

                {/* View Details Button */}
                {/* {ticket.martId && ticket.paymentMode?.toLowerCase() === "cash" && (
                  <p className="ticket-content">Pay Now:  
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
                    Amount to Pay
                  </button>
                  </p>
                )} */}

                 {/* View Details Button */}
                  {ticket.paidAmount && (
                    <>
                      {/* Only show these if payment is done */}
                      <p><strong>Transaction Status:</strong> {ticket.transactionStatus}</p>
                      <p><strong>Paid Date:</strong> {ticket.orderDate}</p>
                    </>
                  )}
                {/* <p><strong>Transaction Status:</strong> {ticket.transactionStatus}</p>
                <p><strong>Paid Amount:</strong> {ticket.paidAmount}</p>
                <p><strong>Paid Date: </strong> {ticket.orderDate}</p> */}
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
       
       {/* {showThumbsUp && (
  <div className="thumbsup-overlay">
    <div className="thumbsup-box">
      {showConfetti && windowSize.width > 0 && windowSize.height > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={50000}
          recycle={false}
        />
      )}
      <div className="emoji-row" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        🏏
      </div>
      <p
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "#ff4500",
        }}
      >
        India vs South Africa – Vizag Match Special!
      </p>
      <img
        src={ThumsUpBottle}
        alt="Thums Up Bottle"
        style={{
          width: "80px",
          height: "auto",
          animation: "popDrink 0.7s ease-out",
        }}
      />
      <small style={{ display: "block", fontWeight: "600" }}>
        Enjoy the match with a refreshing sip – Thums Up just for ₹1/-
      </small>
    </div>
  </div>
)}  */}

        {/* First Order Cashback Modal */}
         <Modal
          show={showCashbackModal}
          onHide={() => setShowCashbackModal(false)}
          centered
          dialogClassName="cashback-modal"
        >
          <Modal.Body className="cashback-modal-body text-center">
             {/* <button
              type="button"
              className="cashback-close-btn"
              onClick={() => setShowCashbackModal(false)}
            >
              ×
            </button>  */}
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
{/* <Button
            variant="success"
            onClick={() => {
              if (selectedTicket?.id) {
                window.location.href = `/groceryOnlinePayment/${selectedTicket.id}`;
              }
            }}
          >
            Pay Now
          </Button> */}
      </Modal>
         <Footer />
        </>    
  );
};
export default ProfilePage;
   