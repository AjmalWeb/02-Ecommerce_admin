import styled from "styled-components";

const StatusDiv = styled.div`
  padding: 5px;
  border-radius: 5px;

  .available {
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(0, 128, 0, 0.05);
    color: green;
  }
  .not-available {
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(255, 217, 0, 0.05);
    color: goldenrod;
  }
 
`;
export const productTitle={
  title:"Add New Product",
  newpath:"/Products/new",
  singlepath:"/Products" 
}

export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={params.row.img}
            alt="avatar"
          />
          {params.row.Productname}
        </div>
      );
    },
  },
 
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <StatusDiv>
          <span className={params.row.status==="available"?"available":"not-available"}>{params.row.status}</span>
        </StatusDiv>
      );
    },
  },
];

//temporary data
export const productRows = [
  {
    id: 1,
    Productname: "Iphone",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
  },
  {
    id: 2,
    Productname: "Samsung",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
   },
  {
    id: 3,
    Productname: "MI Phone",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "not available",
  },
  {
    id: 4,
    Productname: "Lenovo",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "not available",
  },
  {
    id: 5,
    Productname: "Redmi",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
    
  },
  {
    id: 6,
    Productname: "Realme",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
    
  },
  {
    id: 7,
    Productname: "Micromax",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
    
  },
  {
    id: 8,
    Productname: "Nothing",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
    
  },
  {
    id: 9,
    Productname: "Boat",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
    
  },
  {
    id: 10,
    Productname: "LenseCart",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "available",
    
  },
];
