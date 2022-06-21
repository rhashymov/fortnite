import { Col, Modal } from 'antd'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Items.module.css'

const Items = ({ currentItems }) => {
    const [isModalVisible, setIsModalVisible] = useState();

    const openModal = (item) => {
        setIsModalVisible({ modalIsOpen: true, item });
    }
    const showModal = () => {
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
                <Col span={6}>
                    <div className={styles.card} key={item.id} onClick={showModal}>
                        <div><img alt='cosmetics' className={styles.banner} src={item.images.smallIcon} /></div>
                        <div> {item.title}</div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div>{item.description}</div>

                    </div>
                </Col>
                <Modal title={item.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <img alt='cosmetics' src={item.images.icon} />
                </Modal>
            </>
        ))}
    </>
    )
}

export default Items