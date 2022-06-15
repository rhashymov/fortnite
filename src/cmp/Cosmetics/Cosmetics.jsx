import { useDispatch } from "react-redux"
import { getCosmetics } from "../../redux/reducer"
import { Row, Input, Space, Alert } from 'antd'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Items from "./Items/Items";
import styles from './Cosmetics.module.css'
const { Search } = Input;


const PaginatedItems = () => {
    const itemsPerPage = 30;
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const [deafaultItems, setDeafaultItems] = useState([])
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [error, setError] = useState(false)
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        async function asyncFn() {
            const res = await dispatch(getCosmetics())
            setItems(res)
            setDeafaultItems(res)
        }
        asyncFn();
    }, [])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [items, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        
        setItemOffset(newOffset);
    };
    const getC = (value) => {
        if (value) {
            const res = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
            if (res.length) {
                setItems(res)
                setError(false)
            } else {
                setError(true)
            }
        }
        else {
            setItems(deafaultItems)
            setError(false)
        }
    }
    return (
        <>
            <div className="site-card-wrapper">
                <Space direction="vertical" align="center">
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={getC}
                    />
                    <Alert message="Совпадений не найдено" type="error" className={error ? styles.showAlert : styles.hideAlert} />
                </Space>
                <Row gutter={[48, 16]}>
                    <Items currentItems={currentItems} />
                </Row>
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>

        </>

    );
}

export default PaginatedItems