import { useState } from "react";
import { getToken } from "../util/localStorage.util";
import { createMemory, uploadImage } from "../axios/requests.axios";
import { useNavigate } from "react-router-dom";
import Snack from "../components/Snack";

export default function AddMemory() {
  const [memory, setMemory] = useState({
    title: "",
    image: "",
    description: "",
    isPrivate: false,
  });
  const [imageURI, setImageURI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ show: false, type: "", message: "" });

  const navigate = useNavigate();

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURI(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleError = (message) =>
    setSnack({
      type: "error",
      message: message || "Something went wrong",
      show: true,
    });

  const handleUpload = async (e) => {
    setLoading(true);
    readURI(e);
    const image = e.target.files[0];
    try {
      let formData = new FormData();
      formData.append("file", image);
      const res = await uploadImage(formData);
      const {
        data: { filename },
      } = res;
      setMemory((oldState) => ({ ...oldState, image: filename }));
      setLoading(false);
    } catch (err) {
      handleError("The file was not uploaded. Something went wrong.");
      console.log(err);
    }
  };

  const handleChange = (e) =>
    setMemory((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));

  const handleCheck = (e) =>
    setMemory((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.checked,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...Object.fromEntries(
        Object.entries(memory).filter(([_, v]) => v !== "")
      ),
    };
    try {
      const res = await createMemory(data, getToken());
      console.log(res);
      navigate("/");
    } catch (error) {
      handleError("Please enter the title and description to create a memory.");
      console.log(error);
    }
  };

  const inputClassNames =
    "bg-transparent border-[1px] border-[color:var(--secondary-color)] placeholder:[color:var(--secondary-color)] p-4 rounded-xl text-xl mb-6";

  return (
    <>
      <div className="relative">
        {snack && (
          <Snack {...snack} setSnack={setSnack} classes="top-[30px] px-0" />
        )}
        <div className="flex flex-col md:flex-row bg-white h-full grow px-4 md:px-56">
          <div className="basis-1 grow grid place-content-center">
            <h1
              className="text-7xl mt-4 md:mt-0 text-center"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              Create Memory
            </h1>
          </div>
          <div className="basis-1 grow">
            <form
              className="flex flex-col justify-center h-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Enter title of the memory"
                name="title"
                value={memory.title}
                onChange={handleChange}
                className={`${inputClassNames} mt-8`}
              />
              <textarea
                placeholder="Enter description of the memory"
                name="description"
                value={memory.description}
                onChange={handleChange}
                className={inputClassNames}
              />
              {imageURI && (
                <div>
                  <img src={imageURI} alt="uploaded" />
                </div>
              )}
              <div className={`${imageURI && "mt-8"} mb-8 `}>
                <label
                  htmlFor="file"
                  className={`border-[1px] border-[color:var(--secondary-colr)] p-2 rounded-lg`}
                >
                  {loading ? "Uploading..." : "Upload image to memory"}
                </label>
                <input
                  name="file"
                  type="file"
                  placeholder="Upload image"
                  id="file"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="isPrivate"
                  value={memory.isPrivate}
                  onChange={handleCheck}
                  className="h-5 w-5"
                  id="isPrivate"
                />
                <label
                  htmlFor="isPrivate"
                  className="ml-2 text-lg cursor-pointer"
                >
                  Is it a private memory?
                </label>
              </div>
              <button
                type="submit"
                className="inline-block border-[1px] border-[color:var(--secondary-colr)] rounded-lg w-[fit-content] px-4 py-1 mb-8 uppercase disabled:opacity-10"
                disabled={loading}
              >
                {loading ? "Image is uploading. Please wait." : "Create memory"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
