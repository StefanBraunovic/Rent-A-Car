import React, {useEffect, useState} from 'react';
import { Table, Tag, Space } from 'antd';
import { getAllVehicles } from '../../services/vehicles';
import { useInfiniteQuery } from 'react-query'

const Vehicles = ()=>{

    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery('vehicles', getAllVehicles, {
        getNextPageParam: ((lastPage) => {
            const currentPageNo = lastPage.data.current_page;
            const totalPageNo = lastPage.data.last_page;
            return currentPageNo === totalPageNo ? undefined : currentPageNo + 1;
        }),
    })

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
            render: () => (
              <Space size="middle">
                <button>Delete</button>
                <button>Edit</button>
              </Space>
            ),
        },
    ];

    return <div>
       <Table
       onRow={(record, rowIndex) => {
        return {
          onClick: event => {console.log(record.id);}, // click row
        };
      }}
       columns={columns} rowKey={(client) => `client-${client.id}`} scroll={{ y: 400 }} dataSource={tableData}  pagination={false} loading={isFetchingNextPage} />
    </div>
}

export default Vehicles;