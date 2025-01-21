const backgroundImageUrl = encodeURI(
  "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1542599884868-SFFU9JSBMW3PTTSDYEQS/1.png?format=2500w"
);

export default function HeroSection() {
  return (
    <div
      className="hero min-h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    ></div>
  );
}
