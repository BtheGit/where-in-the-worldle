import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ZoomableStaticImage({ src }: { src: string }) {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img className="image-clue" alt="" src={src} />
      </TransformComponent>
    </TransformWrapper>
  );
}
