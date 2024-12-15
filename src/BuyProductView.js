import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RouteIcon from '@mui/icons-material/Route';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import Image1 from './img/builder_reg.jpeg';
import Image2 from './img/customer_reg.jpeg';
import Image3 from './img/estimtr_reg.jpeg';


const BuyProduct = () => {
  return (
   
    <div class="wrapper">
        <div class="container-fluid mt_50px h-100 d-flex flex-row justify-content-start">
            <div class="d-flex py-3 gap-3">
            <div className="m-0 p-0 sde_mnu">
            <div className="_mnu_dv">
              <span><DashboardIcon /> Dashboard</span>
            </div>
            <div className="_mnu_dv">
              <span><SupportAgentIcon /> Raise Ticket</span>
            </div>
            <div className="_mnu_dv">
              <span><PersonAddIcon /> Add Member</span>
            </div>
            <div className="_mnu_dv">
              <span><RouteIcon /> Track Ticket Status</span>
            </div>
            <div className="_mnu_dv">
              <span><NotificationsIcon /> Notifications</span>
            </div>
            <div className="_mnu_dv">
              <span><PaymentsIcon /> Buy Products</span>
            </div>
            <div className="_mnu_dv">
              <span><InventoryIcon /> Orders</span>
            </div>
            <div className="_mnu_dv">
              <span><ShoppingCartIcon /> Cart</span>
            </div>
            <div className="_mnu_dv">
              <span><AccountCircle /> My Accounts</span>
            </div>
          </div>
                <div class="main_vw">
                    <div class="h3">Products</div>
                        <div class="row bg-white p-3">
                            <div class="col-md-6">
                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div className="discount">
                                -10%
                              </div>
                                        <div class="carousel-indicators">
                                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div class="carousel-inner">
                                          <div class="carousel-item active">
                                            <img src={Image1} class="image-fixed" alt="Slide 1" />
                                          </div>
                                          <div class="carousel-item">
                                            <img src={Image2} class="image-fixed" alt="Slide 2" />
                                          </div>
                                          <div class="carousel-item">
                                            <img src={Image3} class="image-fixed" alt="Slide 3" />
                                          </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                          <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                          <span class="visually-hidden">Next</span>
                                        </button>
                                      </div>
                                    {/* Details */}
                                    <div class="row my-3 bg-white">
                                        <div class="col-md-12 bg-white">
                                            <div class="row list_item rounded-3 lh-lg border-bottom-0 border border-gray text-start">
                                                <p class="col-md-6 border-end border-gray py-1 font-light-color">Product Catalogue</p>
                                            </div>
                                            <div class="row list_item rounded-3 lh-lg border-bottom-0 border border-gray text-start">
                                                <p class="col-md-6 border-end border-gray py-1 font-light-color">Choose Color</p>
                                            </div>
                                            <div class="row list_item rounded-3 lh-lg border-bottom-0 border border-gray text-start">
                                                <p class="col-md-6 border-end border-gray py-1 font-light-color">Rate</p>
                                            </div>
                                            <div class="row list_item rounded-3 lh-lg border-bottom-0 border border-gray text-start">
                                                <p class="col-md-6 border-end border-gray py-1 font-light-color">Discount</p> 
                                            </div>
                                            <div class="row list_item rounded-3 lh-lg border border-gray text-start">
                                                <p class="col-md-6 border-end border-gray py-1 font-light-color">After Discount Price</p> 
                                            </div>
                                        </div>
                                       </div>
                               </div>
                               <div class="col-md-6">
                                    <div class="productspec">
                                        <h5 class="fs-sm">Specifications</h5>
                                        <ul class="list-group">
                                            <li class="list-group-item"><span class="w-50 d-inline-block">Power</span></li>
                                            <li class="list-group-item"><span class="w-50 d-inline-block">Cooling Power</span></li>
                                            <li class="list-group-item"><span class="w-50 d-inline-block">Watts</span></li>
                                            <li class="list-group-item"><span class="w-50 d-inline-block">Tons</span></li>
                                            <li class="list-group-item"><span class="w-50 d-inline-block">BTU per hour</span></li>
                                            <li class="list-group-item"><span class="w-50 d-inline-block">Maximum Capacity</span></li>
                                          </ul>
                                        </div>
                                        <br />
                                        <div class="warranty">
                                          <h5 class="fs-sm">Warranty</h5>
                                          <ul class="list-group">
                                              <li class="list-group-item"><span class="w-50 d-inline-block">Warranty</span></li>
                                            </ul>
                                        </div>
                                    <br />
                                    <div class="additional_info">
                                        <h5 class="fs-sm">Additional Info</h5>
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                            </li>
                                        </ul>
                                    </div>


                                    <div class="py-3 text-end">
                                        <button className="btn btn-warning">&#8592; Back</button>
                                    </div>
                               </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BuyProduct;
