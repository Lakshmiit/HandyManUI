import React from 'react';
import Header from './Header';
import Footer from './Footer';
import UploadForm from './uploadform';

const UploadProductPage = () => {
  return (
    <div>
      <Header />
      <main className="container py-3 mt_100px" role="main">
        <div className="row mt-4">
          <div className="col">
            <UploadForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadProductPage;
