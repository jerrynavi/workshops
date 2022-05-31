type SkeletonProps = {
  isLoaded?: boolean;
  children?: JSX.Element | string | (JSX.Element | string)[];
  size?: {
    width?: string;
    height?: string;
  } | null;
};

const Skeleton = ({ isLoaded, size, children }: SkeletonProps) => {
  const height = size?.height ? size.height : 'h-fit';
  const width = size?.width ? size.width : 'w-fit';

  return (
    <div
      className={`rounded-md relative inline-block overflow-hidden ${height} ${width} ${
        !isLoaded ? 'animate-pulse' : 'overflow-visible animate-none'
      }`}
    >
      <span className="sr-only">
        I am a visual cue to let you know that the application is busy.
      </span>
      <span
        className={`inline-block absolute top-0 left-0 w-full h-full bg-slate-500 ${
          isLoaded && 'w-0 h-0 hidden'
        }`}
      ></span>
      {children}
    </div>
  );
};

export default Skeleton;
