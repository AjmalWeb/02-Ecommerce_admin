import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "./UserData";
import { Link } from "react-router-dom";
import { useState } from "react";

const TitleDiv = styled.div`
  width: 100%;
  font-size: 24px;
  color: gray;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AddLink = styled(Link)`
  text-decoration: none;
  color: green;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid green;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const ViewButton = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: darkblue;
  border: 1px dotted rgba(0, 0, 139, 0.596);
  cursor: pointer;
`;
const DeleteButton = styled(ViewButton)`
  color: crimson;
`;

const EditButton = styled(ViewButton)`
  color: green;
`;
const Datatable = ({row,column,title,type}) => {
  console.log("row::::",typeof(row))
  const [data, setData] = useState(row);
  let path
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Link to={`${title.singlepath}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <ViewButton>View</ViewButton>
            </Link>
             <Link to={`${title.editpath}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteButton onClick={() => handleDelete(params.row.id)}>
              Delete
            </DeleteButton>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: "600px", padding: "20px 45px 20px 45px" }}>
      <TitleDiv>
        {title.title}
        <AddLink to={title.newpath}>
          Add New
        </AddLink>
      </TitleDiv>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={column.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
