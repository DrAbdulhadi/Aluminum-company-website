"use strict";

class Caro {
  constructor(el) {
    this.el = el;
    this.caroData = [
      {
        id: "1",
        src: "imgs/img1.jpg",
      },
      {
        id: "2",
        src: "imgs/img2.jpg",
      },
      {
        id: "3",
        src: "imgs/img3.jpg",
      },
      {
        id: "4",
        src: "imgs/img4.jpg",
      },
      {
        id: "5",
        src: "imgs/img5.jpg",
      },
    ];
    this.caroInView = [1, 2, 3, 4, 5];
    this.caroContainer;
    this.caroPlayState;
  }

  mounted() {
    this.setupCaro();
  }

  setupCaro() {
    const conta = document.createElement("div");
    const contro = document.createElement("div");

    this.el.append(conta, contro);
    conta.className = "cc-container";

    this.caroData.forEach((item, index) => {
      const caroItem = item.src
        ? document.createElement("img")
        : document.createElement("div");

      conta.append(caroItem);

      caroItem.className = `cc-item cc-item-${index + 1}`;
      caroItem.src = item.src;
      caroItem.setAttribute("loading", "lazy");
      caroItem.setAttribute("data-index", `${index + 1}`);
    });
    this.caroConta = conta;
  }

  previouss() {
    this.caroData.unshift(this.caroData.pop());

    this.caroInView.push(this.caroInView.shift());

    this.caroInView.forEach((item, index) => {
      this.caroConta.children[index].className = `cc-item cc-item-${item}`;
    });

    this.caroData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.cc-item-${index + 1}`).src = data.src;
    });
  }

  nextt() {
    this.caroData.push(this.caroData.shift());

    this.caroInView.unshift(this.caroInView.pop());

    this.caroInView.forEach((item, index) => {
      this.caroConta.children[index].className = `cc-item cc-item-${item}`;
    });

    this.caroData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.cc-item-${index + 1}`).src = data.src;
    });
  }
}
const el = document.querySelector(".cc");
const exampleCarousel = new Caro(el);
exampleCarousel.mounted();
document.querySelector(".nextbtn").addEventListener("click", function (e) {
  exampleCarousel.nextt();
});
document.querySelector(".previousbtn").addEventListener("click", function (e) {
  exampleCarousel.previouss();
});
setInterval(function(){exampleCarousel.nextt();},3320)
// ---------------------
