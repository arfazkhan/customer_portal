// src/components/CustomerDetails.tsx
import React from 'react';
import PhotoGrid from './PhotoGrid';
import { Customer } from '../types/Customer';
import './CustomerDetails.css';

interface Props {
  customer: Customer;
  photos: string[];
  loading: boolean;
  error: string | null;
}

const CustomerDetails: React.FC<Props> = ({ customer, photos, loading, error }) => {
  return (
    <div className="customer-details">
      <h2>{customer.name}</h2>
      <p>Title: {customer.title}</p>
      <p>Address: {customer.address}</p>
      {error && <p className="error">{error}</p>}
      <PhotoGrid photos={photos} loading={loading} />
    </div>
  );
};

export default CustomerDetails;