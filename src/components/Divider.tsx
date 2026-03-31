export default function Divider() {
  const dynamicBgStyle = {
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
  };
  return (
    <div
      className="h-0.25 w-full relative left-0 mt-10 "
      style={dynamicBgStyle}
    ></div>
  );
}
