import { Button, Col, Drawer, Row } from "antd";
import React from "react";
import MSForm from "../../components/form/MSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MSInput from "../../components/form/MSInput";
import MSSelect from "../../components/form/MSSelect";

type TDrawerProps = {
  onClose: ((e: React.MouseEvent | React.KeyboardEvent) => void) | undefined;
  openDrawer: boolean;
  onSubmit: SubmitHandler<FieldValues>;
};

const RoomFilterDrawer: React.FC<TDrawerProps> = ({
  onClose,
  openDrawer,
  onSubmit,
}) => {
  return (
    <Drawer
      title="Filter Rooms"
      width={720}
      onClose={onClose}
      open={openDrawer}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <MSForm onSubmit={onSubmit}>
        <Row gutter={20}>
          <Col span={12} lg={{ span: 6 }}>
            <MSInput type="text" name="minCapacity" label="Min Capacity" />
          </Col>
          <Col span={12} lg={{ span: 6 }}>
            <MSInput type="text" name="minPrice" label="Min Price" />
          </Col>
          <Col span={12} lg={{ span: 6 }}>
            <MSInput type="text" name="maxPrice" label="Max Price" />
          </Col>
          <Col span={12} lg={{ span: 6 }}>
            <MSSelect
              name="sortOrder"
              label="Sort By"
              options={[
                { value: "pricePerSlot", label: "Price: Low to High" },
                { value: "-pricePerSlot", label: "Price: High to Low" },
              ]}
            />
          </Col>
          <Button htmlType="submit">Filter</Button>
        </Row>
      </MSForm>
    </Drawer>
  );
};

export default RoomFilterDrawer;
