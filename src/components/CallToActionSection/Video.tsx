import cn from '@lib/utils';

type VideoProps = {
  className: string;
};

const Video = ({ className }: VideoProps) => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={cn('object-cover', className)}
    >
      <source src="/callToAction.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
