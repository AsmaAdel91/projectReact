import axios from 'axios';
import React, { useState } from 'react'
import styles from './FeaturedProducts.module.css';
import { useEffect } from 'react';


export default function FeaturedProducts() {

  const [products, setproducts] = useState([]);

  async function getProducts() {
    let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products');

    setproducts(data.data);
  }
  useEffect(() => {

    getProducts();

  }, [])


  return <>
    <div className="row py-5">

      {products.map((product) => <div key={product._id} className="col-md-2 py-3">
        <div className="product cursor-pointer mx-1 border-1 border-dark p-2">
          <img className='w-100' src={product.imageCover} alt="" />
          <span className='text-main fw-bold font-sm'>{product.category.name}</span>
          <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(" ")}</h3>
          <div className="d-flex justify-content-between">
            <span className='text-muted'>{product.price} EGP</span>
            <span>
              <i className='fas fa-star rating-color'> </i>
              {product.ratingsAverage}
            </span>
          </div>

             <button className='btn bg-main  text-white w-100'>+Add</button>
        </div>
      </div>
      )}

    </div>
  </>

}
