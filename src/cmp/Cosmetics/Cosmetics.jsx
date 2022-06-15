import { useDispatch } from "react-redux"
import { getCosmetics } from "../../redux/reducer"
import { Row, Input, Space } from 'antd'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Items from "./Items/Items";
import {getSearch} from './../../redux/searchReducer'
const { Search } = Input;


const PaginatedItems = () => {
    const itemsPerPage = 30;
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        async function asyncFn() {
            const res = await dispatch(getCosmetics())
            setItems(res)
        }
        asyncFn();
    }, [])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [items, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const getC = (value) => {
        return dispatch(getSearch(value)).then(response => {
            setItems(response)
            }
        )
    }
    return (
        <>
        <div className="site-card-wrapper">
        <Space direction="vertical">
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={getC}
    />
 
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