import React, {useEffect, useState} from 'react';
import {Modal, Button, message} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import CreateForm from "../createForm/CreateForm";
import moment from "moment";
import {createReservation} from "../../../../services/reservations";
import { useHistory } from 'react-router-dom';

const CreateModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);
    const history= useHistory();

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    useEffect(()=>{
        if(openModal.open && openModal.id){
            reset({...{},total_price:0,vehicle_id:openModal.id,vehicle:openModal.data?.plate_no});
        }
    },[openModal]);

    const onFinish = (data) => {
        console.log(data)
        let formData = data;
        delete formData.client;
        delete formData.vehicle;
        delete formData.total_price;
        formData.to_date = moment(formData.to_date).format('YYYY-MM-DD');
        formData.from_date = moment(formData.from_date).format('YYYY-MM-DD');

        console.log(formData);
        setIsLoading(true);
        createReservation(formData).then(res=>{
            queryClient.invalidateQueries('cars-available');
            message.success(res?.statusText);
            history.push('/reservations')
            setOpenModal({});
        }).catch(err=>{
            message.error(err?.response?.statusText);
            setIsLoading(false);
        });
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Cancel 
        </Button>,

        <Button  loading={isLoading} type="primary" key="ok" form="create-reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Save
        </Button>
    ];

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
                    <CreateForm control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default CreateModal;