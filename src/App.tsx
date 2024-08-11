// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { Customer } from './types/Customer';
import { generateCustomers } from './utils/customerGenerator';
import { usePhotos } from './hooks/usePhotos';
import './App.css';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [listHeight, setListHeight] = useState(window.innerHeight - 40);
  const [photos, photosLoading, photosError] = usePhotos(selectedCustomer?.id ?? null);

  useEffect(() => {
    if (customers.length === 0) {
      setCustomers(generateCustomers(1000));
    }
  }, [customers]);

  useEffect(() => {
    const handleResize = () => setListHeight(window.innerHeight - 40);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
  }, []);

  return (
    <div className="App">
      <div className="customer-list-container">
        <CustomerList 
          customers={customers} 
          onSelectCustomer={handleSelectCustomer} 
          selectedCustomerId={selectedCustomer?.id}
          height={listHeight}
        />
      </div>
      <div className="customer-details-container">
        {selectedCustomer && (
          <CustomerDetails 
            customer={selectedCustomer} 
            photos={photos}
            loading={photosLoading}
            error={photosError}
          />
        )}
      </div>
    </div>
  );
};

export default App;