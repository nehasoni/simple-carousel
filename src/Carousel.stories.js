import React from "react";
import { storiesOf } from "@storybook/react";
import Carousel from "./index";
import { basicFixture } from "./Carousel.fixtures";

storiesOf("Carousel", module)
  .add("with no children", () => (
    <Carousel>
    </Carousel>
  ))
  .add("with images", () => (
    <Carousel>
      {basicFixture.map(image => {
        return (<img key={image.id} src={image.url} />)
      })}
    </Carousel>
  ))
  .add("with divs", () => (
    <Carousel>
      {basicFixture.map(image => {
        return (<div style={{ background: "pink"}}>{image.id}</div>)
      })}
    </Carousel>
  ));