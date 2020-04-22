import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Img1 from "../assets/carousel1.jpg";
import Img2 from "../assets/carousel2.jpg";
import Img3 from "../assets/carousel3.jpg";
import Img4 from "../assets/carousel4.jpg";


export default (props) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img1}
            alt="First slide"
            style={{height: "100%",
                maxHeight: "550px"}}
          />
          <Carousel.Caption style={{backgroundColor: "#242424", opacity: "80%"}}>
            <h3>The 360° Experience</h3>
            <p>Lihat bagaimana isi ruangan secara menyeluruh dengan tampilan 360°!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img2}
            alt="Second slide"
            style={{height: "100%",
                maxHeight: "550px"}}
          />
  
          <Carousel.Caption style={{backgroundColor: "#242424", opacity: "80%"}}>
            <h3>Punya kamar untuk disewa?</h3>
            <p>Jadikan kamarmu rumah kedua bagi penghuni dan dapatkan penghasilan tambahan!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img3}
            alt="Third slide"
            style={{height: "100%",
                maxHeight: "550px"}}
          />
  
          <Carousel.Caption style={{backgroundColor: "#242424", opacity: "80%"}}>
            <h3>Cari kamar ideal</h3>
            <p>
              Tentukan kriteria kamar yang kamu cari, mulai dari fasilitas, tempat, dan harga!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img4}
            alt="Fourth slide"
            style={{height: "100%",
                maxHeight: "550px"}}
          />
  
          <Carousel.Caption style={{backgroundColor: "#242424", opacity: "80%"}}>
            <h3>Lebih mudah. Lebih pasti.</h3>
            <p>
              Booking kamar segera dengan mendaftarkan akun anda!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}
