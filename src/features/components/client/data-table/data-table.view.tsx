'use client'

import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Space, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import useDataTableController from './data-table.controller'
import { VersionCompatibility } from "@/features/types/access.type"

const { Title } = Typography

interface CRUDInterfaceProps {
  data: VersionCompatibility[]
  onDataChange: (newData: VersionCompatibility[]) => void
}

export default function DataTableView ({data} :any) {
  
  const {
    isModalVisible,
    setIsModalVisible,
    handleSubmit,
    columns,
    currentItem,
    setCurrentItem,
    form
  } = useDataTableController(data);


  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Version Compatibility CRUD</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setCurrentItem(null)
          form.resetFields()
          setIsModalVisible(true)
        }}
        style={{ marginBottom: '20px' }}
      >
        Add New Item
      </Button>
      
      <Table
        columns={columns}
        dataSource={data ? data : []}
        rowKey="id"
      />

      <Modal
        title={currentItem ? 'Edit Item' : 'Add New Item'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="version"
            label="Version"
            rules={[{ required: true, message: 'Ingrese la Version!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="platform"
            label="Platform"
            rules={[{ required: true, message: 'Ingrese la Platforma!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentItem ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}