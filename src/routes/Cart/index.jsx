import React from 'react'
import Breadcrumbs from '../../components/breadcrumbs';
import './Cart.scss';
import CartTable from './CartTable';
import CheckoutBox from './checkoutBox';
export default function Cart() {
  return (
    <div>
        <div className='cart-first-header-content-alignment'>
            <Breadcrumbs/>
        </div>
        <div className="container-lg">
            
        
        <div className='cart-all-table-content-alignment'>
            <div className='flex-box'>
                <div className='flex-box-items'>
                    <CartTable/>    
                </div>
                <div className='flex-box-items'>
                    <CheckoutBox/>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
