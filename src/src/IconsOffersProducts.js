// import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
// import IronIcon from '@mui/icons-material/Iron';
// import PlumbingIcon from '@mui/icons-material/Plumbing';
// import HardwareIcon from '@mui/icons-material/Hardware';
// import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import Header from './Header';
import MoreVertIcon from '@mui/icons-material/Dashboard';
import { useParams, useNavigate } from 'react-router-dom';  
import Footer from './Footer';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Electrical from './img/Electrical.jpeg';
import Electronics from './img/Electronics.jpeg';
import Plumbing from './img/Plumbing.jpeg';
import Hardware from './img/Hardware.jpeg';
import HomeDecor from './img/HomeDecor.jpeg';
// import Beauty from './img/Beauty.jpeg.webp';

// import HomeIcon from '@mui/icons-material/Home';
// import SpaIcon from '@mui/icons-material/Spa';
// import BrushIcon from '@mui/icons-material/Brush';
// import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
// import GestureIcon from '@mui/icons-material/Gesture';
// import FrontHandIcon from '@mui/icons-material/FrontHand';
// import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
// import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
// import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const categories = [
{ label: 'Home Decors', value: 'Home Decors', image: HomeDecor },          
{ label: 'Electrical Items', value: 'Electrical items', image: Electrical }, 
{ label: 'Electronics Appliances', value: 'Electronics appliances', image: Electronics },   
{ label: 'Plumbing & Sanitary', value: 'Sanitary items', image: Plumbing },         
{ label: 'Hardware Items', value: 'Hardware items', image: Hardware },             
// { label: 'Blush & Beauty', value: 'Blush & Beauty', image: Beauty },                            

// { label: 'Home Decors', value: 'Home Decors', icon: <MapsHomeWorkIcon sx={{ fontSize: 30, color: '#fe6f5e' }} /> },          
// { label: 'Electrical Items', value: 'Electrical items', icon: <ElectricalServicesIcon sx={{ fontSize: 40, color: '#00796b' }} /> }, 
// { label: 'Electronics Appliances', value: 'Electronics appliances', icon: <IronIcon sx={{ fontSize: 40, color: '#f57c00' }} /> },   
// { label: 'Plumbing & Sanitary', value: 'Sanitary items', icon: <PlumbingIcon sx={{ fontSize: 40, color: '#388e3c' }} /> },         
// { label: 'Hardware Items', value: 'Hardware items', icon: <HardwareIcon sx={{ fontSize: 40, color: '#512da8' }} /> },             
// { label: 'Blush & Beauty', value: 'Blush & Beauty', icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 40, color: '#d81b60' }} /> },                            
// { label: 'Facial Makeup', value: 'Facial Makeup', icon: <BrushIcon sx={{ fontSize: 40, color: '#e91e63' }} /> },                            
// { label: 'Threading & Face Waxing', value: 'Threading & Face Waxing', icon: <GestureIcon sx={{ fontSize: 40, color: '#ff9800' }} /> },                            
// { label: 'Manicure', value: 'Manicure', icon: <FrontHandIcon sx={{ fontSize: 40, color: '#4caf50' }} /> },                            
// { label: 'Pedicure', value: 'Pedicure', icon: <AirlineSeatLegroomExtraIcon sx={{ fontSize: 40, color: '#3f51b5' }} /> },                            
];

const CategoryIcons = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { selectedUserType } = useParams();
    const {userId} = useParams();
const {userType} = useParams();
const [error, setError] = useState('');
        const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log(products, selectedCategory);
  }, [products, selectedCategory]);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCategoryClick = async (category) => {
        const { value } = category; 
        if (value === 'Blush & Beauty') {
          navigate(`/beautyIcons/${userType}/${userId}`);
          return; 
        }
        try {
          setSelectedCategory(category);
          setProducts([]);
          setError("");
      
          const encodedCategory = encodeURIComponent(value);
          const url = `https://handymanapiv2.azurewebsites.net/api/Product/GetProductsByCategory?Category=${encodedCategory}`;
          const response = await axios.get(url);
          const productsData = response.data;
      
          if (productsData.length === 0) {
            setError("Oops! No products found for this category.");
            console.log("No products found.");
          } else {
            setProducts(productsData);
          }
      
          localStorage.setItem('encodedCategory', encodedCategory);
          navigate(`/offers/${userType}/${userId}`, {
            state: encodedCategory,
          });
      
          console.log('encodedCategory:', encodedCategory);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
          setError(`Oops! No products found for ${value} category.`);
        }
      };
      
      
  return (
    <>
    <Header />
    <div className="offer-banner text-center text-white py-3 mt-mob-50">
        🎉 <b>Special Inaugural Offers!</b> Enjoy Free Delivery and Installation on all Products. 🛒
      </div>
    <div className=" d-flex">
        {!isMobile && (
            <div className="ml-0 p-0 sde_mnu">
                <Sidebar userType={selectedUserType} />
            </div>
        )}
        {isMobile && (
            <div className="floating-menu">
                <Button
                    variant="primary"
                    className="rounded-circle shadow"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <MoreVertIcon />
                </Button>

                {showMenu && (
                    <div className="sidebar-container">
                        <Sidebar userType={selectedUserType} />
                    </div>
                )}
            </div>
        )}

<div className={`container ${isMobile ? 'w-100' : 'w-75'}`}>
  <div className="row row-cols-3 row-cols-md-5 g-4">
    {/* {categories.map((cat) => (
      <div className="col" key={cat.label} onClick={() => handleCategoryClick(cat)}>
        <div
          className="card border-0 shadow-sm"
          style={{
            height: isMobile? '100px' : '120px',
            width: isMobile? '100px' : '120px',
            // backgroundColor: '#F1B61F30',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center'
          }}
        >
          <div style={{ color: '#1976d2', fontSize: '24px' }}>{cat.icon}</div>
          <span style={{ fontSize: '12px', fontWeight: '500' }}>{cat.label}</span>
        </div>
      </div>
    ))} */}
    {categories.map((cat) => (
  <div className="col" key={cat.label} onClick={() => handleCategoryClick(cat)}>
    <div
      className="card border-0 shadow-sm text-center"
      style={{
        height: isMobile ? '100px' : '120px',
        width: isMobile ? '100px' : '120px',
        cursor: 'pointer',
         padding: '10px',
         marginTop: '5px',
      }}
    >
      <img
        src={cat.image}
        alt={cat.label}
        style={{ height: '70px', width: '70px', borderRadius: '8px',  
          // marginTop: '5px', objectFit: 'cover'
         }}
      />
      <span style={{ fontSize: '11px', fontWeight: '600', marginTop: '0px' }}>{cat.label}</span>
    </div>
  </div>
))}
  </div>
  {error && (
  <div className="d-flex flex-row text-danger">
    <span>{error}</span>
  </div>
)}
</div>
    </div>
    <Button
  type="button"
  className="back-btn mt-2"
  onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
>
  Back
</Button>
    <Footer />
    </> 
  );
};
export default CategoryIcons;
