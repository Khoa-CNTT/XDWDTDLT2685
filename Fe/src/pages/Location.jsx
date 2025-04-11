import React from 'react';
import LocationTitle from '../components/Location/LocationTitle';
import LocationList from '../components/Location/LocationList';
import LocationItem from '../components/Location/LocationItem';

const Location = () => {
    return (
        <div>
            <LocationTitle />
            <LocationList />
            <LocationItem />
        </div>
    );
};

export default Location;