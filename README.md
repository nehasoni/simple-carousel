# simple-carousel

`simple-carousel` is an npm package ([`react-anim-carousel`](https://www.npmjs.com/package/react-anim-carousel)) written in [`React`](https://reactjs.org/).
 It can be used to add a carousel component.


Link for demo - https://nehasoni.github.io/simple-carousel

#### Requirements
* [`Node.js`](https://nodejs.org/en/)

#### Installation

`npm install --save react-anim-carousel`


#### Usage

```
import Carousel from "react-anim-carousel";

<Carousel>
   <div style={{ background: "blue", height: "400px", minWidth: "100%", width: "400px"}}>{image.id}</div>
   <div style={{ background: "red", height: "400px", minWidth: "100%", width: "400px"}}>{image.id}</div>
   <div style={{ background: "yellow", height: "400px", minWidth: "100%", width: "400px"}}>{image.id}</div>
</Carousel>
```

#### Options

* `showNavigation` - shows or hides arrows for navigation. Its default value is `true`
* `showDots` - shows or hides the dots on the bottom for navigation. Its default value is `true`
* `auto` - If `true` slides changes in the given interval.
* `autoSpeed` - slide change interval in milliseconds. Its default value is 3s.

