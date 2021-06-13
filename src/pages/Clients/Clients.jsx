import React, { useEffect, useState} from 'react';
import { Table, Space } from 'antd';
import { getAllClients} from '../../services/clients';
import { useInfiniteQuery } from 'react-query'

import { Modal} from 'antd';
import Demo from './ClientsForm'

const Clients = ()=>{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery('clients', getAllClients, {
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
  
    const showModal = ()=>{
      
      setIsModalVisible(true);
    
    }

  
    
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          
        },
        {
          title: 'identification_document_no',
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
                <button onClick={() => { showModal(); setContent(
                  <Demo title='Delete'/>
                );}} >Delete</button>
               <button onClick={() => { showModal(); setContent(
                  <Demo  title='Edit'/>
                );}} >Edit</button>
              </Space>
            ),
        },
    ];

    return <div>
      <Modal title="Basic Modal" visible={isModalVisible}>
       {content}
      </Modal>
       <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {  setIsModalVisible(true)}, 
    };
  }} columns={columns} rowKey={(client) => `client-${client.id}`} scroll={{ y: 400 }} dataSource={tableData}  pagination={false} loading={isFetchingNextPage} />
    </div>
}

export default Clients;