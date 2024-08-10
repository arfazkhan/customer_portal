// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { Customer, generateCustomers } from './utils/customerGenerator';
import './App.css';

interface CustomerPhotos {
  [customerId: number]: string[];
}

const App: React.FC = () => {
  // Use useRef to store the customer list so it doesn't change on re-renders
  const customersRef = useRef<Customer[]>([]);
  if (customersRef.current.length === 0) {
    customersRef.current = generateCustomers(20);
  }

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerPhotos, setCustomerPhotos] = useState<CustomerPhotos>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPhotosForCustomer = async (customerId: number) => {
    const newPhotos: string[] = [];
    for (let i = 0; i < 9; i++) {
      const response = await fetch(`https://picsum.photos/1080/1080?random=${customerId}-${i}-${Date.now()}`);
      newPhotos.push(response.url);
    }
    return newPhotos;
  };

  useEffect(() => {
    const updatePhotos = async () => {
      setLoading(true);
      const newPhotos: CustomerPhotos = {};
      for (const customer of customersRef.current) {
        newPhotos[customer.id] = await fetchPhotosForCustomer(customer.id);
      }
      setCustomerPhotos(newPhotos);
      setLoading(false);
    };

    updatePhotos();
    const interval = setInterval(updatePhotos, 10000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array

  return (
    <div className="App">
      <div className="customer-list-container">
        <CustomerList 
          customers={customersRef.current} 
          onSelectCustomer={setSelectedCustomer} 
          selectedCustomerId={selectedCustomer?.id}
        />
      </div>
      <div className="customer-details-container">
        {selectedCustomer && (
          <CustomerDetails 
            customer={selectedCustomer} 
            photos={customerPhotos[selectedCustomer.id] || []}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default App;