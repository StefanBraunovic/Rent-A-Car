import React, {useEffect, useState} from 'react';
import {Table, Space, Button} from 'antd';
import {
  deleteReservation,
  getAllReservations,
} from '../../services/reservations';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {Modal} from 'antd';
import {useHistory} from 'react-router-dom';
import ShowReservation from './components/ShowReservation';
import Swal from 'sweetalert2';

const Reservations = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const history = useHistory();
  const [search] = useState('');

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
  const queryClient = useQueryClient();

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

  const onDelete = id => {
    deleteReservation(id);
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
      render: record => (
        <Space size="middle">
          <button
            onClick={event => {
              event.stopPropagation();
              showModal();
              setContent(
                <div>
                  <h3>Delete reservation for {record.client.name}</h3>
                  <button
                    style={{color: 'red'}}
                    onClick={() => {
                      onDelete(record.id);
                      Swal.fire('You deleted  the client!');
                      queryClient.refetchQueries('reservations');
                      history.push('reservations');
                    }}>
                    Delete
                  </button>
                </div>,
              );
            }}>
            delete
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
        onRow={record => {
          return {
            onClick: () => {
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
              setIsModalVisible(true);
            },
          };
        }}
        columns={columns}
        scroll={{y: 400, x: 1000}}
        dataSource={tableData}
        pagination={false}
        loading={isFetchingNextPage}
      />
    </div>
  );
};

export default Reservations;
