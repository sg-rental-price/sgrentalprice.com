import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  MinusCircleOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { db } from "./firebase";
import { q50, q25, q75 } from "./stats";

const RentalData = ({ project, bedroom, range }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      if (range.length === 0) return;
      if (project === null) return;
      // await firebase.auth().signInAnonymously();
      setIsLoading(true);
      console.log({ project, bedroom, range });

      const rentalRef = db.collection("rental");
      let query = rentalRef;
      if (project) query = query.where("project_id", "==", project);
      query = query
        .where("lease_date", ">=", range[0].toDate())
        .where("lease_date", "<=", range[1].toDate());
      if (bedroom.length > 0)
        query = query.where(
          "bedroom_no",
          "in",
          bedroom
        );

      const data = await query.get();
      const records = data.docs.map((d) => d.data());
      const rentals = records.map((r) => r.rent);
      const stats = {
        min: Math.min(...rentals),
        max: Math.max(...rentals),
        low: q25(rentals),
        high: q75(rentals),
        median: q50(rentals),
        count: rentals.length,
      };
      setData(stats);
      setIsLoading(false);
    })();
  }, [project, bedroom, range]);

  if (isLoading) return <Card title="Loading ..." />;
  const { min, max, low, high, median, count } = data;
  return (
    <div>
      <h2>
        Rental Statistic <SlidersOutlined />
      </h2>
      <Row gutter={4}>
        <Col span={8}>
          <Statistic
            valueStyle={{ color: "green" }}
            title="Low"
            value={low}
            prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            valueStyle={{ color: "blue" }}
            title="Median"
            value={median}
            prefix={<MinusCircleOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            valueStyle={{ color: "red" }}
            title="High"
            value={high}
            prefix={<DislikeOutlined />}
          />
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
          Low: 25th percentile
          <br />
          High: 75th percentile
          <br />
          The higher record count is, the more reliable
        </smaller>
      </Card>
    </div>
  );
};

export default RentalData;