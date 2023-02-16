import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Chart from "../components/Chart/Chart";
import { ChartData } from "../components/Chart/ChartData";
import Table from "../components/Table/Table";
import { TableData } from "../components/Table/TableData";

const LeftDiv = styled.div`
  flex: 1;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 20px;
  position: relative;
`;

const EditButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  font-size: 12px;
  color: #7451f8;
  background-color: #7551f818;
  cursor: pointer;
  border-radius: 0px 0px 0px 5px;
`;

const BottomDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 20px;
  margin: 10px 20px;
`;
const baseURL = "https://dummyjson.com/users/";
const Single = () => {

  const [post, setPost] = useState(null);
  let { userId } = useParams();
  let  Editpath=`/users/edit/${userId}`;
  // console.log("userId::::",userId)
  const [userdetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    address: "",
    city: "",
    ein: "",
  });
  const getData = async () => {
    const user = await axios.get(`https://dummyjson.com/users/${userId}`);
    // console.log(user.data)
    setPost(user.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
        <LeftDiv>
          <EditButton><Link to={Editpath}>Edit</Link></EditButton>
          <h1
            style={{
              fontSize: "16px",
              color: "lightgray",
              marginBottom: "20px",
            }}
          >
            Information
          </h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <img
              // src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              src={post && post.image}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <h1 style={{ marginBottom: "10px", color: "#555" }}>
                {post && `${post.firstName} ${post.lastName}`}
              </h1>
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    marginRight: "5px",
                  }}
                >
                  Email:
                </span>
                <span style={{ fontWeight: "300" }}> {post && post.email}</span>
              </div>
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    marginRight: "5px",
                  }}
                >
                  Phone:
                </span>
                <span style={{ fontWeight: "300" }}>{post && post.ein}</span>
              </div>
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    marginRight: "5px",
                  }}
                >
                  Address:
                </span>
                <span style={{ fontWeight: "300" }}>
                  {" "}
                  {post && post.address.address}
                </span>
              </div>
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    marginRight: "5px",
                  }}
                >
                  Country:
                </span>
                <span style={{ fontWeight: "300" }}>
                  {post && post.address.city}
                </span>
              </div>
            </div>
          </div>
        </LeftDiv>
        <div style={{ flex: 2 }}>
          <Chart
            aspect={3 / 1}
            title="User Spending ( Last 6 Months)"
            data={ChartData}
          />
        </div>
      </div>
      <BottomDiv>
        <h1 className="title">Last Transactions</h1>
        <Table rows={TableData} />
      </BottomDiv>
    </div>
  );
};

export default Single;
