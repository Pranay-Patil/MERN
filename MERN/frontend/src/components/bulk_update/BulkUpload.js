import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import UploadedProducts from "./UploadedProducts";
import axios from "axios";




const BulkUpload = () => {
  //State to store the values
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Parsed Data Response in array format
        setProducts(results.data);
      },
    });
  };

  const handleClick = async () => {
    await axios
      .post("http://localhost:3008/bulkupdate", products)

  };

  return (
    <div>
      <div className="bulk-upload">
          <input onChange={changeHandler} name="file" class="form-control form-control-sm" id="formFileSm" accept=".csv" type="file"/>
          <NavLink to='/products'><button className="btn btn-outline-dark" onClick={handleClick}>
          Upload Products</button></NavLink>
      </div>
      <br />
      <br />
      <UploadedProducts products={products} />
    </div>
  );
};

export default BulkUpload;
