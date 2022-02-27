import { Link, useLocation, useNavigate } from "react-router-dom";
import "./editproductdashboard.css";
import Chart from "../../../component/adminPanel/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import app from "../../../firebase";
import { updateProduct } from "../../../redux/apiCalls";
import { useEffect, useMemo, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { userRequest } from "../../../requestMethod";
import Sidebar from "../../../component/adminPanel/sidebar/Sidebar";
import Topbar from "../../../component/adminPanel/topbar/Topbar";

export default function EditProduct() {
    const location = useLocation();
    const productId = location.pathname.split("/")[3];
    console.log(productId);
    const navigate = useNavigate();
  
    const product = useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
    );
  
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [inStock, setInStock] = useState();
  const [price, setPrice] = useState();


  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { title, desc, inStock, price, img: downloadURL, categories: cat };
          updateProduct(productId, product, dispatch);
          navigate("/admin/products");
        });
      }
    );
  };

  useEffect(() => {

    if(product){
      
      setTitle(product.title);
      setDesc(product.desc);
      setInStock(product.inStock);
      setPrice(product.price);
      setCat(product.categories);
      setFile(product.img)
    }
  },[product])

  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <div className="newProduct">
        <h1 className="addProductTitle">Edit Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <img src={file} alt="" className="productUploadImg" />
                  <label htmlFor="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
                  <p>* Mandatory to re-upload the file</p>
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              name="desc"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input type="text" placeholder="jeans,skirts" value={cat} onChange={handleCat} />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" onChange={(e) => setInStock(e.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button onClick={handleClick} className="addProductButton">
            Update
          </button>
        </form>
      </div>
    </div>
    </>
  );
}