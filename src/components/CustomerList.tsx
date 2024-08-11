// src/components/CustomerList.tsx
import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import CustomerCard from './CustomerCard';
import { Customer } from '../types/Customer';

interface Props {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId: number | undefined;
  height: number;
}

const CustomerList: React.FC<Props> = ({ customers, onSelectCustomer, selectedCustomerId, height }) => {
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const customer = customers[index];
    return (
      <div style={style}>
        <CustomerCard 
          customer={customer}
          isSelected={customer.id === selectedCustomerId}
          onClick={() => onSelectCustomer(customer)}
        />
      </div>
    );
  }, [customers, onSelectCustomer, selectedCustomerId]);

  return (
    <List
      height={height}
      itemCount={customers.length}
      itemSize={100} // Adjust based on your CustomerCard height
      width="100%"
    >
      {Row}
    </List>
  );
};

export default React.memo(CustomerList);