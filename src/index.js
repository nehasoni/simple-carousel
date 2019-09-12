import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useHover } from "./utils/hooks";

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
  transform: translateX(${props => -(props.translate)}%);
  display: block;
  list-style: none;
  padding: 0;
  margin: 0;
  transition: transform .5s;
  transition-timing-function: cubic-bezier(.645,.045,.355,1);
  will-change: transform;
`;
const Button = styled.div`
  z-index: 1;
  position: absolute;
  background-color: white;
  padding: 5px;
  cursor: pointer;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const PreviousButton = styled(Button)`
  left: 40px;
`;
const NextButton = styled(Button)`
  right: 40px;
`;
const MainSlide = styled.li`
  width: ${props => props.width - 6}%;
  padding: 0 20px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  list-style-type: none;
  z-index: ${props => props.active ? 1 : 0};
  
  img {
    width: 100%;
    transition: all 0.5s;
    display: inline-block;
  }
  
  ${props => props.active && `
    img:hover {
      transform: scale(1.2);
      transition: all 1s;
      z-index: 1;
    }
  `}
`;
const Icon = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  
  ${props => props.direction === "left" && `
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  `}
  
  ${props => props.direction === "right" && `
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  `}
`;

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverRef, isHovered] = useHover();

  let autoInterval;

  useEffect(() => {
    function handleKeyDown(event) {
      if(event.keyCode === 37) {
        clearInterval(autoInterval);
        goToPrev();
      }
      if(event.keyCode === 39) {
        clearInterval(autoInterval);
        goToNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex])

  useEffect(() => {
    if(props.auto) {
      autoInterval = setInterval(function() {
        goToNext();
      }, props.autoSpeed || 3000);
    }
    return function(){
      clearInterval(autoInterval);
    }
  })

  useEffect(() => {
    if(isHovered) {
      clearInterval(autoInterval);
    }
  })

  const getLeftSlide = () => {
    return activeIndex > 0 && activeIndex - 1;
  }

  const getRightSlide = () => {
    return activeIndex < props.children.length - 1 && activeIndex + 1;
  }

  const goToNext = () => {
    setActiveIndex(activeIndex < props.children.length - 1 ? activeIndex + 1 : 0)
  }

  const goToPrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : props.children.length - 1)
  }

  const getTranslateValue = () => {
    return (11 * activeIndex) + 3 * (activeIndex - 1);
  }

  if(!props.children) return null;

  return (
    <Wrapper>
      <div>
        <SlidesWrapper ref={hoverRef} width={props.children.length * 100} translate={props.children.length > 1 ? getTranslateValue(): 0}>
          {props.children.length > 1 ? props.children.map((child, index) => {
            return (
              <MainSlide
                key={index}
                width={100/props.children.length}
                active={activeIndex === index}
                isLeft={index === getLeftSlide()}
                isRight={index === getRightSlide()}
              >
                {child}
              </MainSlide>
            )
          }) :
            <MainSlide
              width={100/props.children.length}
              active
            >
              {props.children}
            </MainSlide>
          }
        </SlidesWrapper>
      </div>
      {props.children.length > 1 &&
        <React.Fragment>
          <PreviousButton onClick={goToPrev}>
            <Icon direction="left" />
          </PreviousButton>
          <NextButton onClick={goToNext}>
            <Icon direction="right" />
          </NextButton>
        </React.Fragment>
      }
    </Wrapper>
  )
}

Carousel.propTypes = {
  showNavigation: PropTypes.bool,
  showDots: PropTypes.bool,
  auto: PropTypes.bool,
  autoSpeed: PropTypes.number
}

export default Carousel;