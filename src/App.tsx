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
  const customersRef = useRef<Customer[]>([]);
  if (customersRef.current.length === 0) {
    customersRef.current = generateCustomers(20);
  }

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerPhotos, setCustomerPhotos] = useState<CustomerPhotos>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPhotosForCustomer = async (customerId: number) => {
    const photoPromises = Array.from({ length: 9 }, (_, i) => 
      fetch(`https://picsum.photos/1080/1080?random=${customerId}-${i}-${Date.now()}`)
        .then(response => response.url)
    );
    return Promise.all(photoPromises);
  };
  

  useEffect(() => {
    if (selectedCustomer) {
      const updatePhotos = async () => {
        setLoading(true);
        const newPhotos = await fetchPhotosForCustomer(selectedCustomer.id);
        setCustomerPhotos(prev => ({
          ...prev,
          [selectedCustomer.id]: newPhotos
        }));
        setLoading(false);
      };
  
      updatePhotos();
      const interval = setInterval(updatePhotos, 10000);
      return () => clearInterval(interval);
    }
  }, [selectedCustomer]); 
  

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