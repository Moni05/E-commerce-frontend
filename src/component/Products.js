import { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const BASE_URL = process.env.REACT_APP_URL;

const Products = ({ category, filters, sort}) =>{

    console.log(category, filters, sort);

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await axios.get( category ? `${BASE_URL}products?category=${category}`: `${BASE_URL}products`);
            setProducts(res.data);
          } catch (err) {}
        };
        getProducts();
    },[category]);

    useEffect(() => {
        category &&
          setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
    }, [products, category, filters]);

    useEffect(() => {
        if (sort === "newest") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
          );
        } else if (sort === "asc") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
          );
        } else {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
          );
        }
    }, [sort]);
    
    return(
        <Container>
      {category ? (filteredProducts.length?filteredProducts.map((item) => <Product item={item} key={item._id} />):<Title>No Products to display</Title>)
        :  products
        .slice(0, 8)
        .map((item) => <Product item={item} key={item._id} />)}
        </Container>
    );
}

export default Products;