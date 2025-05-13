import React, { useState, useEffect } from 'react';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import PestControlIcon from '@mui/icons-material/PestControl';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Header from './Header';
import Footer from './Footer';
import { Dashboard as MoreVertIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { Button} from 'react-bootstrap';
import {  useNavigate, useParams } from 'react-router-dom';
const AboutApartmentRaiseTicket = () => {
    const Navigate = useNavigate();
  const {userType} = useParams();
   const {userId} = useParams();
  const {selectedUserType} = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
    // Detect screen size for responsiveness
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      handleResize(); 
      window.addEventListener('resize', handleResize);
    
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <>
    <Header />
    <div className="mt-2 offer-banner text-center text-white py-2">
         <b>Apartment Common Area Monthly Maintenance Plan</b>
      </div>
       <p className="mb-0 text-center fw-bold">
        Say Goodbye to Delays and Hassles! Our Monthly Maintenance Package Ensures Your Community Stays Clean, Functional, and Pest-Free – All in one Plan!
      </p>

      <div className="d-flex flex-row justify-content-start align-items-start">
       {/* Sidebar for larger screens */}
       {!isMobile && (
        <div className=" ml-0 m-4 p-0 sde_mnu">
          <Sidebar userType={selectedUserType} />
        </div>
      )}

      {/* Floating menu for mobile */}
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

      {/* Main Content */}
      <div className={`apartment container ${isMobile ? 'w-100' : 'w-75'}`}>
      <div className="space-y-6">
        <div>
          <h4 className="flex items-center text-lg font-semibold text-blue-600">
            <ElectricalServicesIcon className="w-5 h-5 mr-2" /> Electrical Maintenance
          </h4>
          <ul className="list-disc ml-7 text-gray-700">
            <li>Corridor & staircase lights, meter panel inspections</li>
            <li>Bulb/switch replacement</li>
          </ul>
        </div> 

        <div>
          <h4 className="flex items-center text-lg font-semibold text-blue-600">
            <PlumbingIcon className="w-5 h-5 mr-2" /> Plumbing Maintenance
          </h4>
          <ul className="list-disc ml-7 text-gray-700">
            <li>Leak repairs in tanks & pipes</li>
            <li>Drain blockages cleared, motors checked</li>
          </ul>
        </div>

        <div>
          <h4 className="flex items-center text-lg font-semibold text-blue-600">
            <WaterDropIcon className="w-5 h-5 mr-2" /> Water Seepage Control
          </h4>
          <ul className="list-disc ml-7 text-gray-700">
            <li>Damp wall inspections & minor waterproofing</li>
          </ul>
        </div>

        <div>
          <h4 className="flex items-center text-lg font-semibold text-blue-600">
            <PestControlIcon className="w-5 h-5 mr-2" /> Pest Control – 1 Spray
          </h4>
          <ul className="list-disc ml-7 text-gray-700">
            <li>Anti-cockroach & ant spray in all common areas</li>
            <li>Odorless, safe chemical used</li>
          </ul>
        </div>

        <div>
          <h4 className="flex items-center text-lg font-semibold text-blue-600">
            <CleaningServicesIcon className="w-5 h-5 mr-2" /> Tank Cleaning – 1 Time
          </h4>
          <ul className="list-disc ml-7 text-gray-700">
            <li>Overhead & Sump tanks scrubbed and disinfected</li>
          </ul>
        </div>
      </div>

      <div className="p-2 bg-blue-50 rounded-lg">
      <p className="">💡 Materials charged extra if required</p>
        <p className="">💰 Just ₹200 per flat per month</p>
        <p className="">📥 Collected via Association</p>
        <p className="">🧑‍🔧 Includes Technician Visits & Labor</p>
      </div>

     <div className="text-center p-2 w-full" style={{ position: 'sticky', bottom: 0, background: '#fff', zIndex: 10 }}>
  <button className="btn btn-success text-white btn-sm w-full max-w-xs mx-auto"
          onClick={() => Navigate(`/apartmentRaiseTicket/${userType}/${userId}`)}>
    📱 Raise Complaints
  </button>
</div>


    </div>
    </div>
<Footer />
</>
  )
};

export default AboutApartmentRaiseTicket
