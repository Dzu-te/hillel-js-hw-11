
export class Slider {
  currentSliderState = 0;
  stateInterval;
  arrowContainerWidth = 60;

  constructor(images, containerId, intervalTiming, isAutostart, dotStyle) {

    if (!Array.isArray(images) || images.length === 0) {
      throw new Error("'images' должен быть непустым массивом.");
    }

    if (!containerId || typeof containerId !== 'string') {
      throw new Error(" 'containerId' должен быть задан и быть строкой.");
    }

    this.images = images;
    this.containerId = `#${containerId}`;
    this.intervalTiming = intervalTiming || 2;
    this.dotStyle = dotStyle || 'circle';


    this.init();

    if (typeof isAutostart === 'boolean' && isAutostart) {
      this.onStartStop();
    }
  }

  init() {
    this.slider = document.querySelector(`${this.containerId} .slider`);
    this.arrowLeft = document.querySelector(`${this.containerId} .arrow-left`);
    this.arrowRight = document.querySelector(`${this.containerId} .arrow-right`);
    this.sliderDotsContainer = document.querySelector(`${this.containerId} .slider-dots-container`);
    this.startStopContainer = document.querySelector(`${this.containerId} .start-stop-container`);
    this.startStopButton = document.querySelector(`${this.containerId} .start-stop-button`);
    this.sliderContainer = document.querySelector(`${this.containerId}`);
    this.createImages();
    this.sliderImages = document.querySelectorAll(`${this.containerId} .slider-image`);
    console.log('sliderImages -', this.sliderImages);
    this.createDots();

    this.arrowLeft.addEventListener("click", this.arrowLeftClick.bind(this));
    this.arrowRight.addEventListener("click", this.arrowRightClick.bind(this));
    this.sliderDotsContainer.addEventListener('click', this.onDotClick.bind(this));
    this.startStopContainer.addEventListener('click', this.onStartStop.bind(this));

    this.carouselImageLength = this.sliderImages.length;

    window.addEventListener('load', () => { this.sliderContainer.style.maxWidth = `${this.getImageWidth() + this.arrowContainerWidth * 2}px`; })
  };

  createImages() {
    let imgHTML = '';
    this.images.forEach((image) => {
      imgHTML += `<img class="slider-image" src="${image}" alt="image"/>`;
    });
    this.slider.innerHTML = imgHTML;
  }

  createDots() {
    let dotsText = '';
    const dotClass = this.dotStyle === 'square' ? 'dot-square' : 'dot';

    this.images.forEach((image, index) => {
      const addClass = index === 0 ? 'active' : '';
      dotsText += `<div class="${dotClass} ${addClass}" data-index="${index}"></div>`;
    })
    this.sliderDotsContainer.innerHTML = dotsText;
  }


  getImageWidth() {
    if (!this.sliderImages || this.sliderImages.length === 0) {
      throw new Error('sliderImages is empty or not defined');
    }
    return this.sliderImages[0].getBoundingClientRect().width;

  }

  updateSlider() {
    const imageWidth = this.getImageWidth();
    this.slider.style.transform = `translateX(${-this.currentSliderState * imageWidth}px)`;
    this.updateDots();
  }

  arrowLeftClick() {
    this.currentSliderState--;

    if (this.currentSliderState < 0) {
      this.currentSliderState = this.carouselImageLength - 1;
    }

    if (this.currentSliderState >= this.carouselImageLength) {
      this.currentSliderState = 0
    }
    this.updateSlider();
    this.updateDots();
  }

  arrowRightClick() {
    this.currentSliderState++;

    if (this.currentSliderState >= this.carouselImageLength) {
      this.currentSliderState = 0;
    }

    this.updateSlider();
    this.updateDots();
  }


  updateDots() {
    const dots = document.querySelectorAll(`${this.containerId} .dot, ${this.containerId} .dot-square`);
    dots.forEach(dot => dot.classList.remove('active'));
    const activeDot = document.querySelector(`${this.containerId} .${this.dotStyle === 'square' ? 'dot-square' : 'dot'}[data-index="${this.currentSliderState}"]`);
    if (activeDot) {
      activeDot.classList.add('active');
    }
  }


  onDotClick(event) {
    if (!event.target.classList.contains('dot') && !event.target.classList.contains('dot-square')) {
      return;
    }

    this.currentSliderState = Number(event.target.dataset.index);
    this.updateSlider();
  }


  onStartStop() {
    this.isSliding = !this.isSliding;

    if (this.isSliding) {
      this.stateInterval = setInterval(this.arrowRightClick.bind(this), this.intervalTiming * 1000);
      this.startStopButton.textContent = "STOP";
    } else {
      clearInterval(this.stateInterval);
      this.stateInterval = null;
      this.startStopButton.textContent = "START";
    }
  }
}