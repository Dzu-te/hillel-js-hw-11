import { Slider } from "./Slider.js";

const images = [
  "images/sky.webp",
  "images/tiger.webp",
  "images/bridge.webp",
  "images/woman.webp",
];

const images2 = [
  "images/beach-indonesia.webp",
  "images/sky.webp",
  "images/lake-mountains.webp",
  "images/tiger.webp",
  "images/bridge.webp",
  "images/woman.webp",
];

const container1 = 'sliderContainer';
const container2 = 'sliderWomanContainer';

//  * @param {Array} images - массив изображений
//  * @param {String} containerId - id контейнера слайдера (без #)
//  * @param {Number} intervalTiming - интервал переключения слайдов (секунд)
//  * @param {Boolean} isAutostart - автозапуск слайдера (true/false)
//  * @param {String} dotStyle - тип точек навигации ('circle' или 'square'), по умолчанию 'circle'

const slider1 = new Slider(images, container1, 4, false, 'square');
const slider2 = new Slider(images2, container2, null, true);
