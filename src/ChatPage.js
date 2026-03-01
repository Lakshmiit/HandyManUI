import React, { useState, useEffect,useRef, useCallback  } from 'react';
import { ArrowBack, Send } from '@mui/icons-material';
import { Box, Modal,Typography, DialogContent, DialogTitle, TextField, IconButton, Divider, Tabs, Tab, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
// import Picker from 'emoji-picker-react'; 
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css'; 
import axios from "axios";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Dialog, } from '@mui/material';
import ChatLogo from './img/ChatLogo_123.jpeg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';             
// import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close'; 
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ApartmentIcon from '@mui/icons-material/Apartment';

const ChatPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [messageInput, setMessageInput] = useState('');
const [selectedFile, setSelectedFile] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [profile, setProfile] = useState({});
  const { userId, userType } = useParams();
const [open, setOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState('');

const menuList = [
  { MenuIcon: <SupportAgentIcon />, MenuTitle: "Raise Ticket", TargetUrl: `/raiseTicket/${userType}/${userId}` },
  { MenuIcon: <PersonOutlineIcon />, MenuTitle: "Book Technician", TargetUrl: `/bookTechnician/${userType}/${userId}` },
  { MenuIcon: <StorefrontIcon />, MenuTitle: "Buy Products", TargetUrl: `/buyProducts/${userType}/${userId}` },
  { MenuIcon: <ApartmentIcon />, MenuTitle: "Apartment AMC", TargetUrl: `/aboutApartmentRaiseTicket/${userType}/${userId}` },
];
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [photos] = useState([]);
const chatEndRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
const videoRef = useRef(null);
const [tabType] = useState('news');
// const [tabType, setTabType] = useState('news');
const seenMessages = useRef(new Set());
const isAdmin = userType === 'admin';
const [showMessageInfo, setShowMessageInfo] = useState(false);
const [selectedMessage, setSelectedMessage] = useState(null);
const [messageCounts, setMessageCounts] = useState({
  news: 0,
  buysell: 0,
  tolet: 0,
});
// const [likedMessages, setLikedMessages] = useState(new Set());
// const skipScrollRef = useRef(false);
const [openDisclaimer, setOpenDisclaimer] = useState(false);
// const [retrievedId] = useState(null);
const [countData] = useState(null);
// const [retrievedId, setRetrievedId] = useState(null);
// const [countData, setCountData] = useState(null);
const chatContainerRef = useRef(null);
const [autoScroll, setAutoScroll] = useState(true);
const [userLikes] = useState([]);
// const [userLikes, setUserLikes] = useState([]);

useEffect(() => {
  const container = chatContainerRef.current;
  if (!container) return;
  const handleScroll = () => {
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 50;
    setAutoScroll(isNearBottom);
  };
  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, []);

// // Scroll only when autoScroll is true
// useEffect(() => {
//   if (autoScroll && chatEndRef.current) {
//     chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }
// }, [messages, autoScroll]);

// useEffect(() => {
//     const fetchUserLikes = async () => {
//       try {
//         const response = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/UserLikes/GetUserLikes?UserId=${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user likes");
//         }
//         const data = await response.json();
//         const filteredData = data.map((item) => ({
//           id: item.id,
//           userLikesId: item.userLikesId,
//           messageId: item.messageId,
//           userId: item.userId,
//           islike: item.islike,
//           date: item.date,
//         }));
//         setUserLikes(filteredData);
//       } catch (error) {
//         console.error("Error fetching user likes:", error);
//       }
//     };
//     fetchUserLikes();
//   }, [userId]);

const handleShowMessageInfo = (msg) => {
  setSelectedMessage(msg);
  setShowMessageInfo(true);
};

const handleDeleteMessage = async (messageId) => {
  if (!messageId) {
    console.error("Message ID is missing!");
    return;
  }
  try {
    await axios.delete(`https://handymanapiv2.azurewebsites.net/api/ChatBot?id=${messageId}`);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  } catch (error) {
    console.error("Error deleting message:", error);
  }
};

// const markTabSeen = (tab) => {
//   const seenTabs = JSON.parse(localStorage.getItem('seenTabs') || '{}');
//   seenTabs[tab] = true;
//   localStorage.setItem('seenTabs', JSON.stringify(seenTabs));
// };

const clearTabSeen = (tab) => {
  const seenTabs = JSON.parse(localStorage.getItem('seenTabs') || '{}');
  seenTabs[tab] = false;
  localStorage.setItem('seenTabs', JSON.stringify(seenTabs));
};


const handleClickOpen = (imgData) => {
  setSelectedImage(imgData);
  setOpen(true);
};

 useEffect(() => {
    document.body.classList.add("chat-scroll");
    return () => {
      document.body.classList.remove("chat-scroll");
    };
  }, []);

const handleClose = () => {
  setOpen(false);
};
// useEffect(() => {
//   const storedLikes = localStorage.getItem(`likedMessages_${userId}`);
//   if (storedLikes) {
//     setLikedMessages(new Set(JSON.parse(storedLikes)));
//   }
// }, [userId]);

// const toggleLike = (messageId) => {
//   setLikedMessages((prev) => {
//     const updated = new Set(prev);
//     if (updated.has(messageId)) {
//       updated.delete(messageId);
//     } else {
//       updated.add(messageId);
//     }
//     localStorage.setItem(`likedMessages_${userId}`, JSON.stringify([...updated]));
//     return updated;
//   });
// };

useEffect(() => {
  if (
    (tabType === 'buysell' && userType === 'customer') ||
    (tabType === 'tolet' && userType === 'customer')
  ) {
    setOpenDisclaimer(true);
  }
}, [tabType, userType]);

const handleIconClick = () => {
  fileInputRef.current.click(); 
};

const removeSelectedFile = (indexToRemove) => {
  setSelectedFile((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
};

const handleCapture = () => {
  const canvas = document.createElement('canvas');
  const video = videoRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (canvas.toBlob) {
    canvas.toBlob((blob) => {
      const file = new File([blob], `captured_${Date.now()}.jpg`, { type: 'image/jpeg' });
      setSelectedFile((prev) => [...prev, file]);
      setCameraOpen(false);
    }, 'image/jpeg');
  } else {
    const dataUrl = canvas.toDataURL('image/jpeg');
    const byteString = atob(dataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const file = new File([intArray], `captured_${Date.now()}.jpg`, { type: 'image/jpeg' });
    setSelectedFile((prev) => [...prev, file]);
    setCameraOpen(false); 
  }
};

useEffect(() => {
  if (cameraOpen) {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' } 
    })
    .then((stream) => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', true); 
        video.muted = true; 
        video.play().catch(err => console.error('Error playing video:', err));
      }
    })
    .catch((err) => {
      console.error('Error accessing camera:', err);
    });
  } else {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  }
}, [cameraOpen]);

// useEffect(() => {
//    if (skipScrollRef.current) {
//     skipScrollRef.current = false; 
//     return; 
//   }
//   if (chatEndRef.current) {
//     chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }
// }, [messages]);

  useEffect(() => {
    console.log(profile,profileImage,countData, loading, autoScroll);
  }, [loading, profileImage, countData,profile, autoScroll]);

//   useEffect(() => {
//   if (!isAdmin) return; 

//   if (['news', 'buysell', 'tolet'].includes(tabType)) {
//     messages.forEach(msg => {
//       if (!seenMessages.current.has(msg.id)) {
//         fetch('https://handymanapiv2.azurewebsites.net/api/MarkMessageSeen/UploadMessageSeenCount', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ id: "string", messageId: msg.id, userId })
//         })
//           .then(() => seenMessages.current.add(msg.id))
//           .catch(console.error);
//       }
//     });
//   }
// }, [messages, tabType, userId, isAdmin]);

useEffect(() => {
  if (!isAdmin) return;
  if (['news', 'buysell', 'tolet'].includes(tabType)) {
    messages.forEach(msg => {
      if (!seenMessages.current.has(msg.id)) {
        fetch('https://handymanapiv2.azurewebsites.net/api/MarkMessageSeen/UploadMessageSeenCount', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: "string", messageId: msg.id, userId })
        })
        .then(() => {
          seenMessages.current.add(msg.id);
          setMessageCounts(prev => ({
            ...prev,
            [tabType]: Math.max(0, prev[tabType] - 1),
          }));
        })
        .catch(console.error);
      }
    });
  }
}, [messages, tabType, userId, isAdmin]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`
      );
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setProfile(data);
      setFullName(data.fullName);

      if (data.photoAttachmentId) {
        fetchImageUrl(data.photoAttachmentId);
      }
    } catch (error) {
      console.log('Error Fetching Data:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchProfileData();
}, [userType, userId]);


useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `https://handymanapiv2.azurewebsites.net/api/customer/customerProfileData?profileType=${userType}&UserId=${userId}`
      );
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setProfile(data);
      setFullName(data.fullName);

      if (data.photoAttachmentId) {
        fetchImageUrl(data.photoAttachmentId);
      }
    } catch (error) {
      console.log('Error Fetching Data:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchProfileData();
}, [userType, userId]);

//   const fetchCounts = useCallback(async () => {
//     try {
//       const types = ['news', 'buysell', 'tolet'];
//       const counts = {};
//       for (const type of types) {
//         const res = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessagesByType?type=${type}`);
//         if (!res.ok) throw new Error(`Failed to fetch ${type} messages`);
//         const data = await res.json();
//         counts[type] = data.length;
//         const seenTabs = JSON.parse(localStorage.getItem('seenTabs') || '{}');
//         Object.keys(seenTabs).forEach(tab => {
//           if (seenTabs[tab]) counts[tab] = 0;
//         });
//       }
//       if (retrievedId) {
//         const seenRes = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/ChatMessageTabSeenByUser/GetChatMessageTabSeenByUserById?id=${retrievedId}`
//         );
//         if (!seenRes.ok) throw new Error("Failed to fetch tab seen status");
//         const tabData = await seenRes.json();
//         if (tabData.chatTabNews === false) counts.news = 0;
//         if (tabData.chatTabBuySell === false) counts.buysell = 0;
//         if (tabData.chatTabTolet === false) counts.tolet = 0;
//       }
//       localStorage.setItem("chatCounts", JSON.stringify(counts));
//       setMessageCounts(counts);
//     } catch (err) {
//       console.error('Error fetching message counts:', err);
//     }
// }, [retrievedId]); 

const fetchCounts = useCallback(async () => {
  try {
    const types = ['news', 'buysell', 'tolet'];
    const results = await Promise.all(
      types.map(type =>
        fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessagesByType?type=${type}`)
          .then(res => res.ok ? res.json() : [])
          .catch(() => [])
      )
    );
    const counts = {};
    types.forEach((type, idx) => {
      counts[type] = results[idx].length;
    });
    const seenTabs = JSON.parse(localStorage.getItem('seenTabs') || '{}');
    Object.keys(seenTabs).forEach(tab => {
      if (seenTabs[tab]) counts[tab] = 0;
    });
    // if (retrievedId) {
    //   const seenRes = await fetch(
    //     `https://handymanapiv2.azurewebsites.net/api/ChatMessageTabSeenByUser/GetChatMessageTabSeenByUserById?id=${retrievedId}`
    //   );
    //   if (seenRes.ok) {
    //     const tabData = await seenRes.json();
    //     if (!tabData.chatTabNews) counts.news = 0;
    //     if (!tabData.chatTabBuySell) counts.buysell = 0;
    //     if (!tabData.chatTabTolet) counts.tolet = 0;
    //   }
    // }
    localStorage.setItem("chatCounts", JSON.stringify(counts));
    setMessageCounts(counts);
  } catch (err) {
    console.error('Error fetching message counts:', err);
  }
// }, [retrievedId]);
}, []);


useEffect(() => {
  fetchCounts();
}, [fetchCounts]);

// useEffect(() => {
//   const fetchIndividualCounts = async () => {
//   try {
//     // const types = ['news', 'buysell', 'tolet'];
//     // const counts = {};
//     // for (const type of types) {
//       const res = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatBotByUserId?UserId=${userId}`);
//       if (!res.ok) throw new Error(`Failed to fetch messages`);
//       const data = await res.json();
//      setIndividualCounts(data);
//     // }
//     // setMessageCounts(counts);
//   } catch (err) {
//     console.error('Error fetching message counts:', err);
//   }
// };
//  fetchIndividualCounts();
// }, [userId]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessagesByType?type=${tabType}`);
  //       if (!response.ok) throw new Error('Failed to fetch messages');
  //       const data = await response.json();
  //       const updatedMessages = await Promise.all(data.map(async (msg) => {
  //         if (!msg.uploadFile || msg.uploadFile.length === 0) return msg;
  //         const imageFiles = await Promise.all(
  //           msg.uploadFile.map(async (photo) => {
  //             try {
  //               const res = await fetch(`https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`);
  //               const fileData = await res.json();
  //               return {
  //                 src: photo,
  //                 imageData: fileData.imageData,
  //               };
  //             } catch {
  //               return null;
  //             }
  //           })
  //         );
  //         return {
  //           ...msg,
  //           uploadedImages: imageFiles.filter(Boolean),
  //         };
  //       }));
  //       setMessages(updatedMessages);
  //       // const seenTabs = JSON.parse(localStorage.getItem('seenTabs') || '{}');
  //       const prevCount = messageCounts[tabType] || 0;
  //       if (data.length > prevCount) {
  //         clearTabSeen(tabType);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };
  //   fetchMessages();
  // }, [tabType, messageCounts]);

  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessagesByType?type=${tabType}`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      // Fetch all images in parallel for all messages
      const updatedMessages = await Promise.all(
        data.map(async (msg) => {
          if (!msg.uploadFile?.length) return msg;
          const imageFiles = await Promise.all(
            msg.uploadFile.map(photo =>
              fetch(`https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`)
                .then(r => r.json())
                .then(fileData => ({ src: photo, imageData: fileData.imageData }))
                .catch(() => null)
            )
          );
          return { ...msg, uploadedImages: imageFiles.filter(Boolean) };
        })
      );
      setMessages(updatedMessages);
      const prevCount = messageCounts[tabType] || 0;
      if (data.length > prevCount) clearTabSeen(tabType);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };
  fetchMessages();
}, [tabType, messageCounts]);


  // Identify today's first message 
const hasScrolledToTodayRef = useRef(false);
useEffect(() => {
  if (hasScrolledToTodayRef.current) return; 

  if (messages.length > 0) {
    const today = new Date().toDateString();
    const firstTodayIndex = messages.findIndex(msg => {
      if (!msg.dateTime) return false;
      return new Date(msg.dateTime).toDateString() === today;
    });

    if (firstTodayIndex !== -1) {
      const messageElement = document.getElementById(`msg-${firstTodayIndex}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        hasScrolledToTodayRef.current = true; 
      }
    }
  }
}, [messages]);

 // Fetch seen count for selected message
useEffect(() => {
  if (selectedMessage?.id) {
    fetch(`https://handymanapiv2.azurewebsites.net/api/MarkMessageSeen/GetMarkMessageSeenUsers?messageId=${selectedMessage.id}`)
      .then(res => res.json())
      .then(data => {
        setMessageCounts(prev => ({
          ...prev,
          [selectedMessage.id]: data.usersCount
        }));
      });
  }
}, [selectedMessage]);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const validFiles = files.filter((file) =>
    ['image/jpeg', 'image/png'].includes(file.type)
  );
 
  if (validFiles.length + photos.length > 5) {
    alert("You can upload up to 5 files.");
    return;
  }

  setSelectedFile(validFiles);
};
  
  // Convert the file to a byte array
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

   const uploadFile = async (byteArray, fileName, mimeType, file) => {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([byteArray], { type: mimeType }), fileName);
      formData.append('fileName', fileName);

      const response = await fetch('https://handymanapiv2.azurewebsites.net/api/FileUpload/upload?filename=' + fileName, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
        },
        body: formData,
      });

      const responseData = await response.text();
      return responseData || ''; 
    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };

const handleSend = async (e) => {
  e.preventDefault();
   if (tabType === 'news' && !isAdmin) {
      alert('Only admins can post in News tab.');
      return;
    }
  if (!messageInput && selectedFile.length === 0) return;
  setLoading(true);
  let uploadedUrls = [];
  for (let i = 0; i < selectedFile.length; i++) {
    const file = selectedFile[i];
    const fileName = file.name;
    const mimetype = file.type;
    const byteArray = await getFileByteArray(file);
    const uploadedUrl = await uploadFile(byteArray, fileName, mimetype, file);
    if (uploadedUrl) {
      uploadedUrls.push(uploadedUrl);
    }
  }
  const frontendTime = new Date().toISOString(); 
  const payload = {
    id: 'string',
    userName: fullName,
    dateTime: frontendTime, 
    userId: userId,
    chatBotId: 'string',
    message: messageInput,
    uploadFile: uploadedUrls,
    chatType:  tabType,
    NumberOfLikes: "",
  };
  try {
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/UploadChatBot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, dateTime: "string" }), 
    });
    if (!response.ok) throw new Error('Failed to submit message.');
const uploadedImages = await Promise.all(
  uploadedUrls.map(async (photoId) => {
    try {
      const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photoId}`);
      const data = await response.json();
      return {
        src: photoId,
        imageData: data.imageData,
      };
    } catch (err) {
      return null;
    }
  })
);
setMessages((prev) => [
  ...prev,
  {
    ...payload,
    uploadedImages: uploadedImages.filter(Boolean), 
  }
]);

setMessageCounts(prev => ({
  ...prev,
  [tabType]: (prev[tabType] || 0) + 1
}));
    setMessageInput('');
    setSelectedFile([]);
  } catch (error) {
    console.error('Error submitting message:', error);
  } finally {
    setLoading(false);
  }
};

const handleLikeClick = async (message) => {
  const isLiked = userLikes.some((like) => like.messageId === message.id && like.islike);

  const currentLikes = Number(message.numberOfLikes) || 0;
  const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

  setMessages((prevMessages) =>
    prevMessages.map((msg) =>
      msg.id === message.id ? { ...msg, numberOfLikes: updatedLikes } : msg
    )
  );

  try {
    await axios.put(
      `https://handymanapiv2.azurewebsites.net/api/ChatBot/UpdateChatBot?id=${message.id}`,
      {
        id: message.id,
        userName: message.userName,
        dateTime: message.dateTime,
        userId: message.userId,
        chatBotId: message.chatBotId,
        message: message.message,
        chatType: message.chatType,
        numberOfLikes: updatedLikes.toString(),
        uploadFile: message.uploadFile || [],
      }
    );

    // const existingLike = userLikes.find(
    //   (like) => like.messageId === message.id && like.userId === userId
    // );

    // if (existingLike) {
    //   const updatedLike = {
    //     ...existingLike,
    //     islike: !existingLike.islike,
    //     date: new Date().toISOString(),
    //   };

    //   await axios.put(
    //     `https://handymanapiv2.azurewebsites.net/api/UserLikes/UpdateUserLikes?id=${existingLike.id}&userId=${userId}`,
    //     updatedLike
    //   );

    //   setUserLikes((prev) =>
    //     prev.map((l) => (l.id === existingLike.id ? updatedLike : l))
    //   );
    // } 
    // else {
    //   const newLike = {
    //     id: "string",
    //     userLikesId: "string",
    //     messageId: message.id,
    //     userId: userId,
    //     islike: true,
    //     date: new Date().toISOString(),
    //   };

    //   await axios.post(
    //     "https://handymanapiv2.azurewebsites.net/api/UserLikes/UploadUserLikesController",
    //     newLike
    //   );

    //   setUserLikes((prev) => [...prev, newLike]);
    // }

    // const res = await axios.get(
    //   `https://handymanapiv2.azurewebsites.net/api/UserLikes/GetUserLikes?UserId=${userId}`
    // );
    // const filteredData = res.data.map((item) => ({
    //   id: item.id,
    //   userLikesId: item.userLikesId,
    //   messageId: item.messageId,
    //   userId: item.userId,
    //   islike: item.islike,
    //   date: item.date,
    // }));
    // setUserLikes(filteredData);
  } catch (error) {
    console.error("Error updating like:", error);

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, numberOfLikes: currentLikes } : msg
      )
    );
  }
};




// const handleLikeClick = async (message) => {
//   const isLiked = likedMessages.has(message.id);
//   const currentLikes = Number(message.numberOfLikes) || 0;
//   const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

//   toggleLike(message.id);
//   skipScrollRef.current = true;

//   setMessages((prevMessages) =>
//     prevMessages.map((msg) =>
//       msg.id === message.id ? { ...msg, numberOfLikes: updatedLikes } : msg
//     )
//   );

//   try {
//     await axios.put(`https://handymanapiv2.azurewebsites.net/api/ChatBot/UpdateChatBot?id=${message.id}`, {
//       id: message.id,
//       userName: message.userName,
//       dateTime: message.dateTime,
//       userId: message.userId,
//       chatBotId: message.chatBotId,
//       message: message.message,
//       chatType: message.chatType,
//       numberOfLikes: updatedLikes.toString(),
//       uploadFile: message.uploadFile || [],
//     });

//     await axios.post("https://handymanapiv2.azurewebsites.net/api/UserLikes/UploadUserLikesController", {
//       id: "string", 
//       userLikesId: "string", 
//       messageId: message.id,
//       userId: userId,
//       islike: !isLiked, 
//       date: "string",
//     });

//   } catch (error) {
//     console.error("Error updating like:", error);

//     toggleLike(message.id);
//     setMessages((prevMessages) =>
//       prevMessages.map((msg) =>
//         msg.id === message.id ? { ...msg, numberOfLikes: currentLikes } : msg
//       )
//     );
//   }
// };

// const handleLikeClick = async (message) => {
//   const isLiked = likedMessages.has(message.id);
//   const currentLikes = Number(message.numberOfLikes) || 0;
//   const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

//   toggleLike(message.id);
//  skipScrollRef.current = true;
//   setMessages((prevMessages) =>
//   prevMessages.map((msg) =>
//     msg.id === message.id ? { ...msg, numberOfLikes: updatedLikes } : msg
//   )
// );

//   try {
//     await axios.put(`https://handymanapiv2.azurewebsites.net/api/ChatBot/UpdateChatBot?id=${message.id}`, {
//       id: message.id,
//       userName: message.userName,
//       dateTime: message.dateTime, 
//       userId: message.userId,
//       chatBotId: message.chatBotId,
//       message: message.message,
//       chatType:  message.chatType,
//       numberOfLikes: updatedLikes.toString(),
//       uploadFile: message.uploadFile || [],
//     });
//   } catch (error) {
//     console.error("Error updating like count:", error);
//     toggleLike(message.id);
//     setMessages((prevMessages) =>
//       prevMessages.map((msg) =>
//         msg.id === message.id ? { ...msg, numberOfLikes: currentLikes } : msg
//       )
//     );
//   }
// }; 

// const handleIndividualCount = useCallback(async (tabType) => {
//     if (tabType === "news") {
//       const payload = {
//         id: "string",
//         dateTime: "string",
//         chatMessageTabSeenByUserId: "string",
//         userId: userId,
//         chatTabNews: false,
//         chatTabBuySell: true,
//         chatTabTolet: true
//       };

//       try {
//         const response = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/ChatMessageTabSeenByUser/UploadChatMessageTabSeenByUser`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//           }
//         );

//         if (!response.ok) throw new Error("Failed to submit Count.");
//         const data = await response.json();
//         console.log("POST API Response:", data);
//         markTabSeen(tabType);
//         const match = data.message.match(/^chatMessageTabSeenByUser(.+?) uploaded successfully\.$/);
//         if (match && match[1]) {
//           setRetrievedId(match[1]); 
//         }
//       } catch (error) {
//         console.error("Error in POST:", error);
//       }
//     } else if ((tabType === "buysell" || tabType === "tolet") && retrievedId) {
//       try {
//         const getResponse = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/ChatMessageTabSeenByUser/GetChatMessageTabSeenByUserById?id=${retrievedId}`
//         );
//         if (!getResponse.ok) throw new Error("Failed to fetch details by ID.");
//         const getData = await getResponse.json();
//         const updatedPayload = {
//           ...getData,
//           chatTabBuySell: tabType === "buysell" ? false : getData.chatTabBuySell,
//           chatTabTolet: tabType === "tolet" ? false : getData.chatTabTolet
//         };

//         const putResponse = await fetch(
//           `https://handymanapiv2.azurewebsites.net/api/ChatMessageTabSeenByUser/UpdateChatMessageTabSeenByUser?id=${retrievedId}`,
//           {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedPayload),
//           }
//         );

//         if (!putResponse.ok) throw new Error("Failed to update Count.");
//         const putData = await putResponse.json();
//         console.log("PUT API Response:", putData);
//         markTabSeen(tabType);
//         const countPayload = {
//           id: retrievedId,
//           dateTime: getData.dateTime,
//           chatMessageTabSeenByUserId: getData.chatMessageTabSeenByUserId,
//           userId: getData.userId,
//           chatTabNews: getData.chatTabNews,
//           chatTabBuySell: tabType === "buysell" ? false : getData.chatTabBuySell,
//           chatTabTolet: tabType === "tolet" ? false : getData.chatTabTolet,
//         };
//         setCountData(countPayload);
//         await fetchCounts();
//       } catch (error) {
//         console.error("Error in GET/PUT:", error);
//       }
//     } else {
//       console.warn("No retrievedId available yet for GET/PUT");
//     }
//   }, [userId, retrievedId, fetchCounts]);

//   useEffect(() => {
//   if (tabType === "news") {
//     handleIndividualCount(tabType);
//   }
// }, [tabType, handleIndividualCount]); 

  // const handleEmojiClick = (emojiObject) => {
  //   setMessageInput((prev) => prev + emojiObject.emoji);
  //   setShowEmojiPicker(false);
  // };

  return (
    <>
    <Box className="chat-page" >
    <Box className="chat-header">
     <Header />
     
     <div className="main-content" style={{ paddingTop: isMobile ? '150px' : '140px', overflowY: 'auto',
  height: 'calc(100vh - 0px)' }}>
        <div className={`container ${isMobile ? 'w-100' : 'w-100'}`}
        >
          {isMobile && (
            <div
              className="mobile-top-icons position-fixed start-0 end-0 bg-white border-bottom shadow-sm"
              style={{
                top: '80px',
                zIndex: 1050,
                height: '70px',
                padding: '6px 8px',
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
                    {React.cloneElement(menu.MenuIcon, { sx: { fontSize: 28 } })}
                    <small style={{
                      fontSize: "12px",
                      fontFamily: 'Poppins',
                      textAlign: 'center',
                      lineHeight: '16px'
                    }}>
                      {menu.MenuTitle.split(" ").map((word, index) => (
                        <React.Fragment key={index}>
                          {word}
                          {index !== menu.MenuTitle.split(" ").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </small>
                  </a>
                ))}
              </div>
            </div>
          )}
          {/* <Box sx={{ maxWidth: 500,  boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}> */}
             <Box className="chat-top-bar mt-mob-50" sx={{ display: 'flex', alignItems: 'center', bgcolor: '#2196f3', color: 'white', px: 2, py: 1 }}>
              <div onClick={() => {
            localStorage.setItem('selectedTabType', tabType); 
            localStorage.setItem('selectedTabCount', messageCounts[tabType]); 
             navigate(`/profilePage/${userType}/${userId}`);
          }} style={{ cursor: 'pointer'}}>
                <ArrowBack fontSize='large' />
              </div>
             <img src={ChatLogo} alt="" className='HMchat-logo-img' />
              <Typography variant="h6" sx={{ ml: 2 }}>Announcements</Typography>
            </Box>
          {/* <Box className="chat-tabs" sx={{ flexShrink: 0, borderBottom: '1px solid #ddd' }}> */}
            <Tabs 
              value={tabType}
              // onChange={(_, newValue) => {
              //   setTabType(newValue);
              //   if (newValue === "news") {
              //     handleIndividualCount("news");
              //   } else if ((newValue === "buysell" || newValue === "tolet") && retrievedId) {
              //     handleIndividualCount(newValue);
              //   }
              //   // handleIndividualCount(newValue); 
              // }}
              variant="fullWidth"
              sx={{ bgcolor: '#f5f5f5' }}
            >
              <Tab value="news" label={`News Articles (${messageCounts.news})`} />
              <Tab value="buysell" label={`Buy/Sell (${messageCounts.buysell})`} />
              <Tab value="tolet" label={`Tolets (${messageCounts.tolet})`} />
            </Tabs>
           </div>
          
            {tabType === 'news' && <Box p={2}></Box>}
            {tabType === 'buysell' && <Box p={2}></Box>}
            {tabType === 'tolet' && <Box p={2}></Box>}

            <Box className="chat-messages" ref={chatContainerRef}>
              {messages.map((msg, idx) => (
                <Box  id={`msg-${idx}`} key={msg.id} className={`chat-message ${msg.userId === userId ? 'user' : 'other'}`}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <div className="chat-img-wrapper">
                      <img src={profileImage} alt="Profile" className="chat-img" />
                    </div>
                    {msg.userName && <Typography variant="body2">{msg.userName}</Typography>}
                    {isAdmin && (
                      <Typography
                        variant="body2"
                        onClick={() => handleShowMessageInfo(msg)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <ExpandMoreIcon />
                      </Typography>
                    )}
                     {(
                          (
                            (userType === 'admin' && (tabType === 'buysell' || tabType === 'news')) ||
                            (userType === 'customer' && tabType === 'buysell')
                          ) &&
                          msg.userId === userId 
                        ) && (
                          <IconButton
                            onClick={() => {
                              console.log("Trying to delete", msg);
                              handleDeleteMessage(msg.id);
                            }}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                  </Box>

                 {msg.uploadedImages?.length > 0 && (
                  <Box sx={{ mt:1, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {msg.uploadedImages.map((img, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: 'relative',
                          width: '1050px',
                          height: '200px',
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          src={`data:image/jpeg;base64,${img.imageData}`}
                          alt={`uploaded-${i}`}
                          onClick={() =>
                            handleClickOpen(`data:image/jpeg;base64,${img.imageData}`)
                          }
                          style={{
                            maxWidth: '100%',
                            borderRadius: '8px',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                      
                  {/* Dialog for image zoom */}
                  <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ m: 0, p: 0 }}>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon sx={{color: 'red'}}/>
                      </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ p: 0 }}>
                      <img
                        src={selectedImage}
                        alt="Zoomed"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    </DialogContent>
                  </Dialog>

                  <Box sx={{ mt: 2 }}>
                    {msg.message &&
                      msg.message
                        .replace(/\s*([A-Za-z ]+):\s*/g, "\n$1: ")
                        .replace(/(Rs\s*\d+\s*\/-)\s*(?=[A-Za-z])/g, "$1\n")
                        .replace(/\n{2,}/g, "\n")
                        .split("\n")
                        .map((line, index) => (
                          <Typography key={index} variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {line.trim()}
                          </Typography>
                        ))}
                  </Box>

                  {/* {msg.message && <Typography variant="body2">{msg.message}</Typography>} */}
                  {msg.dateTime && !isNaN(Date.parse(msg.dateTime)) && (
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleLikeClick(msg)}
                        >
                          {userLikes.some((like) => like.messageId === msg.id && like.islike) ? (
                            <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon fontSize="small" />
                          )}
                        </IconButton>
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#666' }}>
                          {msg.numberOfLikes}
                        </Typography>
                      </Box>
                    {new Date(msg.dateTime).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
                      })}
                    </Typography>
                  )}

                  {(['news', 'buysell', 'tolet'].includes(tabType) && userType === 'admin' && msg.seenCount !== undefined) && (
                  <Typography 
                    variant="caption" 
                    sx={{ fontSize: '0.7rem', color: '#888', textAlign: 'right', mt: '2px' }}
                  >
                    Seen by {msg.seenCount} {msg.seenCount === 1 ? 'user' : 'users'}
                  </Typography>
                )}
                </Box>
              ))}
              <Box ref={chatEndRef} /> 
            </Box> 
        
            {userType === 'admin' && tabType === 'news' && (
              <>
              <Button variant="text" onClick={() => setOpenDisclaimer(true)} sx={{ fontSize: '0.75rem' }}>
              View Disclaimer
            </Button>
            <Modal open={openDisclaimer} onClose={() => setOpenDisclaimer(false)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 320,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOpenDisclaimer(false)} size="small">
                      <CloseIcon sx={{ color: 'red' }}/>
                    </IconButton>
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: '#555' }}>
                    📢 <strong>Disclaimer – News Section:</strong> News updates shown here are short summaries based on publicly available content from reputed sources.
                All rights and credits belong to the original publishers. No copyrighted content is reproduced.
                For full details, please refer to the respective news source.
                  </Typography>
                </Box>
              </Modal>
              </>
            )}
            
            {userType === 'customer' && tabType === 'buysell' && (
              <>
              <Button variant="text" onClick={() => setOpenDisclaimer(true)} sx={{ fontSize: '0.75rem' }}>
              View Disclaimer
            </Button>
            <Modal open={openDisclaimer} onClose={() => setOpenDisclaimer(false)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 320,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOpenDisclaimer(false)} size="small">
                      <CloseIcon sx={{ color: 'red' }}/>
                    </IconButton>
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: '#555' }}>
                    📢 <strong>Disclaimer – Buy/Sell Section:</strong> The Buy/Sell section is a community feature to help users post and view items for sale or purchase. Handyman App does not verify the ownership, condition, authenticity, or legality of the items listed. All transactions are strictly between the buyer and the seller.
                    <br />
                    Users are advised to exercise caution and verify details before making any payments or exchanges. Handyman App is not responsible for any disputes, losses, or damages arising from such transactions.
                  </Typography>
                </Box>
              </Modal>
              </>
            )}

            {userType === 'customer' && tabType === 'tolet' && (
              <>
              <Button variant="text" onClick={() => setOpenDisclaimer(true)} sx={{ fontSize: '0.75rem' }}>
              View Disclaimer
            </Button>
            <Modal open={openDisclaimer} onClose={() => setOpenDisclaimer(false)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 320,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOpenDisclaimer(false)} size="small">
                      <CloseIcon sx={{ color: 'red' }}/>
                    </IconButton>
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: '#555' }}>
                    📢 <strong>Disclaimer – To-Let Section:</strong> The To-Let section is intended only as a listing platform for property owners and tenants. Handyman App does not verify the accuracy, legality, availability, or authenticity of rental listings posted by users. We do not act as a broker or agent.
                    <br />
                      All rental inquiries, agreements, and transactions are solely between the property owner and the interested party. Users are advised to verify property details independently before proceeding. Handyman App is not responsible for any disputes, financial losses, or legal issues arising from such interactions.
                  </Typography>
                </Box>
              </Modal>
              </>
            )}

            {(tabType !== 'news' || isAdmin) ? (
              <>
                <Divider />
                <Box className="chat-input">
                  {/* <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}><InsertEmoticonIcon /></IconButton> */}
                  <TextField placeholder="Type your message..." variant="outlined" size="small" fullWidth value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                  <>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple onChange={handleFileChange} />
                    <IconButton onClick={() => setCameraOpen(true)}><PhotoCamera /></IconButton>
                    <Button sx={{ minWidth: '40px' }} onClick={handleIconClick}><AttachFileIcon /></Button>
                  </>
                  <IconButton color="primary" onClick={handleSend}><Send /></IconButton>
                </Box>
                {/* {showEmojiPicker && (
                  <Box sx={{ position: 'absolute', bottom: '60px', right: '20px' }}>
                    <Picker onEmojiClick={handleEmojiClick} />
                  </Box>
                )} */}
                 <Dialog open={cameraOpen} onClose={() => setCameraOpen(false)} fullWidth maxWidth="sm">
                  <Box p={2}>
                    <Typography variant="h6" mb={2}>Take a Photo</Typography>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button onClick={() => setCameraOpen(false)} variant="outlined" color="secondary">
                        Cancel   
                      </Button>
                      <Button onClick={handleCapture} variant="contained" color="primary">
                        Capture
                      </Button>
                    </Box>
                  </Box>
                </Dialog>
              </>
            ) : (
              <Box p={2} textAlign="center">
                <Typography variant="body2" color="text.secondary">🔒 Only admins can post messages in the News tab. <br />
                </Typography>
              </Box>
            )}
            
            {selectedFile.length > 0 && (
              <Box sx={{ mt: 2, pl: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {selectedFile.map((file, index) => (
                  <Box
                    key={index}
                    sx={{ position: 'relative', width: 120, height: 120, borderRadius: 2, overflow: 'hidden', boxShadow: 2, marginBottom: '15px' }}
                  >
                    <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <Button onClick={() => removeSelectedFile(index)} sx={{ position: 'absolute', top: 2, right: 2, minWidth: '24px', padding: '2px 4px', fontSize: '0.7rem', backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}>
                      ✕
                    </Button>
                  </Box>
                ))}
              </Box>
            )}

    <>
    <Dialog open={showMessageInfo} onClose={() => setShowMessageInfo(false)}>
  <Box p={2}>
    <Typography variant="h6">Message Info</Typography>
    {selectedMessage ? (
      <>
        <p>{selectedMessage.message}</p>
       <p>
          Seen by {messageCounts[selectedMessage.id] !== undefined
            ? `${messageCounts[selectedMessage.id]} users`
            : '0 users'}
        </p>
      </>
    ) : (
      <p>No message selected.</p>
    )}
    <Box mt={3} display="flex" justifyContent="flex-end">
      <Button onClick={() => setShowMessageInfo(false)} color="primary" variant="outlined">
        Close
      </Button>
    </Box>
  </Box>
</Dialog>
      </>
        

         <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-end',  
            alignItems: 'center', 
            cursor: 'pointer', 
            margin: '5px' 
          }} 
          onClick={() => {
            localStorage.setItem('selectedTabType', tabType); 
            localStorage.setItem('selectedTabCount', messageCounts[tabType]); 
            navigate(`/profilePage/${userType}/${userId}`);
          }}
        >
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            textAlign: 'right', 
            color: 'blue', 
            textDecoration: 'underline' 
          }}>
            Back
          </div>
        </div>
          </div>
        </Box>
      </Box>
      </>
  );
};

export default ChatPage;
