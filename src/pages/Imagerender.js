import Slider from "react-draggable-slider";

const Imagerender = () => {
  const projectList = [
    {
      title: "Cutting Edge Project",
      image: "https://source.unsplash.com/collection/347317/",
      description: "Praesent quis congue nisi...",
    },
    {
      title: "Featured Artist 3D",
      image: "https://source.unsplash.com/collection/3573299/",
      description: "Duis at tellus vitae velit aliquet varius...",
    },
  ];

  const sliderSettings = {
    data: projectList,
    speed: 3000,
    easing: "elastic",
    bgColor: "rgba(255, 255, 255, 0.05)",
    buttonHref: "https://www.google.com",
    buttonTarget: "_self",
    buttonText: "View project",
    showButton: true,
  };
  return (
    <div>
      <Slider sliderSettings={sliderSettings} />;
    </div>
  );
};

export default Imagerender;
