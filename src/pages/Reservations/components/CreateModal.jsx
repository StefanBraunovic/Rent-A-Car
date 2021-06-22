import React, {useEffect, useState} from 'react';
import {Modal, Button, message} from 'antd';
import CreateForm from './CreateForm';
import moment from 'moment';
import {createReservation} from './../../../services/reservations';
import {calcDays, getEquipmentData} from '../../../functions/helper';

const CreateModal = ({
  openModal,
  setOpenModal,
  title,
  form: {control, errors, handleSubmit, reset, setValue, getValues},
  queryClient,
  params,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    if (isLoading === false) setOpenModal({...openModal, open: false});
  };

  useEffect(() => {
    if (openModal.open && openModal.id) {
      reset({
        total_price: calcDays(
          moment(params.start_date),
          moment(params.end_date),
          openModal?.data?.price_per_day,
        ),
        vehicle_id: openModal.id,
        vehicle: openModal.data?.plate_no,
        from_date: moment(params.start_date),
        to_date: moment(params.end_date),
      });
    }
  }, [openModal]);

  const onFinish = data => {
    let formData = getEquipmentData(data);

    delete formData.vehicle;
    delete formData.total_price;
    formData.to_date = moment(formData.to_date).format('YYYY-MM-DD');
    formData.from_date = moment(formData.from_date).format('YYYY-MM-DD');

    setIsLoading(true);
    createReservation(formData)
      .then(res => {
        queryClient.invalidateQueries('cars-available');
        message.success('This is a success message');
        setIsLoading(false);
        setOpenModal({});
      })
      .catch(err => {
        message(err?.response?.data?.message, 2);
        setIsLoading(false);
      });
  };

  const footer = [
    <Button
      disabled={isLoading}
      className="login-form-button"
      key="cancel"
      onClick={handleCancel}>
      Cancel
    </Button>,

    <Button
      loading={isLoading}
      type="primary"
      key="ok"
      form="create-reservation-form"
      htmlType="submit"
      className="login-form-button">
      Submit
    </Button>,
  ];

  return (
    <>
      <Modal
        title={title}
        visible={openModal.open}
        onCancel={handleCancel}
        footer={footer}>
        <CreateForm
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          handleSubmit={handleSubmit}
          onFinish={onFinish}
          price_per_day={openModal?.data?.price_per_day}
        />
      </Modal>
    </>
  );
};

export default CreateModal;
