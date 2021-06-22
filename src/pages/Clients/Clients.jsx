import React, {useEffect, useState} from 'react';
import {Table, Space, Input, Button} from 'antd';
import {getAllClients} from '../../services/clients';
import {useInfiniteQuery} from 'react-query';
import {Modal} from 'antd';
import Demo from './ClientsForm';

import {useForm} from 'react-hook-form';

const Clients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {reset} = useForm();
  const [content, setContent] = useState('');
  const [search, setSearch] = useState();
  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    ['clients', search],
    getAllClients,
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

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const closeModal = () => {
    reset();
    setIsModalVisible(false);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID & Passport',
      dataIndex: 'identification_document_no',
      key: 'identification_document_no',
    },
    {
      title: 'Phone number',
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
    // {
    //   title: 'Remarks',
    //   key: 'remarks',
    //   dataIndex: 'remarks',
    // },
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
                <Demo
                  title="Delete"
                  ClientId={record}
                  onSuccessCallback={closeModal}
                />,
              );
            }}>
            Delete
          </button>
          <button
            onClick={event => {
              event.stopPropagation();
              showModal();
              setContent(
                <Demo
                  title="Edit"
                  ClientId={record}
                  onSuccessCallback={closeModal}
                />,
              );
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
        onClick={() => {
          showModal();
          setContent(
            <Demo title="Add new client" onSuccessCallback={closeModal} />,
          );
        }}>
        add new client
      </Button>

      <Modal
        destroyOnClose
        footer={null}
        title="Basic Modal"
        onCancel={handleCancel}
        visible={isModalVisible}>
        {content}
      </Modal>
      <Input.Search
        placeholder="Search client"
        allowClear
        onSearch={e => {
          setSearch(e);
        }}
        style={{width: 200}}
      />

      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              showModal();
              setContent(
                <Demo
                  title="Show"
                  ClientId={record}
                  onSuccessCallback={closeModal}
                />,
              );
            },
          };
        }}
        columns={columns}
        rowKey={client => `client-${client.id}`}
        scroll={{y: 400, x: 1000}}
        dataSource={tableData}
        pagination={false}
        loading={isFetchingNextPage}
      />
    </div>
  );
};

export default Clients;
