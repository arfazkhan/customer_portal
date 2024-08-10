// src/App.tsx
import React, { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import './App.css';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface CustomerPhotos {
  [customerId: number]: string[];
}

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerPhotos, setCustomerPhotos] = useState<CustomerPhotos>({});
  const [loading, setLoading] = useState<boolean>(true);

  const customers: Customer[] = [
    { id: 1, name: "John Doe", title: "CEO", address: "123 Main St" },
    { id: 2, name: "Jane Smith", title: "CTO", address: "456 Elm St" },
    // Add more customers here
  ];

  const fetchPhotosForCustomer = async (customerId: number) => {
    const newPhotos: string[] = [];
    for (let i = 0; i < 9; i++) {
      const response = await fetch(`https://picsum.photos/1080/1080?random=${customerId}-${i}-${Date.now()}`);
      newPhotos.push(response.url);
    }
    return newPhotos;
  };

  const handleSelectCustomer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    if (!customerPhotos[customer.id]) {
      const photos = await fetchPhotosForCustomer(customer.id);
      setCustomerPhotos(prev => ({ ...prev, [customer.id]: photos }));
    }
  };
 useEffect(() => {
    const updatePhotos = async () => {
      setLoading(true);
      const newPhotos: CustomerPhotos = {};
      for (const customer of customers) {
        newPhotos[customer.id] = await fetchPhotosForCustomer(customer.id);
      }
      setCustomerPhotos(newPhotos);
      setLoading(false);
    };

    updatePhotos();
    const interval = setInterval(updatePhotos, 10000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (selectedCustomer) {
      const interval = setInterval(async () => {
        const photos = await fetchPhotosForCustomer(selectedCustomer.id);
        setCustomerPhotos(prev => ({ ...prev, [selectedCustomer.id]: photos }));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [selectedCustomer]);

  return (
    <div className="App">
      <div className="customer-list-container">
        <CustomerList 
          customers={customers} 
          onSelectCustomer={handleSelectCustomer} 
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