import styled from "styled-components";
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    display: flex;
`
const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuItem = styled.div`
    font-size: 16px;
    cursor: pointer;
    margin-left: 25px;
`

const Logo = styled.div`
    font-size: 24px;
`

const Navbar = () =>{

    const quantity = useSelector(state=>state.cart.quantity)

    return(
        <Container>
            <Wrapper>
                <Left>
                    <Logo>EasyBuy</Logo>
                </Left>
                <Center></Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Login</MenuItem>
                    <Link to="/cart">
                        <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;