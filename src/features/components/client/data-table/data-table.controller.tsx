"use client";

import React, { useState } from 'react'
import { Button, Form, message, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { VersionCompatibility } from "@/features/types/access.type"
import Link from 'next/link';

export default function useDataTableController({data}: any) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<VersionCompatibility | null>(null)
  const [form] = Form.useForm()

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
  const token = process.env.NEXT_PUBLIC_SECRET_API_KEY

  console.log(token)

  const handleSubmit = async (values: any) => {
    try {
      if (currentItem) {
        values.id = currentItem.id;
      }
      const method = currentItem ? 'PUT' : 'POST'
      const url = apiUrl
      const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    if (response.ok) {
        message.success(`Item ${currentItem ? 'updated' : 'added'} successfully`)

        // onDataChange(newData)
        setIsModalVisible(false)
        setCurrentItem(null)
        form.resetFields()
    } else {
        throw new Error('Failed to save item')
    }
    } catch (e) {
    console.warn(e)
    message.error(`Failed to ${currentItem ? 'update' : 'add'} item`)
    }
  }

  const handleDelete = async (id: number) => {
      try {
      const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
          headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if (response.ok) {
          message.success('Item deleted successfully')
          // onDataChange(newData)
      } else {
          throw new Error('Failed to delete item')
      }
      } catch (e) {
      console.warn(e)
      message.error('Failed to delete item')
      }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: VersionCompatibility) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentItem(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Eliminar
          </Button>
          <Link href={`/${record.id}`}>Ver</Link>
        </Space>
      ),
    },
  ]

  return {
    isModalVisible,
    setIsModalVisible,
    handleSubmit,
    columns,
    currentItem,
    setCurrentItem,
    form
  }
}