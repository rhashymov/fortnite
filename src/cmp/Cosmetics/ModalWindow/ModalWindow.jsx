import React from 'react'
import styles from './ModalWindow.module.css'
import { Modal } from 'antd'

const ModalWindow = ({isModalVisible, handleOk, handleCancel, item}) => {
  return (
    <div className={styles.modal}>
        <Modal title={item.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <img src={item.images.icon} />
      </Modal>
    </div>
  )
}

export default ModalWindow