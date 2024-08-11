// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { RootState, AppDispatch } from './store';
import { fetchInitialCustomers, fetchMoreCustomers, selectCustomer, clearError } from './store/customerSlice';
import { usePhotos } from './hooks/usePhotos';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, selectedCustomerId, loading, hasNextPage, error } = useSelector((state: RootState) => state.customers);
  const [listHeight, setListHeight] = useState(window.innerHeight);
  const [photos, photosLoading, photosError] = usePhotos(selectedCustomerId);

  useEffect(() => {
    dispatch(fetchInitialCustomers());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setListHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadMoreItems = async (startIndex: number, stopIndex: number): Promise<void> => {
    await dispatch(fetchMoreCustomers()).unwrap();
  };

  const isItemLoaded = (index: number) => index < customers.length;

  const handleSelectCustomer = (customerId: number) => {
    dispatch(selectCustomer(customerId));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <div className="App">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={handleClearError}>Dismiss</button>
        </div>
      )}
      <div className="customer-list-container">
        <CustomerList 
          customers={customers} 
          onSelectCustomer={handleSelectCustomer} 
          selectedCustomerId={selectedCustomerId}
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