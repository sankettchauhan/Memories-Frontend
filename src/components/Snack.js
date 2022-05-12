export default function Snack({ show, type, message, setSnack, classes }) {
  if (!show) return <></>;
  setTimeout(() => setSnack({ show: false, type: "", message: "" }), 3000);
  return (
    <div
      className={`${
        type === "error" ? "bg-red-700" : "bg-green-700"
      } text-white py-2 px-[6px] text-sm absolute w-full text-center ${classes}`}
    >
      {message}
    </div>
  );
}
