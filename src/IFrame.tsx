import type { FC, CSSProperties } from "react";
import { useRef } from "react";

interface IFrameProps {
  src: string;
  title: string;
  height?: number;
  style?: CSSProperties;
  showFullscreenButton?: boolean;
}

const IFrame: FC<IFrameProps> = ({
  src,
  title,
  height,
  style,
  showFullscreenButton = true,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleFullscreen = () => {
    const el = wrapperRef.current;
    if (!el) return;

    const anyEl = el as any;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (anyEl.webkitRequestFullscreen) {
      anyEl.webkitRequestFullscreen();
    } else if (anyEl.mozRequestFullScreen) {
      anyEl.mozRequestFullScreen();
    } else if (anyEl.msRequestFullscreen) {
      anyEl.msRequestFullscreen();
    }
  };

  return (
    <div
      className="iframe-wrapper"
      style={{ ...(height != null ? { height } : {}), ...style }}
      ref={wrapperRef}
    >
      {showFullscreenButton && (
        <button
          type="button"
          className="iframe-fullscreen-btn"
          onClick={handleFullscreen}
        >
          Fullscreen
        </button>
      )}
      <iframe
        src={src}
        title={title}
        className="iframe-content"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
};

export default IFrame;
