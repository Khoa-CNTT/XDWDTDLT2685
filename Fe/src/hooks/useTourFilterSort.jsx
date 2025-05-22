import { useEffect, useState } from 'react';
import { getFilterSortTours } from '../services/tour';

const regionMap = {
  "Miền Bắc": "NORTH",
  "Miền Trung": "CENTRAL",
  "Miền Nam": "SOUTH"
};

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

const useTourFilterSort = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [sortValue, setSortValue] = useState('default');
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, [selectedRegion, selectedPrice, selectedDuration, sortValue, selectedStar]);

  const fetchTours = async () => {
    try {
      const region = regionMap[selectedRegion] || null;
      const priceRange = priceMap[selectedPrice] || {};
      const duration = durationMap[selectedDuration] || null;
      const { min: priceMin, max: priceMax } = priceRange;

      let sortBy = '';
      let sortDir = '';

      switch (sortValue) {
        case 'new':
          sortBy = 'createdAt';
          sortDir = 'desc';
          break;
        case 'old':
          sortBy = 'createdAt';
          sortDir = 'asc';
          break;
        case 'high-to-low':
          sortBy = 'priceAdult';
          sortDir = 'desc';
          break;
        case 'low-to-high':
          sortBy = 'priceAdult';
          sortDir = 'asc';
          break;
        default:
          break;
      }

      const res = await getFilterSortTours(0, 20, region, priceMin, priceMax, duration, sortBy, sortDir, selectedStar);
      setTours(res.data.tours);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tour:", error);
    }
  };

  const resetFilters = async () => {
    setSelectedRegion(null);
    setSelectedPrice(null);
    setSelectedDuration(null);
    setSortValue('default');
    setSelectedStar(null);
    try {
      const res = await getFilterSortTours(0, 20); 
      setTours(res.data.tours);
    } catch (error) {
      console.error("Lỗi khi reset:", error);
    }
  };

  return {
    selectedStar,
    setSelectedStar,
    selectedRegion,
    setSelectedRegion,
    selectedPrice,
    setSelectedPrice,
    selectedDuration,
    setSelectedDuration,
    sortValue,
    setSortValue,
    tours,
    resetFilters
  };
};

export default useTourFilterSort;
