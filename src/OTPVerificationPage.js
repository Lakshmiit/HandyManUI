// import React, { useEffect, useRef, useState } from "react";
// import HandyManCharacter from "./img/hm_char.png";
// import HandyManLogo from "./img/Hm_Logo 1.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import { setLoginData } from "./utils/auth";

// const OTPVerificationPage = () => {
//   const navigate = useNavigate();
//   const { state = {} } = useLocation();

//   // Prefer state, then loginMeta, then individual keys
//   const loginMeta = (() => {
//     try { return JSON.parse(localStorage.getItem("loginMeta") || "null") || {}; }
//     catch { return {}; }
//   })();

//   const mobile =
//     state.mobile ??
//     loginMeta.mobile ??
//     localStorage.getItem("mobile") ??
//     "";

//   const districtIdRaw =
//     state.districtId ??
//     loginMeta.districtId ??
//     (localStorage.getItem("districtId") ? Number(localStorage.getItem("districtId")) : null);

//   const districtId = typeof districtIdRaw === "number" ? districtIdRaw : (districtIdRaw ? Number(districtIdRaw) : null);

//   const districtName =
//     state.districtName ??
//     loginMeta.districtName ??
//     localStorage.getItem("districtName") ??
//     "";

//   const pinCode =
//     state.pinCode ??
//     loginMeta.pinCode ??
//     localStorage.getItem("pinCode") ??
//     "";

//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const [timeLeft, setTimeLeft] = useState(90);
//   const [canResend, setCanResend] = useState(false);
//   const [error, setError] = useState("");
//   const inputsRef = useRef([]);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     console.log(userId);
//   },[userId]);

//   useEffect(() => setTimeLeft(90), []);
//   useEffect(() => {
//     if (timeLeft > 0) {
//       const t = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev === 1) setCanResend(true);
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(t);
//     }
//   }, [timeLeft]);

//   const handleChange = (value, index) => {
//     const next = [...otp];
//     next[index] = value;
//     setOtp(next);
//     if (value && index < otp.length - 1) inputsRef.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handleResendOTP = async (e) => {
//     e.preventDefault();
//     if (!canResend) return;

//     try {
//       setOtp(Array(6).fill(""));
//       setTimeLeft(90);
//       setCanResend(false);

//       const payload = { senderValue: mobile, type: "sms" }; // fixed key
//       const res = await fetch(
//         "https://handymanapiv2.azurewebsites.net/api/Auth/bhashsmssendotp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );
//       if (!res.ok) throw new Error("Failed to resend otp.");
//     } catch (err) {
//       console.error("Error resend otp:", err);
//       window.alert("Failed to resend otp. Please try again later.");
//     }
//   };

//   const handleGuestAddress = async () => {
//     // 1) create guest user
//     const payload1 = {
//       UserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       id: "string",
//       date: "string",
//       UserName: "",
//       UserPassword: "",
//       MobileNo: mobile,
//       EmailId: "",
//       IsMobileNumberValidate: true,
//       IsEmailValidate: false,
//       ProfileType: "customer",
//     };

//     const r1 = await fetch(
//       "https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserUpload",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload1),
//       }
//     );
//     if (!r1.ok) throw new Error("Failed to Upload User Data (guest user).");

//     const userData = await r1.json();
//     const newUserId = userData.userId;
//     setUserId(newUserId);
//     setLoginData(newUserId); 

//     const payload2 = {
//       CustomerId: "string",
//       id: "string",
//       date: new Date().toISOString(),
//       FirstName: "Guest",
//       LastName: "",
//       MobileNumber: mobile,
//       MobileVerificationCode: otp.join(""),
//       EmailAddress: "",
//       EmailVerificationCode: "",
//       AlternativeMobileNumber: "",
//       GSTNumber: "",
//       Address: "",
//       Landmark: "",
//       State: "",
//       StateId: "",
//       District: districtName || "",
//       DistrictId: (districtId ?? null).toString(),         
//       ZipCode: pinCode || "",                 
//       CustomerPhotoId: "",
//       UserId: newUserId,
//       IsApproved: true,
//       Status: "Open",
//     };

//     const r2 = await fetch(
//       "https://handymanapiv2.azurewebsites.net/api/Customer/GuestCustomerUpload",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload2),
//       }
//     );
//     if (!r2.ok) throw new Error("Failed to Upload User Data (guest customer).");
//     navigate(`/profilePage/customer/${newUserId}`);
//   };

//   const handleOTPVerification = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length < 6) {
//       setError("OTP is Required.");
//       return;
//     }
//     setError("");

//     try {
//       // 1) validate OTP
//       const payload = { senderValue: mobile, otp: enteredOtp };
//       const otpRes = await fetch(
//         "https://handymanapiv2.azurewebsites.net/api/Auth/validateotp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );
//       if (!otpRes.ok) throw new Error("Failed to validate OTP.");

//       // 2) check if user already exists
//       const verifyUserRes = await fetch(
//         `https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${encodeURIComponent(
//           mobile
//         )}`
//       );

//       if (verifyUserRes.status === 200) {
//         const userData = await verifyUserRes.json();
//         if (userData?.profileType && userData?.userId) {
//           setUserId(userData.userId);
//           setLoginData(userData.userId);
//           navigate(`/profilePage/${userData.profileType}/${userData.userId}`, {
//             state: { profileType: userData.profileType, userData },
//           });
//         } else {
//           console.error("200 OK but missing fields:", userData);
//         }
//       } else if (verifyUserRes.status === 404) {
//         // 3) first-time user → create guest + guest customer (this calls your “second API”)
//         await handleGuestAddress();
//       } else {
//         const t = await verifyUserRes.text();
//         console.error(`Unhandled status ${verifyUserRes.status}:`, t);
//         window.alert("Something went wrong. Please try again later.");
//       }
//     } catch (err) {
//       console.error("Error validate otp:", err);
//       window.alert("Failed to Validate OTP! Please try again later.");
//     }
//   };

//   useEffect(() => {
//     if (inputsRef.current[0]) inputsRef.current[0].focus();
//   }, []);

//   return (
//     <div className="h-90 mt-2 d-flex align-items-center py-2 flex-column">
//       <div className="login_section">
//         <div className="d-flex flex-column align-items-center justify-content-center">
//           <img src={HandyManCharacter} alt="Character" width="200" height="200" className="img-fluid mb-3" />
//           <div className="rgt_cnt" id="MobileVerify">
//             <img src={HandyManLogo} alt="Logo" width="190" height="90" className="img-fluid" />
//           </div>

//           <h4 className="fs-5">Enter Verification Code</h4>

//           <div className="otp_input" id="otp_input">
//             {otp.map((digit, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 inputMode="numeric"
//                 pattern="\d*"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => {
//                   const v = e.target.value;
//                   if (/^\d?$/.test(v)) handleChange(v, i);
//                 }}
//                 onKeyDown={(e) => handleKeyDown(e, i)}
//                 ref={(el) => (inputsRef.current[i] = el)}
//               />
//             ))}
//           </div>

//           {error && <div className="text-danger">{error}</div>}

//           <div style={{ fontSize: 14 }}>
//             Didn&apos;t receive OTP?{" "}
//             <button
//               onClick={handleResendOTP}
//               disabled={!canResend}
//               className={`link ${!canResend ? "disableClick" : ""}`}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#007bff",
//                 textDecoration: "underline",
//                 cursor: canResend ? "pointer" : "not-allowed",
//                 padding: 0,
//                 fontSize: 14,
//               }}
//             >
//               Resend
//             </button>
//           </div>

//           <div style={{ fontSize: 14 }}>
//             Incorrect Mobile Number? <a className="link" href="/">Change</a>
//           </div>

//           <button className="btn btn-dark text-center" style={{ fontSize: 14 }} onClick={handleOTPVerification}>
//             Submit
//           </button>

//           <div className="timer" style={{ color: "red", fontWeight: "bold", marginTop: 5 }}>
//             {timeLeft > 0 ? `Time Left: ${timeLeft} seconds` : "You can resend the OTP now."}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPVerificationPage;




import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import HandyManCharacter from './img/hm_char.png';
import HandyManLogo from './img/Hm_Logo 1.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoginData } from "./utils/auth";

const OTPVerificationPage = () => {
     const Navigate = useNavigate();
    // const location = useLocation();
     const { state = {} } = useLocation();

  // Prefer state, then loginMeta, then individual keys
  const loginMeta = (() => {
    try { return JSON.parse(localStorage.getItem("loginMeta") || "null") || {}; }
    catch { return {}; }
  })();

  const mobile =
    state.mobile ??
    loginMeta.mobile ??
    localStorage.getItem("mobile") ??
    "";

  const districtIdRaw =
    state.districtId ??
    loginMeta.districtId ??
    (localStorage.getItem("districtId") ? Number(localStorage.getItem("districtId")) : null);

  const districtId = typeof districtIdRaw === "number" ? districtIdRaw : (districtIdRaw ? Number(districtIdRaw) : null);

  const districtName =
    state.districtName ??
    loginMeta.districtName ??
    localStorage.getItem("districtName") ??
    "";

  const pinCode =
    state.pinCode ??
    loginMeta.pinCode ??
    localStorage.getItem("pinCode") ??
    "";
    // const {senderValue} = useParams();
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timeLeft, setTimeLeft] = useState(90);
    const [canResend, setCanResend] = useState(false);
    const [error, setError] = useState('');
    const inputsRef = useRef([]);
//  const [firstName, setFirstName] = useState('');
//   const [newAddress, setNewAddress] = useState('');
//   const [zipCode, setZipCode] = useState('');
  const [userId, setUserId] = useState(null); 
    // const [userData] = useState('');
//  const [mobileNumber, setMobileNumber] = useState('');
   
useEffect(() => {
  console.log(userId);
}, [userId]);

   useEffect(() => {
    setTimeLeft(90); 
  }, []);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) setCanResend(true);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);
  
    // const handleChange = (value, index) => {
    //   const newOtp = [...otp];
    //   newOtp[index] = value.slice(-1); 
    //   setOtp(newOtp);
  
    //   if (value && index < 5) {
    //     inputsRef.current[index + 1]?.focus();
    //   }
    // };

    const handleChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    };



    // const verifyMobileNumber = async () => {
    //   try {
    //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${mobile}`);
    //     const data = await response.json();
    //     console.log("Response:", data);
    //     setUserData(data);
    //     setUserId(data.userId);
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };
  
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const enteredOtp = otp.join('');
  //     if (enteredOtp.length < 6) {
  //       setError('OTP is Required.');
  //       return;
  //     }
  //     setError('');
  //     console.log('Submitted OTP:', enteredOtp);
  //     // TODO: Add actual submit logic
  //   };
  
  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (!canResend) return;
    const payload1 = {
        SenderValue: mobile,
        type: 'sms',
    };
  
    try {
        setOtp(Array(6).fill(''));
        setTimeLeft(90);
        setCanResend(false);
  
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Auth/bhashsmssendotp`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload1),
      });
      if (!response.ok) {
       throw new Error("Failed to resend otp.");
      }
      // alert('OTP Resend successfully.');
    } catch (error) {
      console.error("Error resend otp:", error);
      window.alert('Failed to resend otp. Please try again later.');    }
  };
  
  const handleGuestAddress = async (e) => {
      e.preventDefault();
   
     const payload1 = {
       UserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
       id: "string",
       date: "string",
       UserName : "",
       UserPassword : "",     
       MobileNo : mobile,
       EmailId : "",
       IsMobileNumberValidate : true,
       IsEmailValidate : false,
       ProfileType : "customer",
     };
    
     try {
       const response1 = await fetch(`https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserUpload`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload1),
       });
   
       if (!response1.ok) {
         throw new Error('Failed to Upload User Data.');
       }
       const userData = await response1.json();
       const newUserId = userData.userId;
       setUserId(newUserId);
        // Save login
      setLoginData(newUserId);

 const payload2 = {
       CustomerId : "string",
       id: "string",
       date: "string",
       FirstName: "Guest",
       LastName  : "",
       MobileNumber : mobile,
       MobileVerificationCode: otp.join(''),
       EmailAddress : "",
       EmailVerificationCode : "",
       AlternativeMobileNumber: "",
       GSTNumber: "",
       Address: "",
       Landmark: "",
       State: "",
       StateId: "",
       District: districtName || "",
       DistrictId: (districtId ?? null).toString(),
       ZipCode: pinCode || "",
       CustomerPhotoId: "",
       UserId: newUserId,
       IsApproved: true, 
       Status: "Open", 
     };
    
       const response2 = await fetch(`https://handymanapiv2.azurewebsites.net/api/Customer/GuestCustomerUpload`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload2),
       });
   
       if (!response2.ok) {
         throw new Error('Failed to Upload User Data.');
       }
       Navigate(`/profilePage/customer/${newUserId}`);
     } catch (error) {
       console.error('Registration Error:', error);
       window.alert('Failed to Registration. Please try again later.');
     }
   };


    const handleOTPVerification = async (e) => {
      e.preventDefault();
  
      const enteredOtp = otp.join('');
      if (enteredOtp.length < 6) {
        setError('OTP is Required.');
        return;
      }
      setError('');
      console.log('Submitted OTP:', enteredOtp);
      const payload = {
        senderValue: mobile,
        otp: enteredOtp,
      };
      try {
   
        const otpResponse = await fetch(`https://handymanapiv2.azurewebsites.net/api/Auth/validateotp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (!otpResponse.ok) {
          throw new Error("Failed to validate OTP.");
        }

      //  window.alert("OTP Valid Successfully!");
        const verifyUserRes = await fetch(`https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${mobile}`);
        
        if (verifyUserRes.status === 200) {
          const userData = await verifyUserRes.json();
          console.log("User Data:", userData);
      
          if (userData?.profileType && userData?.userId) {
            setUserId(userData.userId);
             // ✅ Save userId in localStorage (7 days expiry handled in setLoginData)
          setLoginData(userData.userId);
            Navigate(`/profilePage/${userData.profileType}/${userData.userId}`, {
              state: { profileType: userData.profileType, userData },
            });
          } else {
            console.error("200 OK but missing fields in userData:", userData);
          }
      
        } else if (verifyUserRes.status === 404) {
          const errorText = await verifyUserRes.text();
          console.warn(" User not found (404):", errorText);
      
          await handleGuestAddress(e);                                 

        } else {
          const errorText = await verifyUserRes.text();
          console.error(` Unhandled error (status ${verifyUserRes.status}):`, errorText);
        }
      
        // if (!verifyUserRes.ok) {
        //   throw new Error("Failed to verify user profile.");
        // }
    
        // const userData = await verifyUserRes.json();
    
        // localStorage.setItem('mobile', mobile);
        // localStorage.setItem('enteredOtp', enteredOtp);
    
        // const { profileType, userId } = userData; 

        // if (profileType && userId) {
        //   Navigate(`/profilePage/${profileType.toLowerCase()}/${userId}`, {
        //     state: { mobile, userData },
        //   });
        // } else {
        //   Navigate(`/customerRegistration`, {
        //     state: { mobile, enteredOtp },
        //   });
        // }    
      } catch (error) {
        console.error("Error validate otp:", error);
        window.alert('Failed to Validate OTP!. Please try again later.');
      }
    };

    

   
  //  const handleVerificationAndAddress = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${mobile}`);
  //     const data = await response.json();
  //     console.log("Verification Response:", data);
  
  //     if (data && data.userId) {
  //       setUserData(data);
  //       setUserId(data.userId);
  //       alert("User already exists. Proceeding without re-registration.");
  //       Navigate(`/profilePage/customer/${userId}`);

  //     } else {
  //       await handleGuestAddress(e)
  //     }
  //   } catch (error) {
  //     console.error("Verification Error:", error);
  //     // alert("Error checking mobile number. Please try again.");
  //   }
  // };
  
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

const handleBothMethods = (e) => {
  e.preventDefault();
  handleOTPVerification(e);
};
    
    return (
        <div className="h-90  mt-2 d-flex align-items-center py-2 flex-column">
        <div className="login_section">
            <div className="d-flex flex-column align-items-center justify-content-center">
  <img 
    src={HandyManCharacter} 
    alt="Character" 
    width="200" 
    height="200" 
    className="img-fluid mb-3"
  />

  <div className="rgt_cnt" id="MobileVerify">
    <img  
      src={HandyManLogo}  
      alt="Logo"  
      width="190"  
      height="90"  
      className="img-fluid"
    />  
  </div>

                    <h4 className=' fs-5'>Enter Verification Code</h4>
                    <div id="test" className="test"></div>
                    <div className="otp_input" id="otp_input">
                        {otp.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d?$/.test(value)) { 
                                handleChange(value, i);
                              }
                            }}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            ref={(el) => (inputsRef.current[i] = el)}
                        />
                        ))}
                    </div>

        {error && <div className="text-danger">{error}</div>}

        {/* <button type="submit" className="submit-btn">Submit</button>

        <div className="resend-info">
          {!canResend ? (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Time Left: {timeLeft}s</span>
          ) : (
            <a onClick={resendOtp} className="resend-link">Resend</a>
          )}
        </div>

        <div>
          Incorrect Mobile Number? <a href="/loginnew">Change</a>
        </div> */}
                    {/* <div>
                        <input asp-for="Otp" id="OtpVal" />
                        <span asp-validation-for="Otp" id="otpWarning" class="text-danger" style={{ display: 'none' }}>OTP is Required.</span>
                    </div> */}

                    <div id="liveAlertPlaceholder"></div>
                    <div style={{fontSize: '14px'}}>
                    Didn't receive OTP?{" "}
                    <button
                        id="resendBtn"
                        onClick={handleResendOTP}
                        disabled={!canResend}
                        className={`link ${!canResend ? "disableClick" : ""}`}
                        style={{
                        background: "none",
                        border: "none",
                        color: "#007bff",
                        textDecoration: "underline",
                        cursor: canResend ? "pointer" : "not-allowed",
                        padding: 0,
                        fontSize: "14px"
                        }}
                    >
                        Resend
                    </button>
                    </div>

                    <div style={{fontSize: '14px'}}>
                        Incorrect Mobile Number? <a class="link" asp-area="" href="/">Change</a>
                    </div>
                   
                    <button className="btn btn-dark text-center" style={{fontSize: '14px'}} onClick={handleBothMethods} type="submit">Submit  </button>
                    
                    <div className="timer" style={{ color: "red", fontWeight: "bold", marginTop: "5px" }}>
                        {timeLeft > 0 ? `Time Left: ${timeLeft} seconds` : 'You can resend the OTP now.'}
                    </div>
            </div>
        </div>
    </div>
 )
};
export default OTPVerificationPage;