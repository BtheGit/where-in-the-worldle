import { useEffect, useRef } from "react";
import ZoomableStaticImage from "../ZoomableStaticImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/bundle";

export type CarouselProps = {
  previousGuesses: any[];
  images: any[];
};

export default function Carousel(props: CarouselProps) {
  const { previousGuesses, images } = props;
  const swiperRef: any = useRef(null);
  useEffect(() => {
    swiperRef.current.slideTo(previousGuesses.length);
  }, [previousGuesses]);
  return (
    <Swiper
      onSwiper={(s) => {
        swiperRef.current = s;
      }}
      navigation={true}
      modules={[Navigation]}
      allowTouchMove={false}
    >
      {images.slice(0, previousGuesses.length + 1).map((src, i) => (
        <SwiperSlide key={i}>
          <ZoomableStaticImage src={src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
