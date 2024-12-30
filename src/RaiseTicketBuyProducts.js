import React, { useState, useEffect} from "react";
import "./App.css";
import AdminSidebar from './AdminSidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dashboard as MoreVertIcon,} from '@mui/icons-material';
import { Button } from 'react-bootstrap'; // Import Bootstrap components for modal
import { useParams } from "react-router-dom";

const BuyProduct = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const { raiseTicketId } = useParams();
  const [assignedTo, setAssignedTo] = useState('');
  const [category, setCategory] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState('')
  const [fixedDelivery, setFixedDelivery] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [fixedServiceCharge, setFixedServiceCharge] = useState('');
  const [discount, setDiscount] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [cgst, setCGST] = useState('');
  const [fixedCGST, setFixedCGST] = useState('');
  const [sgst, setSGST] = useState('');
  const [fixedSGST, setFixedSGST] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [ticketData, setTicketData] = useState({
    raiseTicketId: '',
    subject: '',
    materials: []
  });
  const [specifications, setSpecifications] = useState([{ material: "", quantity: "", rate: "", total: "" }]);
  const [rateQuotedBy, setRateQuotedBy] = useState("");
  // const [state, setState] = useState('');
  // const [district, setDistrict] = useState('')
  const [id, setId] = useState('');
  // const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  // const [zipCode,setzipCode]=useState('');
  const [customerId] = useState('');
  const [subject, setSubject] = useState('');
  //const [id, setId] = useState(""); 
  // Generate ticket ID in the format VSKPAKP002
  // const ticketIdPrefix = "VSKPAKP";
  // const ticketIdSuffix = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  // const ticketId = `${ticketIdPrefix}${ticketIdSuffix}`;
  
  useEffect(() =>  {
    console.log(loading, subject);
  }, [loading, subject]);

 useEffect(() => {
    const fetchticketData = async () => {
      try {
        const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/GetTicket/${raiseTicketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        const data = await response.json();
        console.log("No data Found");
        console.log(data.id);
        console.log(data.subject);
        alert(data.id);

        setTicketData(data);
        setSubject(data.subject);
        setId(data.id);
        setSpecifications(data.materials || [{ material: "", quantity: "" }]);
        alert(JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchticketData();
  }, [raiseTicketId]);


const handleSaveTicket = async (e) => {
  e.preventDefault();
  
  const payload = {
    RaiseTicketId: ticketData.raiseTicketId,
    date: new Date().toISOString(),
    // address: address,
    subject: ticketData.subject,
    details: ticketData.details,
    category: ticketData.category,
    assignedTo,
    id : id,
    // status: ticketData.status,
    // InternalStatus: "Assigned",
    // TicketOwner: ticketData.customerId,
    CustomerId: customerId,
    // state: state,
    // isMaterialType: isMaterialType,
    // district: district,
    // ZipCode: zipCode,
    // RequestType: requestType,
    // attachments:attachments || [],
    materials: specifications.map((spec) => ({
        material: spec.material,
        quantity: spec.quantity,
    })),
    // comments: commentsList.map((comment) => ({
    //     updatedDate: comment.updatedDate,
    //     commentText: comment.commentText,
    // })),
  };
  try {
    
    const response = await fetch(`https://handymanapiv2.azurewebsites.net/api/RaiseTicket/${raiseTicketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error('Failed to save ticket data');
    }
    alert('Ticket saved Successfully!');
  } catch (error) {
    console.error('Error saving ticket data:', error);
    window.alert('Failed to save the ticket data. Please try again later.')
  }
};


  // Detect screen size for responsiveness
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);
 

// Handle material input change
const handleMaterialChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = field === "quantity" || field === "rate" ? parseFloat(value) : value;
  
    if (field === "quantity" || field === "rate") {
      const quantity = parseFloat(updatedSpecifications[index].quantity);
      const rate = parseFloat(updatedSpecifications[index].rate);
      updatedSpecifications[index].total = quantity * rate;
    }
  
    setSpecifications(updatedSpecifications);
  };

  const calculateGrandTotal = () => specifications.reduce((sum, spec) => sum + spec.total, 0);

const calculateTotalAmount = (grandTotalAmount, discountPercentage, deliveryCharges, serviceChargePercentage, cgstPercentage, sgstPercentage) => {
    const discountAmount = grandTotalAmount * (discountPercentage / 100);
    const priceAfterDiscount = grandTotalAmount - discountAmount;
    const priceAfterDelivery = priceAfterDiscount + parseFloat(deliveryCharges || 0);
    const serviceCharge = priceAfterDelivery * (serviceChargePercentage / 100);
    const priceAfterServiceCharge = priceAfterDelivery + serviceCharge;
    const cgst = priceAfterServiceCharge * (cgstPercentage / 100);
    const sgst = priceAfterServiceCharge * (sgstPercentage / 100);
    const total = priceAfterServiceCharge + cgst + sgst;
    return { total, discountAmount, serviceCharge, cgst, sgst };
};

const handleFixedChange = (setter, fixedSetter, grandTotalAmount) => (e) => {
    const value = parseFloat(e.target.value) || 0;
    setter(value);

    const updatedGrandTotal = parseFloat(grandTotalAmount) || 0;
    const updatedDiscount = parseFloat(discount) || 0;
    const updatedDeliveryCharges = parseFloat(deliveryCharges) || 0;
    const updatedServiceCharge = parseFloat(serviceCharge) || 0;
    const updatedCGST = parseFloat(cgst) || 0;
    const updatedSGST = parseFloat(sgst) || 0;

    const { total, discountAmount, serviceCharge: calculatedServiceCharge, cgst: calculatedCGST, sgst: calculatedSGST } = calculateTotalAmount(
        updatedGrandTotal,
        updatedDiscount,
        updatedDeliveryCharges,
        updatedServiceCharge,
        updatedCGST,
        updatedSGST
    );

    if (setter === setDiscount) fixedSetter(discountAmount.toFixed(2));
    else if (setter === setDeliveryCharges) fixedSetter(updatedDeliveryCharges.toFixed(2));
    else if (setter === setServiceCharge) fixedSetter(calculatedServiceCharge.toFixed(2));
    else if (setter === setCGST) fixedSetter(calculatedCGST.toFixed(2));
    else if (setter === setSGST) fixedSetter(calculatedSGST.toFixed(2));

    setTotalAmount(total.toFixed(2));
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setTicketData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  return (
    <div className="d-flex flex-row justify-content-start align-items-start">
      {/* Sidebar menu for Larger Screens */}
      {!isMobile && (
        <div className=" ml-0 m-4 p-0 adm_mnu">
          <AdminSidebar />
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
                <AdminSidebar />
              </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={`container m-1 ${isMobile ? 'w-100' : 'w-75'}`}>
      <h3 className="mb-4">Raise Ticket Buy Products</h3>
        <div className="bg-white rounded-3 p-4 bx_sdw w-75">
          <form className="form" onSubmit={handleSaveTicket}>
            <div className="form-group">
              <label>Ticket ID <span className="req_star">*</span></label>
              <input
              type="text"
              name="customerId"
              value={ticketData.raiseTicketId}
              className="form-control"
              onChange={handleChange}
              placeholder="Ticket Number"
              required/>
            </div>
            <div className="form-group">
              <label>Subject<span className="req_star">*</span></label>
              <input 
                  type="text"
                  name="subject"
                  value={ticketData.subject}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required  
              />
            </div>
            <div className="form-group">
              <label>
                Category <span className="req_star">*</span>
              </label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                <option>Electrical items</option>
                <option>Plumbing Materials</option>
                <option>Sanitary items</option>
                <option>Electronics appliances</option>
                <option>Paints</option>
                <option>Hardware items</option>
                <option>Civil & Waterproofing Materials</option>
              </select>
            </div>
             <div className="form-group">
              <label>Rate Quoted By<span className="req_star">*</span></label>
              <div className="radio">
                <label className="m-1">
                  <input className="form-check-input m-2"
                  type="radio"
                  name="RateQuotedBy"
                  value="Customer Care"
                  checked={rateQuotedBy === "Customer Care"}
                  onChange={(e) => setRateQuotedBy(e.target.value)}
                  required
                />
                Customer Care
                </label>
                <label className="m-1">
                  <input
                  className="form-check-input m-2"
                  type="radio"
                  name="RateQuotedBy"
                  value="Dealer/Agency"
                  checked={rateQuotedBy === "Dealer/Agency"}
                  onChange={(e) => setRateQuotedBy(e.target.value)}
                  required
                  />
                  Dealer/Agency
                </label>
              </div>
            </div> 

      {/* Material Input Fields */}
        <div className="form-group">
          <label>Required Material</label>
          {specifications.map((spec, index) => (
            <div className="d-flex gap-3 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={spec.material}
                placeholder="Enter Material"
                onChange={(e) => handleMaterialChange(index, "material", e.target.value)}
                
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Quantity"
                value={spec.quantity}
               onChange={(e) => handleMaterialChange(index,"quantity", e.target.value)}
                
              />
              <input
                type="number"
                className="form-control"
                placeholder="Enter Rate"
                value={spec.rate}
                onChange={(e) => handleMaterialChange(index,"rate", e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Total"
                value={spec.total}
                readOnly
              />
              {/* <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveMaterial(index)}
              >
                Remove
              </button> */}
            </div>
          ))}
    </div>

  <table className="table table-bordered">
  <tbody>
    {/* Quote Amount */}
    <tr>
      <td>
      <label className="mb-0 fw-bold">Total</label>
      </td>
      <td colspan="4">
      <input
        type="number"
        className="form-control text-end"
        value={calculateGrandTotal()}
        readOnly
      />
      </td>
    </tr>
    <tr>
    <td>
        <label>Discount</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={discount}
          onChange={handleFixedChange(setDiscount, setFixedDiscount)}
          placeholder="Enter Discount"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedDiscount}
          disabled
          placeholder="Fixed Discount"
        />
      </td>
    </tr>

    {/* Discount */}
    <tr>
    <td>
        <label htmlFor="deliveryCharges">Delivery Charges</label>
      </td>
      <td colSpan="2">
        <input
            type="number"
            className="form-control"
            value={deliveryCharges}
            onChange={handleFixedChange(setDeliveryCharges, setFixedDelivery)}
            placeholder="Enter Delivery Charges"
        />
      </td>
        <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedDelivery}
          disabled
          placeholder="Fixed Delivery Amount"
        />
      </td>
    </tr>

    {/* Service Charges */}
    <tr>
      <td>
        <label>Service Charges</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={serviceCharge}
          onChange={handleFixedChange(setServiceCharge, setFixedServiceCharge)}
          placeholder="Enter Service Charges"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedServiceCharge}
          disabled
          placeholder="Fixed Service Charges"
        />
      </td>
    </tr>

    {/* CGST */}
    <tr>
      <td>
        <label>SGST</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={sgst}
          onChange={handleFixedChange(setSGST, setFixedSGST)}
          placeholder="Enter SGST"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedSGST}
          disabled
          placeholder="Fixed SGST"
        />
      </td>
    </tr>

    {/* CGST */}
    <tr>
      <td>
        <label>CGST</label>
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={cgst}
          onChange={handleFixedChange(setCGST, setFixedCGST)}
          placeholder="Enter SGST"
        />
      </td>
      <td colSpan="2">
        <input
          type="number"
          className="form-control"
          value={fixedCGST}
          disabled
          placeholder="Fixed CGST"
        />
      </td>
    </tr>

    {/* Total Amount */}
        <tr>
        <td>
            <label>Grand Total</label>
        </td>
        <td colspan="4">
            <input
            type="number"
            className="form-control text-end"
            value={totalAmount}
            readOnly
            placeholder="Grand Total"
            />
        </td>
        </tr>
        </tbody>
        </table>
        {/* Assigned To */}
        <div className="form-group">
              <label>AssignedTo<span className="req_star">*</span></label>
              <select
              className="form-control"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option>Choose AssignedTo</option>
                <option>Customer</option>
                <option>Dealer/Agency</option>
              </select>
            </div>
    
    {/* Send Quote Button */}
            <div className="mt-4">
                <button
                type="button"
                className={`btn btn-primary w-50 mt-3 ${rateQuotedBy === "Dealer/Agency" ? "btn-success" : "btn-primary"}`}
                // onClick={handleSaveTicket}
                >
                {rateQuotedBy === "Customer Care" ? "Send Quote" : "Get Quotation"}
                </button>
            </div>
          </form>
        </div>
      </div>
      {/* Styles for floating menu */}
<style jsx>{`
        .floating-menu {
          position: fixed;
          top: 80px; /* Increased from 20px to avoid overlapping with the logo */
          left: 20px; /* Adjusted for placement on the left side */
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default BuyProduct;