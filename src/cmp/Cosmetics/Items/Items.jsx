import { Col, Card } from 'antd'

const Meta = Card.Meta

const Items = ({ currentItems }) => {


    return (<>
        {currentItems && currentItems.map((item, i) => (
            <Col span={4}>
                <Card bordered={true} key={item.id}>
                    <img src={item.images.smallIcon} />
                    <Meta title={item.name} description={item.description} />

                </Card>

            </Col>
        ))}
    </>
    )
}

export default Items