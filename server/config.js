/**
 * W3JFi-Lottery - Prize Configuration
 * type: Unique identifier, 0 is reserved for special prize placeholder
 * count: Prize quantity
 * title: Prize description
 * text: Prize name
 * img: Image URL
 */
const prizes = [
  {
    type: 0,
    count: 1000,
    title: "",
    text: "Special Prize"
  },
  {
    type: 1,
    count: 2,
    text: "Grand Prize",
    title: "Mystery Gift",
    img: "../img/secrit.jpg"
  },
  {
    type: 2,
    count: 5,
    text: "First Prize",
    title: "Mac Pro",
    img: "../img/mbp.jpg"
  },
  {
    type: 3,
    count: 6,
    text: "Second Prize",
    title: "Huawei Mate30",
    img: "../img/huawei.png"
  },
  {
    type: 4,
    count: 7,
    text: "Third Prize",
    title: "iPad Mini5",
    img: "../img/ipad.jpg"
  },
  {
    type: 5,
    count: 8,
    text: "Fourth Prize",
    title: "DJI Drone",
    img: "../img/spark.jpg"
  },
  {
    type: 6,
    count: 8,
    text: "Fifth Prize",
    title: "Kindle",
    img: "../img/kindle.jpg"
  },
  {
    type: 7,
    count: 11,
    text: "Sixth Prize",
    title: "Bluetooth Headset",
    img: "../img/edifier.jpg"
  }
];

/**
 * Number of prizes to draw each time (corresponds to prizes array)
 */
const EACH_COUNT = [1, 1, 5, 6, 7, 8, 9, 10];

/**
 * Company name displayed on cards
 */
const COMPANY = "W3JFi";

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};
