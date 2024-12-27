import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./carousel.module.css";
import Image1 from "../../resources/img/carousel/image-1.png";
import Image2 from "../../resources/img/carousel/image-2.png";
import Image3 from "../../resources/img/carousel/image-3.png";
export default function CarouselImage({ corouselItems }) {
  if (
    corouselItems === undefined ||
    corouselItems == null ||
    corouselItems.length() === 0
  ) {
    corouselItems = [
      {
        image: Image1,
        title: [
          "Wujudkan Kartini Dalam Dirimu dengan Kebaya Eksklusif dari Meli Boutique.",
        ],
        description: "",
      },
      {
        image: Image2,
        title: [
          "Usia Boleh Bertambah, Pesona Tetap Terjaga!",
          "Tampilkan Elegansi dengan Atasan Brukat Menawan.",
        ],
        description: "",
      },
      {
        image: Image3,
        title: [
          "Wujudkan Pesona Eleganmu! Dress Tile yang Memukau Hanya di Sini!",
        ],
        description: "",
      },
    ];
  }
  return (
    <Carousel controls={false} touch={true} interval={1000} className={`${style.customCarouselImage}`}>
      {corouselItems.map((item, index) => (
        <Carousel.Item
          key={index}
          className={`${style.customCarouselImageItem}`}
        >
          <img src={item.image} alt="text" />
          <Carousel.Caption>
            {item.title.map((title, index2) => (
              <h4 key={`title-${index}-${index2}`}>{title}</h4>
            ))}
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
