import React from "react";
import { storiesOf } from "@storybook/react";
import Carousel from "./index";
import { basicFixture } from "./Carousel.fixtures";

storiesOf("Carousel", module)
  .add("with no children", () => (
    <Carousel>
    </Carousel>
  ))
  .add("with one image", () => (
    <Carousel>
      <img key={basicFixture[0].id} src={basicFixture[0].url} />
    </Carousel>
  ))
  .add("with images", () => (
    <Carousel>
      {basicFixture.map(image => {
        return (<img key={image.id} src={image.url} />)
      })}
    </Carousel>
  ))
  .add("with auto on", () => (
    <Carousel autoSpeed="2000" auto>
      {basicFixture.map(image => {
        return (<img key={image.id} src={image.url} />)
      })}
    </Carousel>
  ))
  .add("with navigation off", () => (
    <Carousel showNavigation={false} auto>
      {basicFixture.map(image => {
        return (<img key={image.id} src={image.url} />)
      })}
    </Carousel>
  ))
  .add("with dots off", () => (
    <Carousel showDots={false} auto>
      {basicFixture.map(image => {
        return (<img key={image.id} src={image.url} />)
      })}
    </Carousel>
  ))
  .add("with divs", () => (
    <Carousel>
      {basicFixture.map(image => {
        return (<div style={{ background: "pink", height: "400px", minWidth: "100%", width: "400px"}}>{image.id}</div>)
      })}
    </Carousel>
  ));