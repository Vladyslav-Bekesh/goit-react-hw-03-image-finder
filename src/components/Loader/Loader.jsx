import { CirclesWithBar } from 'react-loader-spinner';

function LoaderSpinner() {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%)',
      }}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"
    ></CirclesWithBar>
  );
}

export default LoaderSpinner;
