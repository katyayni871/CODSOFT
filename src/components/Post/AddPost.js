import { useState } from "react";
import { useFormik } from "formik";
import "./Post.css";
import { SERVER_URL } from "../../utils/helper";

const AddPost = () => {
  const [file, setFile] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      imageFile: "",
    },
    onSubmit: (values) => {
      //   values.file = file;
      // values.file = file;
      upload(values);
    },
  });

  const upload = async (data) => {
    const response = await fetch(SERVER_URL + "/api/v1//posts/create?", {
      method: "POST",
      body: data,
    });

    const responseData = await response.json();
    console.log(responseData);
  };

  const handleChanges = (e) => {
    console.log(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(file);
    // let reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0].File);
    // reader.onload = () => {
    //   setFile(reader.result);
    // };
  };

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
            {file ? <img src={file} height={"100px"} /> : null}
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
