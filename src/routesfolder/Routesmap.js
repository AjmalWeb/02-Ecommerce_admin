import MainLayout from "../layoutfolder/MainLayout";
import PublicLayout from "../layoutfolder/PublicLayout";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashboardHome from "../pages/DashboardHome";
import Userslist from "../pages/Userslist";
import Productslist from "../pages/Productslist";
import SingleUser from "../pages/SingleUser";
import SingleProduct from "../pages/SingleProduct";
import Imagerender from "../pages/Imagerender";
import New from "../pages/New";
import { productInputs, userInputs } from "../formSource";
import Dashboard_user from "../pages/Dashboard_user";
import SingleProductnew from "../pages/SingleProductnew";
import UserEdit from "../pages/UserEdit";

import ProductImages from "../pages/ProductImages";

const Routesmap = () => {
  const { loginStatus } = useSelector((state) => state.loginActions);
  // let loginStatus = true;

  const navigate = useNavigate();

  return loginStatus === true ? (
    <MainLayout>
      <Routes>
        <Route path="/DashboardHome" element={<DashboardHome />}></Route>
        <Route path="/Users" element={<Userslist />}></Route>
        <Route path="/Users/:userId" element={<SingleUser />}></Route>
        <Route
          path="/Users/new"
          element={<New inputs={userInputs} title="Add New User" />}
        />
        <Route path="/users/edit/:userId" element={<UserEdit />} />

        <Route path="/Products" element={<Productslist />}></Route>
        {
          <Route
            path="/Products/:productId"
            element={<SingleProduct />}
          ></Route>
        }
        {/*  <Route
          path="/Products/:productId"
          element={<SingleProductnew />}
         ></Route> */}
        <Route
          path="/Products/new"
          element={<New inputs={productInputs} title="Add New Product" />}
        />
        <Route path="/UserHome" element={<Dashboard_user />}></Route>
        {/* <Route path="sample" element={<Navigate to="/" />} /> */}
       
      </Routes>
    </MainLayout>
  ) : (
    <PublicLayout>
      {/* public routes and Route use here */}

      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>

        {/* <Route path="*" element={<Navigate to="pagenotfound" />} /> */}
        <Route path="*" element={<Navigate to="login" />} />
        <Route path="/" element={<Navigate to="login" />} />
      </Routes>
    </PublicLayout>
  );
};

export default Routesmap;
