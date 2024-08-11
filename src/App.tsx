// src/App.tsx
import React, { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { Customer, generateCustomers } from './utils/customerGenerator';
import './App.css';

interface CustomerPhotos {
  [customerId: number]: string[];
}

const usePhotos = (customerId: number | null): [string[], boolean, string | null] => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customerId) {
      const fetchPhotos = async () => {
        try {
          const photoPromises = Array.from({ length: 9 }, (_, i) => 
            fetch(`https://picsum.photos/1080/1080?random=${customerId}-${i}-${Date.now()}`)
              .then(response => response.url)
          );
          const newPhotos = await Promise.all(photoPromises);
          setPhotos(newPhotos);
        } catch (error) {
          console.error("Failed to fetch photos", error);
          setError("Failed to fetch photos. Please try again.");
          setPhotos([]);
        } finally {
          setLoading(false);
        }
      };
      fetchPhotos();
      const interval = setInterval(fetchPhotos, 10000);
      return () => clearInterval(interval);
    }
  }, [customerId]);

  return [photos, loading, error];
};

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [photos, photosLoading, photosError] = usePhotos(selectedCustomer?.id ?? null);

  useEffect(() => {
    if (customers.length === 0) {
      setCustomers(generateCustomers(20));
    }
  }, [customers]);

  return (
    <div className="App">
      <div className="customer-list-container">
        <CustomerList 
          customers={customers} 
          onSelectCustomer={setSelectedCustomer} 
          selectedCustomerId={selectedCustomer?.id}
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