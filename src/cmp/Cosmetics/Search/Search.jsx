import { Input, Space, Alert, } from "antd"
import styles from './Search.module.css'
const { Search } = Input;

const SearchContainer = ({getSearchedItems, error}) => {
  return (
    <Space  direction="vertical">
    <Search className={styles.conteiner}
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={getSearchedItems}
    />
    <Alert
      message="Совпадений не найдено"
      type="error"
      className={error ? styles.showAlert : styles.hideAlert}
    />
  </Space>
  )
}


export default SearchContainer