import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
// import CreateForm from "../createForm/CreateForm";
import moment from "moment";
import {createReservation} from "../../../services/reservations";
// import {calcDays, getEquipmentData, showMessage} from "../../../../functions/tools";


const CreateModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset,setValue,getValues},queryClient,params}) => {
    const [isLoading,setIsLoading] = useState(false);

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };



    const onFinish = (data) => {
     
        console.log(data);
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="create-reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Sacuvaj
        </Button>
    ];

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
           
            </Modal>
        </>
    );
};

export default CreateModal;