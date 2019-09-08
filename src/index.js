import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
`;
const SlidesWrapper = styled.ul`
  width: ${props => props.width}%;
  transform: translateX(-${props => props.translate}%);
  display: block;
  list-style: none;
  padding: 0;
  margin: 0;
  transition: transform .5s;
  transition-timing-function: cubic-bezier(.645,.045,.355,1);
  will-change: transform;
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
const MainSlide = styled.li`
  width: ${props => props.width - 6}%;
  padding: 0 20px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 0;
  margin: 0;
  list-style-type: none;
  z-index: ${props => props.active ? 1 : 0};
  
  img {
    width: 100%;
    display: inline-block;
  }
  
  ${props => props.active && `
    :hover {
      transform: scale(1.2);
      transition: all 1s;
      z-index: 1;
    }
  `}
  
  ${props => props.isLeft && `
    transform-origin: top right;
    transform: skewY(5deg);
  `}
  
  ${props => props.isRight && `
    transform-origin: top left;
    transform: skewY(-5deg);
  `}
  
`;

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getMainSlide = () => {
    return props.children[activeIndex];
  }

  const getLeftSlide = () => {
    return activeIndex > 0 && activeIndex - 1;
  }

  const getRightSlide = () => {
    return activeIndex < props.children.length - 1 && activeIndex + 1;
  }

  const goToNext = () => {
    setActiveIndex(activeIndex < props.children.length - 2 ? activeIndex + 1 : activeIndex)
  }

  const goToPrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : activeIndex)
  }

  const getTranslateValue = () => {
    return (11 * activeIndex) + 3 * (activeIndex - 1);
  }

  if(!props.children) return null;

  return (
    <Wrapper>
      <div>
        <SlidesWrapper width={props.children.length * 100} translate={getTranslateValue()}>
          {props.children.map((child, index) => {
            return (
              <MainSlide
                width={100/props.children.length}
                active={activeIndex === index}
                isLeft={index === getLeftSlide()}
                isRight={index === getRightSlide()}
              >
                {child}
              </MainSlide>
            )
          })}
        </SlidesWrapper>
      </div>
      <PreviousButton onClick={goToPrev}>Prev</PreviousButton>
      <NextButton onClick={goToNext}>Next</NextButton>
    </Wrapper>
  )
}

export default Carousel;