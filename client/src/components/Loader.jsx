import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ fullscreen = false, size = 40, message = "Loading..." }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-6 ${
        fullscreen ? "min-h-screen" : "h-full"
      } w-full gap-4`}
    >
      <CircularProgress size={size} />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default Loader;

