import {getReservations} from "../../../services/reservations";
import {useInfiniteQuery, useQueryClient} from "react-query";
import { Card,  Modal, Button, Skeleton, Spin, Select, Space} from "antd";
import React, {useState} from "react";
import {concatDataTwo, getReservationStatus} from "../../../functions/helper";
import { RESERVATION_STATUS} from "../../../constants/constants";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const Home = () => {

    const[page,setPage] = useState(1);
    const [equip, setEquip] = useState([])
    const[showData,setShowData] = useState({});
    const[current,setCurrent] = useState(RESERVATION_STATUS.ALL);

    const queryClient = useQueryClient();
    const {
        data,
     
        isLoading,
      
        fetchNextPage,
        hasNextPage,
      
        isFetchingNextPage,
    }= useInfiniteQuery(['reservations', ''], getReservations, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    });
   

    useBottomScrollListener(()=>{
        if(hasNextPage)fetchNextPage();
    });

   const openModal = (data) => {
       console.log(data);
       setShowData(data)
       setEquip(data?.equipment)
   }
    const footer = [
        <Button  key="close" className="login-form-button" onClick={()=>{setShowData({})}}>
            Zatvori
        </Button>
    ]

    return (<>
        <Space style={{ marginTop: 10,marginLeft:10,display:'flex',justifyContent:'start' }}>
            <div>
                <span>Show </span>
                <Select defaultValue={RESERVATION_STATUS.ALL} style={{width:150}} onChange={(e)=>setCurrent(e)}>
                    <Select.Option value={RESERVATION_STATUS.ALL}>All</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.PREVIOUS}>Previous</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.PRESENT}>Present</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.FUTURE}>Future</Select.Option>
                </Select>
            </div>
        </Space>
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',margin:10}}>
            <Skeleton loading={(isLoading)} avatar active>
            {data &&
            (concatDataTwo(data)?.length > 0 &&
                concatDataTwo(data).map((val,index) => (
                    (getReservationStatus(val?.from_date,val?.to_date,Date.now()) === current || current === RESERVATION_STATUS.ALL) && <Card
                    loading={isLoading}
                    key={index}
                    hoverable={true}
                    title={val?.vehicle?.plate_no}

                
                    style={{ width: '33%' }}
                    onClick={()=>{openModal(val)}}
                >
                    <p>From {val?.from_date} / {val?.rent_location?.name}</p>
                    <p>To {val?.to_date} /  {val?.return_location?.name}</p>
                </Card>
            )))}
            </Skeleton>
        </div>
        {(isFetchingNextPage)&&<Spin tip="Loading..." />}
        <Modal title='Info' visible={showData?.id} onCancel={()=>setShowData({})} footer={footer}>
                <div>
                    <h3>Reservation:</h3>
                    <p>From :{showData?.from_date}</p>
                    <p>To:{showData?.to_date}</p>
                    <p>Rent location:{showData?.rent_location?.name}</p>
                    <p>Return location:{showData?.return_location?.name}</p>
                    <h4>Total price:{showData?.total_price}</h4>
                    <h3>Client</h3>
                    <p>Frist & Last name: {showData?.client?.name}</p>
                    <h3>Vehicle:</h3>
                    <p>Plates number:{showData?.vehicle?.plate_no}</p>
                    <p>Production year:{showData?.vehicle?.production_year}</p>
                    <p>Vehicle type:{showData?.vehicle?.car_type?.name}</p>
                    <p>Number of seats:{showData?.vehicle?.no_of_seats}</p>
                    <p>Price/Day :{showData?.vehicle?.price_per_day}€</p>
                    <h3>Equipment</h3>
                      {equip.map(item=>{
    return <>
    <p>{item.name} - {item.max_quantity}</p>
   
    </>
})} 

                </div>
        </Modal>
    </>)

}

export default Home;