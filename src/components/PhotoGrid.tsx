// src/components/PhotoGrid.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './PhotoGrid.css';

interface Props {
  photos: string[];
  loading: boolean;
  error: string | null;
}

const PhotoGrid: React.FC<Props> = ({ photos, loading, error }) => {
  if (error) {
    return <div className="photo-grid-error">{error}</div>;
  }

  return (
    <div className="photo-grid">
      {loading
        ? Array(9).fill(0).map((_, index) => (
            <div key={index} className="photo-skeleton">
              <Skeleton height={400} width={400} />
            </div>
          ))
        : photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} style={{width: '400px', height: '400px'}} />
          ))
      }
    </div>
  );
};

export default PhotoGrid;