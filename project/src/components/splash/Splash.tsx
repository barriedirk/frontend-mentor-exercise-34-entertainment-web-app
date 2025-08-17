import "./Splash.css";

export default function Splash() {
  return (
    <div className="splash-wrapper">
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/the-white-cat.png`}
        alt="logo The Black Cat"
      />
    </div>
  );
}
