import { useDispatch, useSelector } from "react-redux";
import { getCosmetics } from "../../redux/reducer";
import { Row, Pagination } from "antd";
import { useEffect, useState } from "react";
import Items from "./Items/Items";
import styles from "./PaginatedItems.module.css";
import SearchContainer from "./Search/Search";

const PaginatedItems = () => {
  const itemsPerPage = 30;
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const defaultItems = useSelector((state) => state.cosmetics.cosmetics);

  async function asyncFn() {
    await dispatch(getCosmetics());
    // так не сработает этих данных еще нету в defaultItems
    // сделай тут console.log(defaultItems) и увидишь сам
    // надо сделать на это отдельный useEffect который будет срабатывать когда данные появтся но при этом только 1 раз
  }
  const setFirstVisibleItems = () => {
    if(defaultItems) {
      setItems(defaultItems.slice(0, 30));
    }
    
  }

  

  const handlePageClick = (page) => {
    const visibleItems = defaultItems.slice((page - 1) * 30, 30 * page);
    setItems(visibleItems);
  };

  const getSearchedItems = (value) => {
    if (value) {
      const res = defaultItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      if (res.length) {
        setItems(res);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      // ошибка поиска при очистке вот тут
      // кстати при очистке ты увидишь что приложение повиснет на секунду две
      setFirstVisibleItems()
      setError(false);
    }
  };
  useEffect(() => {
    asyncFn();
  }, []);
  useEffect(() => {
    setFirstVisibleItems()
  },[defaultItems])

  return (
    <>
      <div className={styles.search}>
        <SearchContainer getSearchedItems={getSearchedItems} error={error} />
      </div>
      <div className={styles.main}>
        <Row gutter={[8, 8]}>
          <Items currentItems={items} />
        </Row>
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={1}
          onChange={handlePageClick}
          pageSize={itemsPerPage}
          total={defaultItems.length}
        />
      </div>
    </>
  );
};

export default PaginatedItems;
