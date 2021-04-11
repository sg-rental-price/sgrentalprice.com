import React, { useState, useEffect } from "react";
import { Select, DatePicker, Form } from "antd";
import moment from "moment";
import axios from "axios";

const lastAvailDate = "2021-03-31";

const massageData = (data) => data.map(([value, label]) => ({ label, value }));

export const rangePresets = {
  "Last Available 3 months": [
    moment(lastAvailDate).subtract(3, "months"),
    moment(),
  ],
  "Last Available 6 months": [
    moment(lastAvailDate).subtract(6, "months"),
    moment(),
  ],
  "Last Available year": [
    moment(lastAvailDate).subtract(12, "months"),
    moment(),
  ],
};

const disabledDate = (date) =>
  !date.isBetween("2015-10-01", moment(lastAvailDate));

const ProjectSelector = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    // init
    axios
      .get(`/project_name_list.json`)
      .then((res) => {
        const list = massageData(res.data);
        setList(list);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleProjectChange = (val) => {
    props.onProjectChange(val);
  };

  const handleBedroomChange = (val) => {
    props.onBedroomChange(val);
  };

  const handleRangeChange = (val) => {
    props.onRangeChange(val);
  };

  return (
    <div>
      <Form labelCol={{ span: 6 }} layout="horizontal" form={form}>
        <Form.Item name="project" label="Project" rules={[{ required: true }]}>
          <Select
            style={{ width: "auto", minWidth: "400px" }}
            placeholder="Project"
            onChange={handleProjectChange}
            options={list}
            loading={isLoading}
            allowClear={true}
            showSearch={true}
          />
        </Form.Item>
        <Form.Item name="bedroom" label="No of Bedroom">
          <Select
            disabled={!form.getFieldValue("project")}
            style={{ width: "auto", minWidth: "400px" }}
            mode="multiple"
            placeholder="No of Bedroom"
            onChange={handleBedroomChange}
            options={[1, 2, 3, 4, 5, 6, 7, 8].map((value) => ({
              title: value,
              value,
            }))}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          name="range"
          label="Lease Start Range"
          initialValue={rangePresets["Last Available 3 months"]}
        >
          <DatePicker.RangePicker
            disabled={!form.getFieldValue("project")}
            picker="month"
            onChange={handleRangeChange}
            disabledDate={disabledDate}
            ranges={rangePresets}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectSelector;