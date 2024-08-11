// src/components/CustomerDetails.tsx
import React from 'react';
import PhotoGrid from './PhotoGrid';
import './CustomerDetails.css';
import { Customer } from '../types/Customer';

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
      <PhotoGrid photos={photos} loading={loading} error={error} />
    </div>
  );
};

export default CustomerDetails;