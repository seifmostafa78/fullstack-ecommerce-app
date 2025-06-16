import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
  return (
    <section className="h-[60vh] bg-[#fcf5f5] flex flex-col items-center justify-center px-4 gap-4">
      <h1 className="text-[70px] max-sm:text-[50px] font-bold text-center">
        Newsletter
      </h1>
      <p className="text-xl font-light text-center max-sm:text-base">
        Get timely updates from your favorite products.
      </p>
      <div className="flex w-1/2 max-sm:w-4/5 h-10 border border-gray-300 bg-white">
        <input
          type="email"
          placeholder="your email"
          className="flex-[8] pl-5 outline-none border-none text-sm bg-transparent"
        />
        <button className="flex-[1] bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition-colors">
          <SendIcon fontSize="small" />
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
