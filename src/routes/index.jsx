import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import CustomerInfo from '../components/CustomerInfo'
import CityList from '../components/Cities'

const RouteList = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <Suspense fallback={"Loading"}>
                        <Dashboard />
                    </Suspense>
                }
                />
                <Route path='/customer/:id' element={
                    <Suspense fallback={"Loading"}>
                        <CustomerInfo />
                    </Suspense>
                }
                />
                <Route path='/customer-in-cities' element={
                    <Suspense fallback={"Loading"}>
                        <CityList />
                    </Suspense>
                }

                />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteList