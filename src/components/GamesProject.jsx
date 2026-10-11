import SlideCarousel from "./SlideCarousel";

const SLIDES = [
  {
    href: "https://spaceship-world.vercel.app/",
    label: "spaceShipScene",
    src: "https://ucarecdn.com/011fe87d-9aaf-4eed-b241-98d4de3a51eb/Captura%20de%20pantalla%202025-03-10%20123248.png",
    title: "3D Web Modeling in game",
    titleClass: "ThirdTitle",
    top: "mt-6",
  },
  {
    href: "https://car-world-nine.vercel.app/",
    label: "carScene",
    src: "https://ucarecdn.com/498569e7-3dcf-4f8e-90ae-3ad400046556/carScene.jpg",
    title: "3D Web Modeling in game",
    titleClass: "secondTitle",
    top: "mt-6",
  },
  {
    href: "https://lean-bunnies.vercel.app/",
    label: "LeanBunnies",
    src: "https://ucarecdn.com/a0888f77-078d-498f-817d-f8aa753e245f/462517862_593424179676389_809171719263095837_n.png",
    title: "Web Development Trivia Game",
    titleClass: "ThirdTitle",
    top: "mt-8",
  },
];

export default function GamesSwiper() {
  return <SlideCarousel slides={SLIDES} />;
}
