import styled from "styled-components";
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls";

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
    text-decoration: none;
`

const Navbar = () =>{

    const quantity = useSelector(state=>state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const admin = user ? user.isAdmin : false;
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        logoutUser(dispatch);
      }
    

    return(
        <Container>
            <Wrapper>
                <Left>
                    <Logo><Link to="/">EasyBuy</Link></Logo>
                </Left>
                <Center></Center>
                <Right>
                    {!user && 
                    <>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Login</MenuItem>
                    </>
                    }
                    {admin &&
                    <>
                    <Link to="/admin">Admin</Link>
                    </>
                    }
                    {user &&
                    <>
                    <Link to="/cart">
                        <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={handleClick}>Logout</MenuItem>
                    </>
                    }
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;