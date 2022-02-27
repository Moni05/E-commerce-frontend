import styled from "styled-components";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Fragment, useState, useEffect } from "react";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";



import { Add, Remove, Delete } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import StripeCheckout from "react-stripe-checkout";

import { updateProduct, deleteProduct } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteSx = {
  position: "absolute",
  cursor: "pointer",
  right: 0,
  top: 0
}

const ProductColorContainer = styled.div`
  display: flex;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart);

  const { products, total } = cart;


  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/payment", {
          tokenId: stripeToken.id,
          amount: total*100,
        });
        navigate("/success", {state:{
          stripeData: res.data,
          products: cart }});
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, total, navigate]);

  const handleDelete = (data) => {
    dispatch(deleteProduct(data))
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {products?.map((product) => {
              const { img, title, _id: id, color, size, quantity, price } = product
              return (
                <Fragment key={id + size + color}>
                  <Product>
                    <Delete
                      sx={DeleteSx}
                      onClick={() =>
                        handleDelete({
                          id,
                          totalPrice: price * quantity,
                          size,
                          color
                        })
                      }
                    />
                    <ProductDetail>
                      <Image src={img} alt={title} />
                      <Details>
                        <ProductName>
                          <b>{product.title}: </b>
                          {title}
                        </ProductName>
                        <ProductId>
                          <b>{product._id}: </b>
                          {id}
                        </ProductId>
                        <ProductColorContainer>
                          <b>{product.color}: </b>
                          <ProductColor color={color} />
                        </ProductColorContainer>
                        {(size?.length && size?.includes("") && (
                          <ProductSize>
                            <b>{product.size}: </b>
                            {size}
                          </ProductSize>
                        )) ||
                          ""}
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add
                          onClick={() => {
                            dispatch(
                              updateProduct({ id, quantity: 1, price, size, color })
                            )
                          }}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove
                          onClick={() => {
                            if (quantity > 1)
                              dispatch(
                                updateProduct({
                                  id,
                                  quantity: -1,
                                  price,
                                  size,
                                  color
                                })
                              )
                          }}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        {price * quantity}
                        {products.currency}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                </Fragment>
              )
            })}
            {/* {products.map(product=>( 
                            const { img, title, _id: id, color, size, qte, price } = product

            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                <Add onClick={() => { dispatch (updateProduct({ id, quantity: 1, price, size, color })) }} />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove onClick={() => { if (quantity > 1)
                              dispatch(
                                updateProduct({
                                  id,
                                  quantity: -1,
                                  price,
                                  size,
                                  color
                                })
                              )
                  }}/>
                </ProductAmountContainer>
                <ProductPrice>Rs. {product.price * product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>)}
            <Hr /> */}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Shop"
              image="https://firebasestorage.googleapis.com/v0/b/mern-project-images.appspot.com/o/About-me.png?alt=media&token=b5cb13c1-59b3-4cec-841b-d8b421056fc6"
              billingAddress
              shippingAddress
              description={`Your total is Rs.${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              currency="INR"
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;