// src/components/CustomerDetails.tsx
import React from 'react';
import PhotoGrid from './PhotoGrid';
import './CustomerDetails.css';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface Props {
  customer: Customer;
  photos: string[];
}

const CustomerDetails: React.FC<Props> = ({ customer, photos }) => {
  return (
    <div className="customer-details">
      <h2>{customer.name}</h2>
      <p>Title: {customer.title}</p>
      <p>Address: {customer.address}</p>
      <PhotoGrid photos={photos} />
    </div>
  );
};

export default CustomerDetails;