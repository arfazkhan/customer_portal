// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { Customer } from './types/Customer';
import { generateCustomers } from './utils/customerGenerator';
import { usePhotos } from './hooks/usePhotos';
import './App.css';

const INITIAL_LOAD_COUNT = 10;
const ITEMS_PER_LOAD = 20;

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [listHeight, setListHeight] = useState(window.innerHeight);
  const [photos, photosLoading, photosError] = usePhotos(selectedCustomer?.id ?? null);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    // Load initial customers
    setCustomers(generateCustomers(INITIAL_LOAD_COUNT));
  }, []);

  const loadMoreItems = useCallback((startIndex: number, stopIndex: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newCustomers = generateCustomers(ITEMS_PER_LOAD);
        setCustomers(prev => [...prev, ...newCustomers]);
        if (customers.length + newCustomers.length >= 1000) {
          setHasNextPage(false);
        }
        resolve();
      }, 1000); // Simulate API delay
    });
  }, [customers.length]);

  useEffect(() => {
    const handleResize = () => setListHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
  }, []);

  const isItemLoaded = useCallback((index: number) => index < customers.length, [customers.length]);

  return (
    <div className="App">
      <div className="customer-list-container">
        <CustomerList 
          customers={customers} 
          onSelectCustomer={handleSelectCustomer} 
          selectedCustomerId={selectedCustomer?.id}
          height={listHeight}
          isItemLoaded={isItemLoaded}
          loadMoreItems={loadMoreItems}
          hasNextPage={hasNextPage}
          itemCount={hasNextPage ? customers.length + 1 : customers.length}
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