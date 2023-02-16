import styled from "styled-components";
import { authApi } from "../hooks/axios_api";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useNavigate } from 'react-router-dom';

const TopDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 10px;
  margin: 20px;
  display: flex;
`;
const BottomDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 10px;
  margin: 20px;
  display: flex;
`;
const RightDiv = styled.div`
 flex: 2;

        form {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: space-around;

          .formInput {
            width: 40%;

            label {
              display: flex;
              align-items: center;
              gap: 10px;

              .icon {
                cursor: pointer;
              }
            }

          input {
            width: 100%;
            padding: 5px;
            border: none;
            border-bottom: 1px solid gray;
          }

`;

const Button = styled.button`
  width: 150px;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

const New = ({ inputs, title }) => {
  const [image, setImage] = useState('')
  const [state, setState] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });
 const navigate = useNavigate();
  const onChangeEvent = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const adduserHandler = async (e) => {
    e.preventDefault();
    const { fullname, phone, email, password } = state;
    
    const formData = {
      fullname,
      phone,
      email,
      password,
      image,
      role_id:role
    };

    try {
      const url = "users";
      await authApi
        .post(url, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        .then((res) => {
          console.log("res::::", res.data.user);
         navigate('/Users')
        })
        .catch((error) => {
          console.log("apierror", error.response.data);
        });
    } catch (error) {
      console.log("error on signining in 2 try :: ", error.response.data);
    }
  };
  // console.log(state)
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <TopDiv>
        <h1 style={{ color: "lightgray", fontSize: "20px" }}>{title}</h1>
      </TopDiv>
      <BottomDiv>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <RightDiv>
          <form onSubmit={adduserHandler} encType="multipart/form-data">
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                name="image"
                id="file"
                accept="image/*"
                filename={image} 
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  onChange={onChangeEvent}
                  placeholder={input.placeholder}
                />
              </div>
            ))}

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Role</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={role}
                label="Role"
                onChange={handleChange}
              >
               
                <MenuItem value={1}>admin</MenuItem>
                <MenuItem value={2}>user</MenuItem>
              </Select>
            </FormControl>
            <Button>Send</Button>
          </form>
        </RightDiv>
      </BottomDiv>
    </div>
  );
};

export default New;
