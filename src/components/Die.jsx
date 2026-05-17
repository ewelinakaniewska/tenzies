export default function Die(props) {
  return (
    <button
      className={
        (props.isHeld ? "bg-[#59E391] " : "bg-white ") +
        "aspect-square font-bold text-[1.29rem] text-[#2B283A] rounded-[4px] shadow-md/15 cursor-pointer font-[Karla]"
      }
      onClick={() => {
        props.hold(props.id);
      }}
      aria-label={`Die with a value of ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
      aria-pressed={props.isHeld}
    >
      {props.value}
    </button>
  );
}
