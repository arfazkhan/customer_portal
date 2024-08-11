// src/components/CustomerList.tsx
import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import CustomerCard from './CustomerCard';
import { Customer } from '../types/Customer';

interface Props {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId: number | undefined;
  height: number;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
  hasNextPage: boolean;
  itemCount: number;
}

const CustomerList: React.FC<Props> = ({
  customers,
  onSelectCustomer,
  selectedCustomerId,
  height,
  isItemLoaded,
  loadMoreItems,
  hasNextPage,
  itemCount
}) => {
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading...</div>;
    }
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
  }, [customers, onSelectCustomer, selectedCustomerId, isItemLoaded]);

  return (
    <div style={{ flex: 1 }}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        threshold={10} // Start loading more items when user is 10 items away from the end
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={height}
            itemCount={itemCount}
            itemSize={100} // Adjust based on your CustomerCard height
            onItemsRendered={onItemsRendered}
            ref={ref}
            width="100%"
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default React.memo(CustomerList);