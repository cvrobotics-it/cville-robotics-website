const backgroundImageUrl = encodeURI(
  "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1542599884868-SFFU9JSBMW3PTTSDYEQS/1.png?format=2500w"
);

export default function HeroSection() {
  return (
    <div
      className="hero min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    ></div>
  );
}
