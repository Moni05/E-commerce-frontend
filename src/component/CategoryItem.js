import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 100vh;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

`

const CategoryInfo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`
const CategoryTitle = styled.h1`
    margin-bottom: 20px;
    color: white;
`

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: orange;
    color: black;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({item}) =>{
    return(
        <Container>
            <Link to={`/products/${item.category}`}>
            <Image src={item.img}/>
            <CategoryInfo>
                <CategoryTitle>{item.title}</CategoryTitle>
                <Button>SHOP NOW</Button>
            </CategoryInfo>
            </Link>
        </Container>
    )
}
export default CategoryItem;