import React from "react";
import { storiesOf } from "@storybook/react";
import Carousel from "./index";

storiesOf("Carousel", module)
  .add("with text", () => (
    <Carousel />
  ));