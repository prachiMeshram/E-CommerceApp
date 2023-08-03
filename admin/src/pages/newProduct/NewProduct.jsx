import { useState } from "react";
import "./newProduct.css";
import axios from "axios";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [imgTitle, setImgTitle] = useState("");
  const [imgSm, setImgSm] = useState("");
  const [trail, setTrail] = useState("");
  const [vid, setVid] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(18);
  const [genre, setGenre] = useState("");
  const [isSeries, setIsSeries] = useState(false);

  var openFile = function (file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById("output");
      output.src = dataURL;
      setImg(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

  //   const MovieSchema = new mongoose.Schema(
  //     {
  //         title: { type: String, required: true, unique: true},
  //         desc: { type: String },
  //         img: { type: String },
  //         imgTitle: { type: String },
  //         imgSm: { type: String },
  //         trailer: { type: String },
  //         video: { type: String },
  //         year: { type: String },
  //         limit: { type: Number },
  //         genre: { type: String },
  //         isSeries: { type: Boolean, default: false},
          
  //     }, 
  //     {timestamps: true}
  // );

    try {
      const res = await axios.post("http://localhost:8000/api/addmovie", {
        title,
        desc,
        img,
        imgTitle,
        imgSm,
        trail,
        vid,
        year,
        limit,
        genre,
        isSeries,
      });

      console.log(res.data);

      setTitle("");
      setDesc("");
      setImg("");
      setImgTitle("");
      setImgSm("");
      setTrail("");
      setVid("");
      setYear("");
      setLimit(18);
      setGenre("");
      setIsSeries(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleFormSubmit}>
        <div className="productFormLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Image Title</label>
            <input
              type="text"
              placeholder="Image Title"
              value={imgTitle}
              onChange={(e) => setImgTitle(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="enter desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>IsSeries</label>
            <select
              name="active"
              id="active"
              value={isSeries}
              onChange={(e) => setIsSeries(e.target.value === "yes")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="2023"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Limit</label>
            <input
              type="number"
              placeholder="20"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </div>

        <div className="productFormRight">
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Action"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => openFile(e)}
            />
          </div>
          {/* <div className="addProductItem">
            <label>Image Small </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </div>

          <div className="addProductItem">
            <label>Trailer </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setTrail(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Video </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setVid(e.target.files[0])}
            />
          </div> */}
          <button type="submit" className="addProductButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
