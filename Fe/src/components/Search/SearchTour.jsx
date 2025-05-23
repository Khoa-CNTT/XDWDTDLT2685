import React from 'react';
import Places from '../Places/Places';
import useSearch from '../../hooks/useSearch';
import NoPage from '../../pages/NoPage';

const SearchTour = () => {
  const { tours } = useSearch();

  if (!tours || tours.length === 0) {
    return <NoPage />;
  }

  return (
    <div>
      <div className=''>
        <h1 className='pl-3  my-8 text-2xl font-bold text-left border-l-8 ml-[200px] border-primary/50'>
          Tour tìm thấy
        </h1>
        <Places hideTitle={false} tours={tours} />
      </div>
    </div>
  );
};

export default SearchTour;
