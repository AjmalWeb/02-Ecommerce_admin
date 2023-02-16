import Productlist from "../components/datatable/Datatable";
import {
  productColumns,
  productRows,
  productTitle,
} from "../components/datatable/ProductDatanew";

const List = () => {
  return (
    <Productlist
      row={productRows}
      column={productColumns}
      title={productTitle}
    />
  );
};

export default List;
