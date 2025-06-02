import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import IronIcon from '@mui/icons-material/Iron';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import Header from './Header';
import MoreVertIcon from '@mui/icons-material/Dashboard';
import { useParams, useNavigate } from 'react-router-dom';  
import Footer from './Footer';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import HardwareIcon from '@mui/icons-material/Hardware';

const categories = [
    { label: 'Electrical Items',value:'Electrical items', icon: <ElectricalServicesIcon sx={{ fontSize: 40, color: '#1976d2' }} /> },
    { label: 'Electronics Appliances', value:'Electronics appliances',icon: <IronIcon sx={{ fontSize: 40, color: '#f57c00' }} /> },
    { label: 'Plumbing And Sanitary',value: 'Sanitary items',  icon: <PlumbingIcon sx={{ fontSize: 40, color: '#388e3c' }} /> },
    { label: 'Hardware Items',value:'Hardware items', icon: <HardwareIcon sx={{ fontSize: 40, color: '#512da8' }} /> },
  ];

export default function CategoryIcons() {
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
    <div className="offer-banner text-center text-white py-3">
        🎉 <b>Special Inaugural Offers!</b> Enjoy Free Delivery and Installation on all Products. 🛒
      </div>
    <div className="wrapper bg-light d-flex">
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

<div className={`container m-5 ${isMobile ? 'w-100' : 'w-75'}`}>
  <div className="row justify-content-center">
    {categories.map((cat) => (
      <div
        className="col-6 col-sm-3 mb-2"
        key={cat.label}
        onClick={() => handleCategoryClick(cat)} 
      >
        <div
          className="m-2 card text-center border-0 shadow-sm"
          style={{
            height: '120px',
            width: '120px',
            backgroundColor: '#F1B61F30',
            cursor: 'pointer',
          }}
        >
          <div style={{ color: '#1976d2' }}>
            {cat.icon}
          </div>
          <span style={{ fontSize: '12px', fontWeight: '500' }}>{cat.label}</span>
        </div>
      </div>
    ))}
    {error && <div className="text-danger">{error}</div>}
  </div>
</div>
    </div>
    <Button
  type="button"
  className="back-btn"
  onClick={() => navigate(`/profilePage/${userType}/${userId}`)}
>
  Back
</Button>
    <Footer />
    </> 
  );
} 
