
const Loading = () => {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="w-[60%] h-[80%] rounded-lg flex items-center bg-black
          bg-opacity-50 backdrop-blur-sm flex-col"
        >
         <div className='w-[50%] h-[60%] bg-load-bg bg-cover bg-center'></div>
         <div className='text-white flex flex-col items-center gap-4'>
            <p className='text-2xl'>Detecting your loaction</p>
            <p className='text-lg text-center px-[15%]'>Your current location will be displayed in the app and will be used to fetch real-time weather data</p>
         </div>
         
        </div>
      </div>
    );
  };
  
  export default Loading;
  