import { useDispatch } from "react-redux";
import { getCosmetics } from "../../redux/reducer";
import { Row, Pagination } from "antd";
import { useEffect, useRef, useState } from "react";
import Items from "./Items/Items";
import styles from "./PaginatedItems.module.css";
import SearchContainer from "./Search/Search";


const PaginatedItems = () => {
  const itemsPerPage = 30;
  const dispatch = useDispatch();
  const defaultItemsRef = useRef([]);
  const [deafaultItems, setDeafaultItems] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  //вроде как лишнее

  async function asyncFn() {
    const res = await dispatch(getCosmetics());
    setItems(res.slice(0, 30));
    setDeafaultItems(res);
    defaultItemsRef.current = res;
  }

  useEffect(() => {
    asyncFn();
  }, []);

  const handlePageClick = (page) => {
    const visibleItems = deafaultItems.slice((page - 1) * 25, 25 * page);
    setItems(visibleItems);
  };

  const getSearchedItems = (value) => {
    if (value) {
      const res = deafaultItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      if (res.length) {
        setDeafaultItems(res);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setDeafaultItems(defaultItemsRef.current);
      setError(false);
    }
  };
  return (
    <>
      <div>
     <SearchContainer getSearchedItems={getSearchedItems} error={error}/>
        <div className={styles.main}>
        <Row gutter={[8,16]}>
          <Items currentItems={items} />
        </Row>
        </div>
        <Pagination
          defaultCurrent={1}
          onChange={handlePageClick}
          pageSize={itemsPerPage}
          total={deafaultItems.length}
        />
      </div>
    </>
  );
};

export default PaginatedItems;
