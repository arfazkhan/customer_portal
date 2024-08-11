// src/components/CustomerCard.tsx
import React from 'react';
import './CustomerList.css';
interface Customer {
  id: number;
  name: string;
  title: string;
}

interface Props {
  customer: Customer;
  isSelected: boolean;
  onClick: () => void;
}

const CustomerCard: React.FC<Props> = ({ customer, isSelected, onClick }) => {
  return (
    <div 
      className={`customer-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{customer.name}</h3>
      <p>{customer.title}</p>
    </div>
  );
};

export default React.memo(CustomerCard);
