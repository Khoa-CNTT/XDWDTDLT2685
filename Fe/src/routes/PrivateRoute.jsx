import React, { Children } from 'react';
import { Routes, Route } from 'react-router-dom'

const PrivateRoute = (props) => {
    return (
        <>
            <Routes>
                <Route element={props.Children}></Route>
            </Routes>
        </>
    );
};

export default PrivateRoute;