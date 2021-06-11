import React, {useEffect, useState} from 'react';
import { Table, Tag, Space } from 'antd';
import { getAllClients } from '../../services/clients';
import {
    useQuery
  } from 'react-query'

const Clients = ()=>{

    const query = useQuery('clients', getAllClients)

    const Data =query.data?.data?.data
    console.log(Data);
    // console.log(query);
    
    useEffect((pageParams)=>{
          var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
              // checking whether a selector is well defined
              console.log('yes, I am listening')
              let maxScroll = event.target.scrollHeight - event.target.clientHeight
              let currentScroll = event.target.scrollTop
              if (currentScroll === maxScroll) {
                getAllClients(pageParams=2)
              }
            })
    })
       
      
       
        
        
        
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          
        },
        {
          title: 'identification_document_noy',
          dataIndex: 'identification_document_no',
          key: 'identification_document_no',
        },
        {
          title: 'phone_no',
          dataIndex: 'phone_no',
          key: 'phone_no',
        },
        {
          title: 'Date of first reservation',
          key: 'date_of_first_reservation',
          dataIndex: 'date_of_first_reservation',
        },
        {
            title: 'Date of last reservation',
            key: 'date_of_last_reservation',
            dataIndex: 'date_of_last_reservation',
          },
          {
            title: 'Date of last reservation',
            key: 'date_of_last_reservation',
            dataIndex: 'date_of_last_reservation',
          },
          {
            title: 'Remarks',
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
       <Table columns={columns}   scroll={{ y: 400 }} dataSource={Data}  />
    </div>
}

export default Clients;