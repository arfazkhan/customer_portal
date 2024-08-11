
# Customer Details Portal

A single-page React application that displays a customer details portal with efficient loading and rendering of large datasets.

## Features

- Display a list of customers with infinite scrolling
- Show detailed customer information and photos
- Optimized performance for handling up to 1000 customer entries
- Responsive design
- State management using Redux
- Error handling and display
- Dynamic photo loading with periodic updates

## Technologies Used

- React 17+
- TypeScript
- Redux Toolkit for state management
- React Window for virtualized list rendering
- React Window Infinite Loader for infinite scrolling
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/customer-details-portal.git
   ```

2. Navigate to the project directory:
   ```
   cd customer-details-portal
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
src/
├── components/
│   ├── CustomerCard.tsx
│   ├── CustomerDetails.tsx
│   ├── CustomerList.tsx
│   └── PhotoGrid.tsx
├── hooks/
│   └── usePhotos.ts
├── store/
│   ├── index.ts
│   └── customerSlice.ts
├── types/
│   └── Customer.ts
├── utils/
│   └── customerGenerator.ts
├── App.tsx
├── App.css
└── index.tsx
```

## Key Components

- `App`: The main component that orchestrates the application
- `CustomerList`: Renders the list of customers using virtualization
- `CustomerDetails`: Displays detailed information about a selected customer
- `PhotoGrid`: Shows a grid of photos for the selected customer
- `customerSlice`: Redux slice for managing customer data and state

## Optimizations

- Virtual scrolling for efficient rendering of large lists
- Infinite scrolling to load customers as needed
- Memoization of components to prevent unnecessary re-renders
- Centralized state management with Redux
- Error handling and user feedback
- Responsive design for various screen sizes

## API Integration

The application currently uses mock data generated client-side. To integrate with a real API:

1. Replace the `generateCustomers` function in `customerGenerator.ts` with actual API calls.
2. Update the `fetchInitialCustomers` and `fetchMoreCustomers` thunks in `customerSlice.ts` to use the new API functions.
3. Adjust error handling to accommodate API-specific error responses.



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [React Window](https://github.com/bvaughn/react-window) for efficient list virtualization
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified Redux development
- [Picsum Photos](https://picsum.photos/) for providing random photo URLs
```

