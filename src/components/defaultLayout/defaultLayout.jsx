import React from 'react'
import Footer from '../footer'
import Header from '../layout/header/header'

export default function DefaultLayout({ children }) {
    return (
        <>

            <Header />
            {children}
            <Footer />
        </>
    )
}
