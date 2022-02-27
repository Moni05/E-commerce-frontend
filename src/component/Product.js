import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    display: flex;
    flex: 1;
    min-width: 300px;
    height: 350px;
    margin: 5px;
    align-items: center;
    justify-content: center;
    background-color: papayawhip;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`

const Image = styled.img`
    height: 90%;
    z-index: 2;

`

const Circle = styled.div`
  width: 300px;
  height: 350px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    
    &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
    }

`

const Product = ({item}) =>{
    return(
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                    <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />  
                </Icon>
            </Info>
        </Container>
    )
}

export default Product;