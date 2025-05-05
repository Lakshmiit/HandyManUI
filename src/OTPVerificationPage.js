import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import HandyManCharacter from './img/hm_char.png';
import HandyManLogo from './img/Hm_Logo 1.png';
import { useLocation, useNavigate } from 'react-router-dom';
const OTPVerificationPage = () => {
     const Navigate = useNavigate();
    const location = useLocation();
    const mobile = location.state?.mobile || localStorage.getItem('mobile');    
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
    const [userData] = useState('');
  
//  const [mobileNumber, setMobileNumber] = useState('');
   
useEffect(() => {
  console.log(userId, userData);
}, [userId, userData]);

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
  
    const handleChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); 
      setOtp(newOtp);
  
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
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
  
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/Auth/sendotp`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload1),
      });
      if (!response.ok) {
       throw new Error("Failed to resend otp.");
      }
      alert('OTP Resend successfully.');
    } catch (error) {
      console.error("Error resend otp:", error);
      window.alert('Failed to resend otp. Please try again later.');    }
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

       alert("OTP Valid Successfully!");
        const verifyUserRes = await fetch(`https://handymanapiv2.azurewebsites.net/api/UserOnBoarding/GuestUserVerificationByMobileNo?mobileNo=${mobile}`);
        
        if (verifyUserRes.status === 200) {
          const userData = await verifyUserRes.json();
          console.log("User Data:", userData);
      
          if (userData?.profileType && userData?.userId) {
            Navigate(`/profilePage/customer/${userData.userId}`, {
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
        // window.alert('Failed to validate otp. Please try again later.');
      }
    };

    const handleGuestAddress = async (e) => {
      e.preventDefault();
   
     const payload1 = {
       UserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
       id: "string",
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
   
 const payload2 = {
       CustomerId : "string",
       id: "string",
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
       State: "Andhra Pradesh",
       StateId: "1",
       District: "Visakhapatnam",
       DistrictId: "110",
       ZipCode: "",
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
      //  alert('Customer registered successfully!');
       Navigate(`/profilePage/customer/${newUserId}`);
     } catch (error) {
       console.error('Registration Error:', error);
       window.alert('Failed to Registration. Please try again later.');
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
  

const handleBothMethods = (e) => {
  e.preventDefault();
  handleOTPVerification(e);
  // handleVerificationAndAddress(e);
  // handleGuestAddress(e);
};
    
    return (
        <div class="h-100 d-flex align-items-center py-2 flex-column">
        <div class="login_section bg-light">
            <div class="d-flex align-items-center">
                <img src={HandyManCharacter} alt="Handy Man Character" />
            </div>
            <div class="rgt_cnt" id="MobileVerify">
                {/* <form id="myForm" class="d-flex gap-3 flex-column" method="post" enctype="multipart/form-data"> */}

                    <img src={HandyManLogo} alt="Handy Man Logo" />
                    <h4 className='m-1'>Enter Verification Code</h4>
                    <div id="test" class="test"></div>
                    <div class="otp_input" id="otp_input">
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
                    <div>
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
                        fontSize: "inherit"
                        }}
                    >
                        Resend
                    </button>
                    </div>

                    <div>
                        Incorrect Mobile Number? <a class="link" asp-area="" href="/">Change</a>
                    </div>
                   
                    <button className="btn btn-dark text-center" onClick={handleBothMethods} type="submit">Submit  </button>
                    
                    
                    <div className="timer" style={{ color: "red", fontWeight: "bold", marginTop: "15px" }}>
                        {timeLeft > 0 ? `Time Left: ${timeLeft} seconds` : 'You can resend the OTP now.'}
                    </div>

                    {/* {timeLeft > 0 && (
                    <div className="timer" style={{ color: "red", fontWeight: "bold", marginTop: "15px" }}>
                        Time Left: {timeLeft} seconds
                    </div>
                    )} */}
                {/* </form> */}
            </div>
        </div>
    </div>
 )
};
export default OTPVerificationPage;