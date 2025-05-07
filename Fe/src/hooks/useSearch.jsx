import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchTour } from '../services/tour';

const priceMap = {
  "1.000.000 - 3.000.000 Vnd": { min: 1000000, max: 3000000 },
  "3.000.000 - 6.000.000 Vnd": { min: 3000000, max: 6000000 },
  "6.000.000 - 8.000.000 Vnd": { min: 6000000, max: 8000000 },
  "8.000.000 - 10.000.000 Vnd": { min: 8000000, max: 10000000 }
};

const durationMap = {
  "3 ngày 2 đêm": "3 ngày 2 đêm",
  "4 ngày 3 đêm": "4 ngày 3 đêm",
  "5 ngày 4 đêm": "5 ngày 4 đêm"
};

const useSearch = () => {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const title = searchParams.get('title') || '';
        const duration = searchParams.get('duration') || '';
        const priceRange = searchParams.get('priceRange') || '';

        const priceObj = priceMap[priceRange] || {};
        const durationValue = durationMap[duration] || null;
        const { min: priceMin, max: priceMax } = priceObj;

        const res = await getSearchTour(0, 20, title, priceMin, priceMax, durationValue);
        setTours(res.data.tours);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm tour:', error);
      }
    };

    fetchTours();
  }, [searchParams]);

  return {
    tours,
  };
};

export default useSearch;
