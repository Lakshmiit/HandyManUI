import React, { useState, useEffect,useRef  } from 'react';
import { ArrowBack, Send } from '@mui/icons-material';
import { Box, Typography, TextField, IconButton, Divider, Tabs, Tab, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Picker from 'emoji-picker-react'; 
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css'; 
import axios from "axios";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Dialog, } from '@mui/material';
import ChatLogo from './img/ChatLogo1.jpeg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';             
// import ShareIcon from '@mui/icons-material/Share';

const ChatPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [messageInput, setMessageInput] = useState('');
const [selectedFile, setSelectedFile] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [profile, setProfile] = useState({});
  const { userId, userType } = useParams();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [photos] = useState([]);
const chatEndRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
const videoRef = useRef(null);
const [tabType, setTabType] = useState('news');
const seenMessages = useRef(new Set());
const isAdmin = userType === 'admin';
const [showMessageInfo, setShowMessageInfo] = useState(false);
const [selectedMessage, setSelectedMessage] = useState(null);
const [messageCounts, setMessageCounts] = useState({});
const [likedMessages, setLikedMessages] = useState(new Set());
const skipScrollRef = useRef(false);

const handleShowMessageInfo = (msg) => {
  setSelectedMessage(msg);
  setShowMessageInfo(true);
};

const toggleLike = (messageId) => {
  setLikedMessages((prev) => {
    const updated = new Set(prev);
    if (updated.has(messageId)) {
      updated.delete(messageId);
    } else {
      updated.add(messageId);
    }
    return updated;
  });
};

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
  canvas.getContext('2d').drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    const file = new File([blob], `captured_${Date.now()}.jpg`, { type: 'image/jpeg' });
    setSelectedFile((prev) => [...prev, file]);
    setCameraOpen(false);
  }, 'image/jpeg');
};

useEffect(() => {
  if (cameraOpen) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  } else {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  }
}, [cameraOpen]);

useEffect(() => {
   if (skipScrollRef.current) {
    skipScrollRef.current = false; 
    return; 
  }
  if (chatEndRef.current) {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

  useEffect(() => {
    console.log(profile,profileImage, loading);
  }, [loading, profileImage, profile]);

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
          .then(() => seenMessages.current.add(msg.id))
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
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/ChatBot/GetChatMessagesByType?type=${tabType}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        const updatedMessages = await Promise.all(data.map(async (msg) => {
          if (!msg.uploadFile || msg.uploadFile.length === 0) return msg;
          const imageFiles = await Promise.all(
            msg.uploadFile.map(async (photo) => {
              try {
                const res = await fetch(`https://handymanapiv2.azurewebsites.net/api/FileUpload/download?generatedfilename=${photo}`);
                const fileData = await res.json();
                return {
                  src: photo,
                  imageData: fileData.imageData,
                };
              } catch {
                return null;
              }
            })
          );
          return {
            ...msg,
            uploadedImages: imageFiles.filter(Boolean),
          };
        }));
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [tabType]);

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
    setMessageInput('');
    setSelectedFile([]);
  } catch (error) {
    console.error('Error submitting message:', error);
  } finally {
    setLoading(false);
  }
};

const handleLikeClick = async (message) => {
  const isLiked = likedMessages.has(message.id);
  const currentLikes = Number(message.numberOfLikes) || 0;
  const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

  toggleLike(message.id);
 skipScrollRef.current = true;
  setMessages((prevMessages) =>
    prevMessages.map((msg) =>
      msg.id === message.id ? { ...msg, numberOfLikes: updatedLikes } : msg
    )
  );

  try {
    await axios.put(`https://handymanapiv2.azurewebsites.net/api/ChatBot/UpdateChatBot?id=${message.id}`, {
      id: message.id,
      userName: message.userName,
      dateTime: message.dateTime, 
      userId: message.userId,
      chatBotId: message.chatBotId,
      message: message.message,
      chatType:  message.chatType,
      numberOfLikes: updatedLikes.toString(),
      uploadFile: message.uploadFile || [],
    });
  } catch (error) {
    console.error("Error updating like count:", error);
    toggleLike(message.id);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, numberOfLikes: currentLikes } : msg
      )
    );
  }
};

  const handleEmojiClick = (emojiObject) => {
    setMessageInput((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-row justify-content-start align-items-start">
        <div className={`container m-3 ${isMobile ? 'w-100' : 'w-100'}`}>
          <Box sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#2196f3', color: 'white', px: 2, py: 1 }}>
              <div onClick={() => navigate(`/profilePage/${userType}/${userId}`)} style={{ cursor: 'pointer'}}>
                <ArrowBack fontSize='large'/>
              </div>
             <img src={ChatLogo} alt="" className='HMchat-logo-img' />
              <Typography variant="h6" sx={{ ml: 2 }}>Free Services</Typography>
            </Box>
            
           <Tabs
              value={tabType}
              onChange={(_, newValue) => setTabType(newValue)}
              variant="fullWidth"
              sx={{ bgcolor: '#f5f5f5' }}
            >
              <Tab value="news" label="News Articles" />
              <Tab value="buysell" label="Buy/Sell" />
              <Tab value="tolet" label="Tolets" />
            </Tabs>

            {tabType === 'news' && <Box p={2}></Box>}
            {tabType === 'buysell' && <Box p={2}></Box>}
            {tabType === 'tolet' && <Box p={2}></Box>}

            <Box className="chat-container">
              {messages.map((msg, idx) => (
                <Box key={idx} className={`chat-message ${msg.userId === userId ? 'user' : 'other'}`}>
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
                  </Box>

                  {msg.uploadedImages?.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {msg.uploadedImages.map((img, i) => (
                        <Box key={i} sx={{ position: 'relative', width: '140px', height: '140px' }}>
                          <img
                            src={`data:image/jpeg;base64,${img.imageData}`}
                            alt={`uploaded-${i}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                          />
                          <a
                            href={`data:image/jpeg;base64,${img.imageData}`}
                            download={img.src}
                            style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(16, 200, 191, 0.8)', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 24 24" width="25" fill="black">
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M5 20h14v-2H5v2zM13 4h-2v8H8l4 4 4-4h-3z" />
                            </svg>
                          </a>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {msg.message && <Typography variant="body2">{msg.message}</Typography>}
                  {msg.dateTime && !isNaN(Date.parse(msg.dateTime)) && (
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleLikeClick(msg)}
                          // sx={{ padding: '4px' }} 
                        >
                          {likedMessages.has(msg.id) ? (
                            <FavoriteIcon fontSize="small" sx={{ color: 'red' }} />
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
            {userType === 'admin'  && (tabType === 'news') && (
              <Typography sx={{ fontSize: '0.8rem', color: '#555', p: 2 }}>
                📢 <strong>Disclaimer:</strong> News updates shown here are short summaries based on publicly available content from reputed sources.
                All rights and credits belong to the original publishers. No copyrighted content is reproduced.
                For full details, please refer to the respective news source.
              </Typography>
            )} 
 
            {userType === 'customer' && (tabType === 'buysell') && (
              <Typography sx={{ fontSize: '0.8rem', color: '#555', p: 2 }}>
                📢 <strong>Disclaimer – Buy/Sell Section:</strong> The Buy/Sell section is a community feature to help users post and view items for sale or purchase. Handyman App does not verify the ownership, condition, authenticity, or legality of the items listed. All transactions are strictly between the buyer and the seller.
                <br /><br />
                Users are advised to exercise caution and verify details before making any payments or exchanges. Handyman App is not responsible for any disputes, losses, or damages arising from such transactions.
              </Typography>
            )}

            {userType === 'customer' && (tabType === 'tolet') && (
              <Typography sx={{ fontSize: '0.8rem', color: '#555', p: 2 }}>
                📢 <strong>Disclaimer – To-Let Section:</strong> The To-Let section is intended only as a listing platform for property owners and tenants. Handyman App does not verify the accuracy, legality, availability, or authenticity of rental listings posted by users. We do not act as a broker or agent.
                <br /><br />
                All rental inquiries, agreements, and transactions are solely between the property owner and the interested party. Users are advised to verify property details independently before proceeding. Handyman App is not responsible for any disputes, financial losses, or legal issues arising from such interactions.
              </Typography>
            )}

            {(tabType !== 'news' || isAdmin) ? (
              <>
                <Divider sx={{ my: 2 }} />
                <Box className="chat-input-container">
                  <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}><InsertEmoticonIcon /></IconButton>
                  <TextField placeholder="Type your message..." variant="outlined" size="small" fullWidth value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                  <>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple onChange={handleFileChange} />
                    <IconButton onClick={() => setCameraOpen(true)}><PhotoCamera /></IconButton>
                    <Button sx={{ minWidth: '40px' }} onClick={handleIconClick}><AttachFileIcon /></Button>
                  </>
                  <IconButton color="primary" onClick={handleSend}><Send /></IconButton>
                </Box>

                {showEmojiPicker && (
                  <Box sx={{ position: 'absolute', bottom: '60px', right: '20px' }}>
                    <Picker onEmojiClick={handleEmojiClick} />
                  </Box>
                )}
                 <Dialog open={cameraOpen} onClose={() => setCameraOpen(false)} fullWidth maxWidth="sm">
      <Box p={2}>
        <Typography variant="h6" mb={2}>Take a Photo</Typography>
        <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '8px' }} />
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
          </Box>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
