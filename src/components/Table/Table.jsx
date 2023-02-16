import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableDiv = styled.div`
    .image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
    }

    .Approved {
      padding: 5px;
      border-radius: 5px;
      color: green;
      background-color: rgba(0, 128, 0, 0.151);
    }
    .Pending {
      padding: 5px;
      border-radius: 5px;
      color: goldenrod;
      background-color: rgba(74, 66, 0, 0.1);
      // background-color: rgba(189, 189, 3, 0.103);
    }
  `;

const List = ({rows}) => {
  return (
    <TableDiv>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Tracking ID</TableCell>
              <TableCell >Product</TableCell>
              <TableCell >Customer</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Payment Method</TableCell>
              <TableCell >Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >{row.id}</TableCell>
                <TableCell >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={row.img} alt="" className="image" />
                    {row.product}
                  </div>
                </TableCell>
                <TableCell >{row.customer}</TableCell>
                <TableCell >{row.date}</TableCell>
                <TableCell >{row.amount}</TableCell>
                <TableCell >{row.method}</TableCell>
                <TableCell >
                  <span className={`${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableDiv>
  );
};

export default List;
