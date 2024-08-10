// src/components/PhotoGrid.tsx
import React from 'react';
import './PhotoGrid.css';

interface Props {
  photos: string[];
}

const PhotoGrid: React.FC<Props> = ({ photos }) => {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index + 1}`} style={{width: '400px', height: '400px'}} />
      ))}
    </div>
  );
};

export default PhotoGrid;