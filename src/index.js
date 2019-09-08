import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
`;
const PreviousButton = styled.div`
  z-index: 1;
  left: 40px;
  position: absolute;
  background-color: white;
  padding: 5px;
  cursor: pointer;
`;
const NextButton = styled.div`
  z-index: 1;
  right: 40px;
  position: absolute;
  background-color: white;
  padding: 5px;
  cursor: pointer;
`;
const LeftSlide = styled.div`
  width: 20%;
  margin: 0 20px;
  overflow: hidden;
  transition: all 1s;
  
  img {
    transform: translateX(-65%);
  }
`;
const RightSlide = styled.div`
  width: 20%;
  margin: 0 20px;
  overflow: hidden;
  transition: all 1s;
  
  img {
    height: 100%;
  }
`;
const MainSlide = styled.div`
  width: 60%;
  padding: 0 20px;
  transition: all 1s;
  
  img {
    width: 100%;
    display: inline-block;
  }
  
  :hover {
    transform: scale(1.2);
    transition: all 1s;
  }
`;

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getMainSlide = () => {
    return props.children[activeIndex];
  }

  const getLeftSlide = () => {
    return props.children[activeIndex > 0 ? activeIndex - 1 : props.children.length - 1];
  }

  const getRightSlide = () => {
    return props.children[activeIndex < props.children.length - 1 ? activeIndex + 1 : 0];
  }

  const goToNext = () => {
    setActiveIndex(activeIndex < props.children.length - 1 ? activeIndex + 1 : 0)
  }

  const goToPrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : props.children.length - 1)
  }

  if(!props.children) return null;

  return (
    <Wrapper>
      <PreviousButton onClick={goToPrev}>Prev</PreviousButton>
      <LeftSlide>{getLeftSlide()}</LeftSlide>
      <MainSlide>{getMainSlide()}</MainSlide>
      <RightSlide>{getRightSlide()}</RightSlide>
      <NextButton onClick={goToNext}>Next</NextButton>
    </Wrapper>
  )
}

export default Carousel;