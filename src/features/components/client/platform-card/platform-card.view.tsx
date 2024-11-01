"use client";

import { Button, Card, Col, Row } from 'antd';
import Link from 'next/link';

export default function PlatformCardView({data}:any){

    if (!data) {
        return <span>Cargando...</span>
    }
    return (
        <div>
            <Link href={"/"}>
                <Button type="primary">
                    Regresar        
                </Button>
            </Link>
            <Row gutter={16}>
                <Col span={16}>
                    <Card title="Read Platform" bordered={false}>
                        <label>Platform: </label>
                        <b>{data.version}</b>
                        <br />
                        <label>Version:</label>
                        <b>{data.platform}</b>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}