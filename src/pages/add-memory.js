import { useState } from "react";
import { getToken } from "../util/localStorage.util";
import { createMemory, uploadImage } from "../axios/requests.axios";

export default function AddMemory() {
  const [memory, setMemory] = useState({
    title: "",
    image: "",
    description: "",
    isPrivate: false,
  });
  const [imageURI, setImageURI] = useState(null);

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURI(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    readURI(e); // maybe call this with webworker or async library?
    // if (this.props.onChange !== undefined)
    //   this.props.onChange(e); // propagate to parent component
    const image = e.target.files[0];
    try {
      let formData = new FormData();
      formData.append("file", image);
      const res = await uploadImage(formData);
      const {
        data: { filename },
      } = res;
      setMemory((oldState) => ({ ...oldState, image: filename }));
    } catch (err) {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title"
        name="title"
        value={memory.title}
        onChange={handleChange}
      />
      <textarea
        placeholder="Enter description"
        name="description"
        value={memory.description}
        onChange={handleChange}
      />
      <input
        name="file"
        type="file"
        placeholder="Upload image"
        onChange={handleUpload}
      />
      {imageURI && (
        <div>
          <img src={imageURI} alt="uploaded" />
        </div>
      )}
      <label>
        <input
          type="checkbox"
          name="isPrivate"
          value={memory.isPrivate}
          onChange={handleCheck}
        />
        is private?
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
