import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authApi } from "../hooks/axios_api";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import profile from "../assets/images/Profile.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { userInputs } from "../formSource";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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

const UserEdit = () => {
	const title = "Edit User";
	const inputs = userInputs;
	const [loading,setLoading]=useState(false)
	
	const [loaded, setLoaded] = useState(false);
	let { userId } = useParams();
	const [image, setImage] = useState("");
	const [state, setState] = useState({
		fullname: "",
		phone: "",
		email: "",
	});
	const navigate = useNavigate();

	const onChangeEvent = (event) => {
		const { name, value } = event.target;
		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		const getUser = async () => {
			try {
				const url = `users/${userId}`;
				authApi
					.get(url)
					.then((res) => {
						console.log("user res::", res.data.user);
						const user = res.data.user;
						setState({
							fullname: user.fullname,
							phone: user.phone,
							email: user.email,
						});
						setRole(user.role_id);
						const img=user.image
						if (img){
							console.log("img::",img)
						const file=img.split("Images")
						console.log(file[1]);
						const file1=file[1].split("\\")
						console.log("file1:::",file1)
						const imagefile='Images/'+file1[1]
						console.log(imagefile)
					
						 const image=`http://localhost:4000/${imagefile}`	
						 console.log("image:::",image)
						setImage(image);
						}else{

								setImage(profile)
						}

						
						setLoaded(true);
					})
					.catch((error) => {
						console.log("error user", error);
					});
			} catch (error) {
				console.log("error in fetching userdata", error);
			}
		};
		getUser();
	}, []);

	const adduserHandler = async (e) => {
		e.preventDefault();
		const { fullname, phone, email} = state;

		const formData = {
			fullname,
			phone,
			email,
			
			image,
			role_id: role,
		};

		try {
			setLoading(true)
			const url = `users/${userId}`;
			await authApi
				.put(url, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					console.log("res::::", res.data.user);
					navigate("/Users");
					setLoading(false)
				})
				.catch((error) => {
					console.log("apierror", error.response.data);
					setLoading(false)
				});
		} catch (error) {
			console.log("error on signining in 2 try :: ", error.response.data);
			setLoading(false)
		}
	};
	// console.log(state)
	const [role, setRole] = useState("");

	const handleChange = (event) => {
		setRole(event.target.value);
	};

	const [update,setUpdate]=useState(false)
	const imageUpload=(e)=>{
		setImage(e.target.files[0])
		setUpdate(true)
	}



	return (
		<div>
			{loaded ? (
				<div>
					<TopDiv>
						<h1 style={{ color: "lightgray", fontSize: "20px" }}>
							{title}
						</h1>
					</TopDiv>
					<BottomDiv>
						<div style={{ flex: 1, textAlign: "center" }}>
							<img
								src={
									 // "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
									// image
								 	//   ? URL.createObjectURL(image)
									//   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
									update?URL.createObjectURL(image):image
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
							<form
								onSubmit={adduserHandler}
								encType="multipart/form-data"
							>
								<div className="formInput">
									<label htmlFor="file">
										Image:{" "}
										<DriveFolderUploadOutlinedIcon className="icon" />
									</label>
									<input
										type="file"
										name="image"
										id="file"
										accept="image/*"
										filename={image}
										// onChange={(e) =>
										// 	setImage(e.target.files[0])
										// }
										onChange={imageUpload}
										style={{ display: "none" }}
									/>
								</div>

								<div className="formInput">
									<label>Username</label>
									<input
										type="text"
										name="fullname"
										value={state.fullname}
										onChange={onChangeEvent}
									/>
								</div>
								<div className="formInput">
									<label>Email</label>
									<input
										type="mail"
										name="email"
										value={state.email}
										onChange={onChangeEvent}
									/>
								</div>
								<div className="formInput">
									<label>Phone</label>
									<input
										type="text"
										name="phone"
										value={state.phone}
										onChange={onChangeEvent}
									/>
								</div>

								<FormControl
									sx={{ m: 1, minWidth: 120 }}
									size="small"
								>
									<InputLabel id="demo-select-small">
										Role
									</InputLabel>
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
			) : (
				 <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!loaded}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
			)}
 		<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

		</div>
	);
};

export default UserEdit;
