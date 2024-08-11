// src/hooks/usePhotos.ts
import { useState, useEffect } from 'react';

export const usePhotos = (customerId: number | null): [string[], boolean, string | null] => {
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

export default usePhotos;