import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const FeaturedDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 10px;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: gray;
`;

const BottomDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // gap: 15px;
`;

const SummaryDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const ItemresultDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;

  & .positive {
    color: green;
  }
  & .neg {
     color: red;
  }
`;

const Featured = (props) => {
  
  let FeaturedData = [props.item[0]];
 
  return (
    <FeaturedDiv>
      <TopDiv>
        <h1 style={{ fontSize: "16px", fontWeight: "500" }}>Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </TopDiv>

      {FeaturedData.map((item, index) => {
       
        return (
          <BottomDiv key={index}>
            {item.Chart.map((item, index) => {
              return (
                <div key={index}>
                  <div   style={{ width: "100px", height: "100px" }}>
                    {/* <CircularProgressbar value={70} text={"70%"} strokeWidth={5} /> */}

                    <CircularProgressbar
                      value={item.value}
                      text={item.text}
                      strokeWidth={item.width}
                    />
                  </div>
                  <div style={{textAlign:"center"}}>
                    <p style={{ fontWeight: "500", color: "gray" }}>
                      Total sales made today
                    </p>
                    <p style={{ fontSize: "30px" }}>${item.amount}</p>
                    <p
                      style={{
                        fontWeight: "300",
                        fontSize: "12px",
                        color: " gray",
                        textAlign: "center",
                      }}
                    >
                      Previous transactions processing. Last payments may not be
                      included.
                    </p>
                  </div>
                </div>
              );
            })}
            <SummaryDiv>
              {item.Data.map((item, index) => {
              

                return (
                  <div key={item.id} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "14px", color: "gray" }}>
                      {item.title}
                    </div>
                    <ItemresultDiv>
                      <KeyboardArrowDownIcon fontSize="small" />
                      <div
                        className={Number(item.amount.split('.')[0]) > 0 ? "positive" : "neg"}
                      >
                        $ {item.amount}
                      </div>
                    </ItemresultDiv>
                  </div>
                );
              })}
            </SummaryDiv>
          </BottomDiv>
        );
      })}
    </FeaturedDiv>
  );
};

export default Featured;
