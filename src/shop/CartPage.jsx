import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import delImgUrl from "../assets/images/shop/del.png"
import CheckOutPage from './CheckOutPage'

const CartPage = () => {

    const [cartItems, setcartItems] = useState([])

    useEffect (() =>{
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setcartItems(storedCartItems);
    }, [])

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const handleIncrease = (item) => {
        item.quantity += 1;
        setcartItems([...cartItems]);

        localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    const handleDecrease = (item) => {
        if(item.quantity > 1){
            item.quantity -= 1;
            setcartItems([...cartItems]);
        } 
    };

    const handleRemoveItem = (item) => {
        const updateCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

        setcartItems(updateCart);
        
        updateLocaStorage(updateCart)

    };

    const updateLocaStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart))
    };

    const cartSubtotal = cartItems.reduce((total, item) => {
        return total + calculateTotalPrice(item);
    }, 0)

    const orderTotal = cartSubtotal; 

  return <div>
    <PageHeader title={"Shop Cart"} curPage={"Cart Page"}/>
    <div className='shop-cart padding-tb'>
        <div className='container'>
            <div className="section-wrapper">
                <div className='cart-top'>
                    <table>
                        <thead>
                            <tr>
                            <th className='cat-product'>Product</th>
                                <th className='cat-price'>Price</th>
                                <th className='cat-quantity'>Quantity</th>
                                <th className='cat-toprice'>Total</th>
                                <th className='cat-edit'>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item, indx) => (
                                    <tr key={indx}> 
                                        <td className='product-item cat-product'>
                                            <div className='p-thumb'>
                                                <Link to="/shop"><img src={item.img} alt="" /></Link>
                                            </div>
                                            <div className='p-content'>
                                                <Link to="/shop">{item.name}</Link>
                                            </div>
                                        </td>
                                        <td className='cat-price'>$ {item.price}</td>
                                        <td className='cat-quantity'>
                                            <div className='cart-plus-minus'>
                                                <div className='dec qtybutton' onClick={() => handleDecrease(item)}>-</div>
                                                <input type="text" className='cart-plus-minus-box' name='qtybutton' value={item.quantity}/>
                                                <div className='inc qtybutton' onClick={() => handleIncrease(item)}>+</div>
                                            </div>
                                        </td>
                                        <td className='cat-toprice'>${calculateTotalPrice(item)}</td>
                                        <td className='cat-edit'>
                                            <a href="#" onClick={() => handleRemoveItem(item)}>
                                                <img src={delImgUrl} alt="" />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='cart-bottom'>
                    <div className='cart-checkout-box'>
                        <form className='coupon'>
                            <input className='cart-page-input-text' type="text" name="coupon" id="coupon" placeholder='Coupon code ...' />
                            <input type="submit" value="Aplly Coupon" />
                        </form>
                        <form className='cart-checkout'>
                            <input type="submit" value="Update Cart" />
                            <div>
                                <CheckOutPage />
                            </div>                            
                        </form>
                    </div>
                    <div className='shiping-box'>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='calculate-shiping'>
                                    <h3>Calculate Shiping</h3>
                                    <div className="outline-select">
                                        <select>
                                            <option value="uk">United Kingdom(UK)</option>
                                            <option value="arg">Argentina(ARG)</option>
                                            <option value="us">United States(USA)</option>
                                            <option value="mx">Mexico(MX)</option>
                                        </select>
                                        <span className='select-icon'>
                                            <i className='icofont-rounded-down'></i>
                                        </span>
                                    </div>
                                    <div className='outline-shiping-select'>
                                        <select>
                                            <option value="uk">United Kingdom(UK)</option>
                                            <option value="arg">Argentina(ARG)</option>
                                            <option value="us">United States(USA)</option>
                                            <option value="mx">Mexico(MX)</option>
                                        </select>
                                        <span className='select-icon'>
                                            <i className='icofont-rounded-down'></i>
                                        </span>
                                    </div>
                                    <input type="text" name="postalCode" id="postalCode" placeholder='Postcode/ZIP*' />
                                    <button type='submit'>Update Address</button>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                 <div className='cart-overview'>
                                    <h3>Cart Total</h3>
                                    <ul className='lab-ul'> 
                                        <li>
                                            <span className='pull-left'>Cart Subtotal</span>
                                            <p className='pull-rigth'>${cartSubtotal}</p>
                                        </li>
                                        <li>
                                            <span className='pull-left'>Shipping and Handling</span>
                                            <p className='pull-rigth'>Free Shipping</p>
                                        </li>
                                        <li>
                                            <span className='pull-left'>Order Total</span>
                                            <p className='pull-rigth'>${orderTotal}</p>
                                        </li>
                                    </ul>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
}

export default CartPage