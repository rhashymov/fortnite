import { Col, Modal } from 'antd'
import { useState } from 'react';
import styles from './Items.module.css'

const Items = ({ currentItems }) => {
    const [isModalVisible, setIsModalVisible] = useState();
    const [popupData, setPopupData] = useState({
        name: null,
        title: null,
        images: {
            icon: null
        }})

    const showModal = (item) => {
        setPopupData(item)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (<>
        {currentItems && currentItems.map((item) => (
            <>
                <Col span={4}>
                    <div className={styles.card} key={item.id} onClick={() => showModal(item)}>
                        <div><img alt='cosmetics' className={styles.banner} src={item.images.smallIcon} /></div>
                        <div> {item.title}</div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div>{item.description}</div>
                    </div>
                </Col>
            </>
       ))}
        <Modal title={popupData.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <div>{popupData.title}</div>
       <img alt='cosmetics' src={popupData.images.smallIcon} />
        </Modal>
    </>
    )
}

export default Items