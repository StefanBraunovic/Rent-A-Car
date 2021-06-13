import React, {useEffect, useState} from 'react';
import { Table, Tag, Space,Modal } from 'antd';
import { getAllVehicles } from '../../services/vehicles';
import { useInfiniteQuery } from 'react-query'
import VehiclesForm from './VehiclesForm';
import Item from 'antd/lib/list/Item';

const Vehicles = ()=>{
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery('vehicles', getAllVehicles, {
        getNextPageParam: ((lastPage) => {
            const currentPageNo = lastPage.data.current_page;
            const totalPageNo = lastPage.data.last_page;
            return currentPageNo === totalPageNo ? undefined : currentPageNo + 1;
        }),
    })

    
    const showModal = ()=>{
      
      setIsModalVisible(true);
    
    }

    let tableData = [];
    data?.pages.forEach((page) => {
        tableData.push(...page.data.data);
    })

    // const onClick = (id)=>{
    //   console.log(id);
    // }
    
    useEffect((pageParams) => {
        var tableContent = document.querySelector('.ant-table-body')
        tableContent.addEventListener('scroll', (event) => {
            // checking whether a selector is well defined
            let maxScroll = event.target.scrollHeight - event.target.clientHeight;
            let currentScroll = event.target.scrollTop;
            if (currentScroll === maxScroll) {
                fetchNextPage();
            }
        })
    })
       
      
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
          dataIndex: 'car_type_id',
          key: 'car_type_id',
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
            render: (record) => (
              <Space size="middle">
                <button onClick={() => { showModal(); setContent(
                  <VehiclesForm title='Delete' id={record.id}/>
                );}} >Delete</button>
               <button onClick={() => { showModal(); setContent(
                  <VehiclesForm title='Edit'/>
                );}} >Edit</button>
              </Space>
            ),
        },
    ];

    return <div>
       <Modal title="Basic Modal" visible={isModalVisible}>
       {content}
      </Modal>
       <Table

       onRow={(record, rowIndex) => {
        return {
          onClick: event => {setIsModalVisible(true)}, // click row
        };
      }}
       columns={columns} rowKey={(vehicle) => `vehicle-${vehicle.id}`} scroll={{ y: 400 }} dataSource={tableData}  pagination={false} loading={isFetchingNextPage} />
    </div>
}

export default Vehicles;