import React, { useEffect, useState} from 'react';
import { Table, Space,Input,Button } from 'antd';
import { getAllClients} from '../../services/clients';
import { useInfiniteQuery } from 'react-query'
import { Modal} from 'antd';
import Demo from './ClientsForm'

const Clients = ()=>{
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [content, setContent] = useState('');
  const[search,setSearch] = useState();
    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery('clients',getAllClients, {
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
    const handleCancel = () => {
      setIsModalVisible(false);
        };
  
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
          responsive: ["lg"]
          
        },
        {
          title: 'identification_document_no',
          dataIndex: 'identification_document_no',
          key: 'identification_document_no',
          responsive: ["sm"]
        },
        {
          title: 'phone_no',
          dataIndex: 'phone_no',
          key: 'phone_no',
         responsive: ["sm"]
        },
        {
          title: 'Date of first reservation',
          key: 'date_of_first_reservation',
          dataIndex: 'date_of_first_reservation',
         responsive: ["sm"]
        },
        {
            title: 'Date of last reservation',
            key: 'date_of_last_reservation',
            dataIndex: 'date_of_last_reservation',
           responsive: ["sm"]
          },
          {
            title: 'Remarks',
            key: 'remarks',
            dataIndex: 'remarks',
           responsive: ["sm"]
          },
          {
            title: 'Action',
            key: 'action',
            render: (record) => (
              <Space size="middle">
                <button onClick={() => { showModal(); setContent(
                  <Demo title='Delete' id={record.id}/>
                );}} >Delete</button>
               <button onClick={() => { showModal(); setContent(
                  <Demo  title='Edit' id={record.id}/>
                );}} >Edit</button>
              </Space>
            ),
        },
    ];

    return <div>
      <Button style={{border:'none'}}
      onClick={() => { showModal(); setContent(
        <Demo title='Add new client'/>
      ); }}
      >add new client</Button>
      
      <Modal title="Basic Modal"     onCancel={handleCancel} visible={isModalVisible}>
       {content}
      </Modal>
      <Input.Search placeholder="Pretrazi klienta" allowClear onSearch={(e)=>{ setSearch(e); }} style={{ width: 200 }} />
       <Table  onRow={(record, rowIndex) => {
    return {
      onClick: event => {  setIsModalVisible(true)}, 
    };
  }} columns={columns} rowKey={(client) => `client-${client.id}`} scroll={{ y: 400 }} dataSource={tableData}  pagination={false} loading={isFetchingNextPage} />
    </div>
}

export default Clients;