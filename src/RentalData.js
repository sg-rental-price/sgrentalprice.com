import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { LikeOutlined, DislikeOutlined, MinusCircleOutlined, SlidersOutlined } from '@ant-design/icons'
import axios from 'axios'
import {API_URL} from './constants'

const RentalData = ({ project, bedroom, range }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ data, setData ] = useState({})
  useEffect(() => {
    setIsLoading(true)
    const filter = {}
    if (project && project.length > 0) Object.assign(filter, { project })
    if (bedroom && bedroom.length > 0) Object.assign(filter, { bedRoom: bedroom })
    if (range && range.length > 1) Object.assign(filter, { leaseDate: range.map(d => d.set('date', 1).format('YYYY-MM-DD')) })
    
    axios.post(`${API_URL}/rental/stats`, filter)
    .then(res => {
      setData(res.data)
      setIsLoading(false)
    }).catch(e => console.error(e))
  }, [project, bedroom, range])

  if (isLoading) return <Card title='Loading ...' />
  const { min, max, low, high, median, count } = data
  return <div>
    <h2>Rental Statistic <SlidersOutlined /></h2>
    <Row gutter={4}>
      <Col span={8}>
        <Statistic  valueStyle={{ color: 'green'}} title="Low" value={low} prefix={<LikeOutlined />} />
      </Col>
      <Col span={8}>
        <Statistic  valueStyle={{ color: 'blue'}} title="Median" value={median} prefix={<MinusCircleOutlined />} />
      </Col>
      <Col span={8}>
        <Statistic  valueStyle={{ color: 'red'}} title="High" value={high} prefix={<DislikeOutlined />} />
      </Col>
      <Col span={8}>
        <Statistic title="Min" value={min} />
      </Col>
      <Col span={8}>
        <Statistic title="Max" value={max} />
      </Col>
      <Col span={8}>
        <Statistic title="No of Record" value={count} />
      </Col>
    </Row>
    <br />
    <Card title="Notes" size="small">
      <smaller>
        Low: 25th percentile<br />
        High: 75th percentile<br />
        The higher record count is, the more reliable
      </smaller>
    </Card>
  </div>
}

export default RentalData