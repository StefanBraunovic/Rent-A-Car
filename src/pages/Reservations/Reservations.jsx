import React, {useEffect, useState} from 'react';
import {Table, Space, Button} from 'antd';
import {getAllReservations} from '../../services/reservations';
import {useInfiniteQuery} from 'react-query';
import {Modal} from 'antd';
import {useHistory} from 'react-router-dom';
import ShowReservation from './components/ShowReservation';

const Reservations = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const history = useHistory();
  const [search, setSearch] = useState('');
  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    ['reservations', search],
    getAllReservations,
    {
      getNextPageParam: lastPage => {
        const currentPageNo = lastPage.data.current_page;
        const totalPageNo = lastPage.data.last_page;
        return currentPageNo === totalPageNo ? undefined : currentPageNo + 1;
      },
    },
  );

  let tableData = [];
  data?.pages.forEach(page => {
    tableData.push(...page.data.data);
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
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
      title: 'Client',
      dataIndex: ['client', 'name'],
      key: 'name',
    },
    {
      title: 'Vehicle',
      dataIndex: ['vehicle', 'plate_no'],
      key: 'country',
    },
    {
      title: 'From',
      dataIndex: 'from_date',
      key: 'from_date',
    },
    {
      title: 'To',
      key: 'to_date',
      dataIndex: 'to_date',
    },
    {
      title: 'Location',
      key: 'rent_location',
      dataIndex: ['rent_location', 'name'],
    },
    {
      title: 'Return location',
      key: 'return_location',
      dataIndex: ['return_location', 'name'],
    },
    {
      title: 'Total Price',
      key: 'total_price',
      dataIndex: 'total_price',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <button
            onClick={() => {
              showModal();
              setContent();
              // <Demo title='Delete'/>
            }}>
            Delete
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        className="dashed"
        onClick={() => {
          history.push('/add-reservations');
        }}>
        add reservations
      </Button>
      <Modal onCancel={handleCancel} footer={null} visible={isModalVisible}>
        {content}
      </Modal>
      <Table
        style={{tableLayout: 'unset'}}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setContent(
                <ShowReservation
                  reservationId={record.id}
                  from_date={record.from_date}
                  to_date={record.to_date}
                  rentLocation={record.rent_location.name}
                  returnLocation={record.return_location.name}
                  totalPrice={record.total_price}
                  plateNo={record.vehicle.plate_no}
                  prodYear={record.vehicle.production_year}
                  carType={record.vehicle.car_type.name}
                  noSeats={record.vehicle.no_of_seats}
                  pd={record.price_per_day}
                  equip={record.equipment}
                />,
              );
              console.log(record);
              setIsModalVisible(true);
            },
          };
        }}
        columns={columns}
        rowKey={client => `client-${client.id}`}
        scroll={{y: 400, x: true}}
        dataSource={tableData}
        pagination={false}
        loading={isFetchingNextPage}
      />
    </div>
  );
};

export default Reservations;
