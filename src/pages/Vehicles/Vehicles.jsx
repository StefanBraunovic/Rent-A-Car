import React, {useEffect, useState} from 'react';
import {Table, Space, Modal, Button, Input} from 'antd';
import {getAllVehicles} from '../../services/vehicles';
import {useInfiniteQuery} from 'react-query';
import VehiclesForm from './components/VehiclesForm';
import ShowVehicle from './components/ShowVehicle';

const Vehicles = ({onSubmit}) => {
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState();

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    ['vehicles', search],
    getAllVehicles,
    {
      getNextPageParam: lastPage => {
        const currentPageNo = lastPage.data.current_page;
        const totalPageNo = lastPage.data.last_page;
        return currentPageNo === totalPageNo ? undefined : currentPageNo + 1;
      },
    },
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let tableData = [];
  data?.pages.forEach(page => {
    tableData.push(...page.data.data);
  });

  useEffect(pageParams => {
    var tableContent = document.querySelector('.ant-table-body');
    tableContent.addEventListener('scroll', event => {
      // checking whether a selector is well defined
      let maxScroll = event.target.scrollHeight - event.target.clientHeight;
      let currentScroll = event.target.scrollTop;
      if (currentScroll === maxScroll) {
        fetchNextPage();
      }
    });
  });

  const columns = [
    {
      title: 'Plates',
      dataIndex: 'plate_no',
      key: 'plate_no',
    },
    {
      title: 'Production Year',
      dataIndex: 'production_year',
      key: 'production_year',
    },
    {
      title: 'Vehicle Type',
      dataIndex: ['car_type', 'name'],
      key: 'type',
    },
    {
      title: 'Seats',
      key: 'no_of_seats',
      dataIndex: 'no_of_seats',
    },
    {
      title: 'Price/Day',
      key: 'price_per_day',
      dataIndex: 'price_per_day',
    },
    {
      title: 'Additional Remarks',
      key: 'remarks',
      dataIndex: 'remarks',
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <Space size="middle">
          <button
            onClick={event => {
              event.stopPropagation();

              showModal();
              setContent(<VehiclesForm title="Delete" vehicleId={record.id} />);
            }}>
            Delete
          </button>
          <button
            onClick={event => {
              event.stopPropagation();

              showModal();
              setContent(<VehiclesForm title="Edit" vehicleId={record} />);
            }}>
            Edit
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        style={{border: 'none'}}
        onClick={event => {
          event.stopPropagation();

          showModal();
          setContent(<VehiclesForm title="Add new vehicle" />);
        }}>
        add new vehicle
      </Button>
      <Input.Search
        placeholder="Search vehicle"
        allowClear
        onSearch={e => {
          setSearch(e);
        }}
        style={{width: 200}}
      />
      <Modal
        footer={null}
        onCancel={handleCancel}
        visible={isModalVisible}
        destroyOnClose>
        {content}
      </Modal>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setContent(
                <ShowVehicle
                  photos={record.photos}
                  plates={record.plate_no}
                  prodYear={record.production_year}
                  seats={record.no_of_seats}
                  carType={record.car_type.name}
                  pricePerDay={record.price_per_day}
                  remarks={record.remarks}
                />,
              );
              setIsModalVisible(true);
            }, // click row
          };
        }}
        columns={columns}
        rowKey={vehicle => `vehicle-${vehicle.id}`}
        scroll={{y: 400, x: 1000}}
        dataSource={tableData}
        pagination={false}
        loading={isFetchingNextPage}
      />
    </div>
  );
};

export default Vehicles;
