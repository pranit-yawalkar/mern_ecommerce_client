import { BiGift, BiSupport } from "react-icons/bi";
import { TbDiscount2, TbTruckDelivery } from "react-icons/tb";
import laptop from "../assets/images/laptop.jpg";
import laptop2 from "../assets/images/laptop2.jpg";
import instrument from "../assets/images/instrument.jpg";
import food from "../assets/images/food.jpg";

export const services = [
  {
    title: "Free Shipping",
    tagline: "For all orders above ₹500",
    icon: <TbTruckDelivery size={50} />,
  },
  {
    title: "Affortable Price",
    tagline: "Get affortable deals.",
    icon: <TbDiscount2 size={50} />,
  },
  {
    title: "24/7 Support",
    tagline: "Get your queries resolved.",
    icon: <BiSupport size={50} />,
  },
  {
    title: "Daily Surprise Offers",
    tagline: "Save upto 25% on your shopping.",
    icon: <BiGift size={50} />,
  },
];

export const homeImages = [
  {
    img: laptop,
    alt: "laptop",
  },
  {
    img: laptop2,
    alt: "laptop2",
  },
  {
    img: instrument,
    alt: "instrument",
  },
  {
    img: food,
    alt: "food",
  },
];
