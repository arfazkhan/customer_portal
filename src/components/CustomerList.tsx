// src/components/CustomerList.tsx
import React from 'react';
import CustomerCard from './CustomerCard';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface Props {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId: number | undefined;
}

const CustomerList: React.FC<Props> = ({ customers, onSelectCustomer, selectedCustomerId }) => {
  return (
    <div className="customer-list">
      {customers.map(customer => (
        <CustomerCard 
          key={customer.id}
          customer={customer}
          isSelected={customer.id === selectedCustomerId}
          onClick={() => onSelectCustomer(customer)}
        />
      ))}
    </div>
  );
};

export default CustomerList;