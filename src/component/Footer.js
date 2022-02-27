import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
  
const Container = styled.div`
    display: flex;
`
  
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
  
const Logo = styled.h1``;
  
const Desc = styled.p`
    margin: 20px 0px;
`
  
const SocialContainer = styled.div`
    display: flex;
`
  
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
  
const Center = styled.div`
    flex: 1;
    padding: 20px;
`
  
const Title = styled.h3`
    margin-bottom: 30px;
`
  
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
  
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
  
const Right = styled.div`
    flex: 1;
    padding: 20px;
`
  
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
  
const Payment = styled.img`
    width: 50%;
`
  
const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>EasyBuy.</Logo>
          <Desc>
            EasyBuy sells high-end, eco-conscious fashion and accessories for men and women. Their product descriptions match their style: sassy, yet classy. 
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem><Link to="/">Home</Link></ListItem>
            <ListItem>Cart</ListItem>
            <ListItem><Link to="/products/Men">Men Fashion</Link></ListItem>
            <ListItem><Link to="/products/Women">Women Fashion</Link></ListItem>
            <ListItem><Link to="/products/Household-items">Household Items</Link></ListItem>
            <ListItem><Link to="/products/Sunglasses">Sunglassess</Link></ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem><Link to="/products/Footwear">Footwear</Link></ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 622 Park road, Chennai
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +91 9000000000
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> easybuy@gmail.com
          </ContactItem>
          <Payment src="https://firebasestorage.googleapis.com/v0/b/mern-project-images.appspot.com/o/payment.png?alt=media&token=76787262-8d43-4302-921e-8271a7fc85a6" />
        </Right>
      </Container>
    );
  };
  
export default Footer;