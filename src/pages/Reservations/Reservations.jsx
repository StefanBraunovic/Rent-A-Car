import React, { useEffect, useState} from 'react';
import { Table, Space,Button} from 'antd';
import {  getAllReservations} from '../../services/reservations';
import { useInfiniteQuery } from 'react-query'
import { Modal} from 'antd';
import { useHistory } from 'react-router-dom';

const Reservations = () =>{

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [content, setContent] = useState('');
    const history = useHistory()
    const[search,setSearch] = useState('');
      const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(['reservations',search], getAllReservations, {
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
              dataIndex:['rent_location', 'name'],
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
                  <button onClick={() => { showModal(); setContent(
                    // <Demo title='Delete'/>
                  );}} >Delete</button>
                </Space>
              ),
          },
      ];
  
      return <div>
        <Button className="dashed" onClick={()=>{
          history.push('/add-reservations')
          }}>add reservations</Button>
        <Modal title="Basic Modal" visible={isModalVisible}>
         {content}
        </Modal>
         <Table style={{tableLayout:'unset'}} onRow={(record, rowIndex) => {
      return {
        onClick: event => {  setIsModalVisible(true)}, 
      };
    }} columns={columns} rowKey={(client) => `client-${client.id}`} scroll={{ y: 400, x:true }} dataSource={tableData}  pagination={false} loading={isFetchingNextPage} />
      </div>
  }
  



export default Reservations