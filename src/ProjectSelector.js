import React, { useState, useEffect } from 'react';
import { Select, DatePicker, Form } from 'antd'
import moment from 'moment'
import axios from 'axios'
import {API_URL} from './constants'

const massageData = data => data.filter(row => !row.includes('LANDED HOUSING DEVELOPMENT')).map(value => ({ title: value, value }))

const rangePresets = {
  'Last 3 months': [moment().subtract(3, 'months'), moment()],
  'Last 6 months': [moment().subtract(6, 'months'), moment()],
  'Last year': [moment().subtract(12, 'months'), moment()],
  'Last 2 years': [moment().subtract(2, 'years'), moment()]
}

const disabledDate = (date) => !date.isBetween('2018-01-01', moment())

const ProjectSelector = (props) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ list, setList ] = useState([])

  useEffect(() => {
    // init
    console.log('call')
    axios.get(`${API_URL}/project`).then(res => {
      const list = massageData(res.data)
      setList(list)
      setIsLoading(false)
    }).catch(e => { console.error(e) })
  }, [])

  const handleProjectChange = (val) => {
    props.onProjectChange(val)
  }

  const handleBedroomChange = (val) => {
    props.onBedroomChange(val)
  }

  const handleRangeChange = (val) => {
    props.onRangeChange(val)
  }

  return <div>
    <Form
      labelCol={{ span: 6 }}
      layout="horizontal"
    >
      <Form.Item label="Project">
        <Select
          style={{ width: 'auto', minWidth: '400px' }}
          placeholder="Project"
          mode="multiple"
          onChange={handleProjectChange}
          options={list}
          loading={isLoading}
          allowClear={true}
          showSearch={true}
        />
      </Form.Item>
      <Form.Item label="No of Bedroom">
        <Select
          style={{ width: 'auto', minWidth: '400px' }}
          mode="multiple"
          placeholder="No of Bedroom"
          onChange={handleBedroomChange}
          options={[1,2,3,4,5,6,7,8].map(value => ({ title: value, value }))}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label="Lease Start Range">
        <DatePicker.RangePicker
          picker="month" onChange={handleRangeChange}
          disabledDate={disabledDate}
          ranges={rangePresets}
        />
      </Form.Item>
    </Form>
  </div>
}

export default ProjectSelector