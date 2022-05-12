export default function Card({
  title,
  description,
  isPrivate,
  image,
  user,
  state,
}) {
  const API_URL = process.env.REACT_APP_API_URL;
  const imageURL = `${API_URL}/file/${image}`;

  return (
    <div
      className={`border-[1px] border-[color:var(--secondary-color)] mt-16 relative overflow-hidden p-0 outline-0`}
    >
      {state.personal && isPrivate && (
        <h1 className="absolute font-light px-16 text-center text-[color:var(--yellow-color)] bg-[color:var(--secondary-color)] top-5 -left-[50px] -rotate-45">
          Private
        </h1>
      )}

      <div className={`${image && "flex flex-col md:flex-row"}`}>
        {image && (
          <div className="basis-1 grow flex justify-center">
            <img
              src={imageURL}
              alt={title}
              className="h-100 w-100 object-contain"
            />
          </div>
        )}
        <div
          className={`${image && "basis-1 grow flex flex-col justify-center"}`}
        >
          <h1
            className={`text-center uppercase font-bold mb-4 text-3xl md:text-4xl ${
              image ? "mt-8" : "mt-16"
            } md:mt-8`}
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {title}
          </h1>
          {description && (
            <h1
              style={{ fontFamily: "var(--font-architect)" }}
              className="text-xl md:text-2xl mb-8 px-4 md:px-16"
            >
              {description}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
