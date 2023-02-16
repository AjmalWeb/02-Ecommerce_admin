import Userlist from "../components/datatable/Datatable";
import { useState, useEffect } from "react";
import {
  userColumns,
  userRows,
  userTitle,
} from "../components/datatable/UserData";
import { authApi } from "../hooks/axios_api";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const List = () => {
  const [users, setUsers] = useState();
  const [loaded,setloaded]=useState(false)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const url = `users`;
        authApi
          .get(url)
          .then((res) => {
            console.log("user res::", res.data.users);
            const users = res.data.users;
            setUsers(users);
            setloaded(true)
          })
          .catch((error) => {
            console.log("error user", error);
          });
      } catch (error) {
        console.log("error in fetching userdata", error);
      }
    };
    getUsers();
  }, []);
console.log("row::::",typeof(users))
  return (
    <div>
      {loaded?<Userlist row={users} column={userColumns} title={userTitle} />:<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!loaded}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
    </div>
    )
};

export default List;
