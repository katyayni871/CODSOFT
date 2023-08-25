import { useState } from "react";
import { useFormik } from "formik";
import "./Post.css";
import { SERVER_URL } from "../../utils/helper";
import axios from "axios";

const AddPost = () => {
  const [file, setFile] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      imageUrl: "",
    },
    onSubmit: (values) => {
      //   values.file = file;
      // values.file = file;
      values.imageUrl = imageUrl;
      // values = JSON.stringify(values);

      upload(values);
    },
  });

  const upload = (values) => {
    const form = new FormData();
    form.append("title", values.title);
    form.append("body", values.body);
    form.append("imageUrl", values.imageUrl);

    fetch("http://localhost:4000/api/v1/posts/create", {
      method: "POST",
      body: form,
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  const handleChanges = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);

    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "blogging");
    data.append("cloud_name", "dppkwpi0p");

    fetch("https://api.cloudinary.com/v1_1/dppkwpi0p/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImageUrl(data.secure_url);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {};

  return (
    <div className="wrapper-post">
      <div className="add-post">
        <h3 className="post-head">Add Post</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-fields">
            <label>Title</label>
            <input
              className="input"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Title"
            />
          </div>
          <div className="input-fields">
            <label>Body</label>
            <textarea
              className="input input-body"
              id="body"
              name="body"
              onChange={formik.handleChange}
              value={formik.values.body}
              placeholder="Body"
            />
          </div>
          <div className="img-add">
            <p>Add Image</p>
            <input type="file" name="photo" onChange={handleChanges} />
            {file ? (
              <div>
                <img src={imageUrl} height={"100px"} />
              </div>
            ) : null}
          </div>
          <button className="button-64" type="submit">
            <span className="text">Publish</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddPost;
