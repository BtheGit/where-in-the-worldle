import { useEffect, useRef } from "react";
import ZoomableStaticImage from "../ZoomableStaticImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/bundle";

export type CarouselProps = {
  previousGuesses: any[];
  images: any[];
  isFinished: boolean;
};

export default function Carousel(props: CarouselProps) {
  const { previousGuesses, images, isFinished } = props;
  const swiperRef: any = useRef(null);
  const imageList = isFinished
    ? images
    : images.slice(0, previousGuesses.length + 1);
  useEffect(() => {
    // swiperRef.current.slideTo(previousGuesses.length);
    swiperRef.current.slideTo(imageList.length);
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
      {imageList.map((src, i) => (
        <SwiperSlide key={i}>
          <ZoomableStaticImage src={src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
