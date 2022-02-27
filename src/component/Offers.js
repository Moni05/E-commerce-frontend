import styled from "styled-components";
import { LocalOfferOutlined } from "@material-ui/icons"

const Container = styled.div`
    height: 30px;
    background-color: #ff2600;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
`
const Icon = styled.div`
    margin-left: 5px;
`
const Offers = () =>{
    return (
        <Container>
            <Icon><LocalOfferOutlined /></Icon>Avail upto 50% off on purchase over $1000 !!!
        </Container>
    )
}

export default Offers;