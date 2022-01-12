
const Spinner = ({message}: {message: string}) => {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00BFFF] m-5 p-4">
          <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-[#00BFFF] " />
        </div>
        <p className="text-lg text-center px-2">{message}</p>
      </div>
    );
}

export default Spinner
