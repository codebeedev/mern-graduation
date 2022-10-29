import React from 'react';
import './styles.scss';
import ItemProduct from '../ItemProduct';

function ListProducts({ products }) {
  return (
    <section className="menu container" id="menu">
      <div className="box_container">
        {products &&
          products.map((item) => {
            return <ItemProduct item={item} key={item._id} />;
          })}
      </div>
    </section>
  );
}

export default ListProducts;
