import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row">
      <div className="flex-1 p-5 flex flex-col gap-3">
        <h1 className="text-2xl font-bold tracking-wide">SHOP</h1>
        <p className="w-4/5 text-gray-600">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full bg-[#3B5999] text-white flex items-center justify-center cursor-pointer">
            <FacebookIcon fontSize="small" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E4405F] text-white flex items-center justify-center cursor-pointer">
            <InstagramIcon fontSize="small" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#55ACEE] text-white flex items-center justify-center cursor-pointer">
            <TwitterIcon fontSize="small" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center cursor-pointer">
            <PinterestIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-5 hidden md:block">
        <h3 className="text-lg font-semibold !mb-5">Useful Links</h3>
        <ul className="flex flex-wrap gap-4">
          {[
            "Home",
            "Cart",
            "Man Fashion",
            "Woman Fashion",
            "Accessories",
            "My Account",
            "Order Tracking",
            "Wishlist",
          ].map((item, index) => (
            <li
              key={index}
              className="w-[40%] cursor-pointer hover:underline text-sm text-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-5 bg-[#fff8f8] flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Contact</h3>
        <div className="flex items-center text-sm text-gray-700">
          <LocationOnIcon fontSize="small" />
          622 Dixie Path , South Tobinchester 98336
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <PhoneIcon fontSize="small" />
          +1 234 56 78
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <MailOutlineIcon fontSize="small" />
          seiif.dev@gmail.com
        </div>
        <img
          className="w-1/2"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt="Payment methods"
        />
      </div>
    </footer>
  );
};

export default Footer;
