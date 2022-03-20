import styled from "styled-components";
import { useState } from "react";
import { sliderItems } from "../data";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 100vh;
    overflow: hidden;
    position: relative;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`

const Arrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    background-color: cornflowerblue;
    border-radius: 50%;
    margin: auto;
    left: ${(props) => props.direction==="left" && "10px"};
    right: ${(props) => props.direction==="right" && "1px"};
    height: 50px;
    width: 50px;
    opacity: 0.5;
    z-index: 2;
    cursor: pointer;
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #${(props) => props.bg};
    align-items: center;

`
const SlideImgContainer = styled.div`
    flex: 1;
    height: 70%

`

const SlideImg = styled.img`
    height: 100%
`
const SlideInfoText = styled.div`
    flex: 1;
`

const InfoTitle = styled.h1`
    font-size: 85px;

`

const InfoDesc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const CtaButton = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;

`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      }
    };
    return(
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item)=>{
                    return (
                        <Slide bg={item.bg} key={item.id} >
                        <SlideImgContainer><SlideImg src={item.img} alt={item.title}/></SlideImgContainer>
                        <SlideInfoText>
                            <InfoTitle>{item.title}</InfoTitle>
                            <InfoDesc>{item.desc}</InfoDesc>
                            <CtaButton><Link to={item.link}>Shop Now</Link></CtaButton>
                        </SlideInfoText>
                    </Slide>
                    )
                })}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider;