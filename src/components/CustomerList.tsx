// src/components/CustomerList.tsx
import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import CustomerCard from './CustomerCard';
import { Customer } from '../types/Customer';

interface Props {
  customers: Customer[];
  onSelectCustomer: (customerId: number) => void;
  selectedCustomerId: number | null;
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
          onClick={() => onSelectCustomer(customer.id)}
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
        threshold={10}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={height}
            itemCount={itemCount}
            itemSize={100}
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