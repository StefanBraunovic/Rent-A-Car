import {getReservations} from "../../../services/reservations";
import {useQuery,useInfiniteQuery,useQueryClient} from "react-query";
import {Pagination, Card, message, Modal, Button,Skeleton, Space,Select} from "antd";
import {useState} from "react";
import {ClockCircleOutlined } from '@ant-design/icons';
import {getReservationStatus, concatData} from "../../../functions/helper";
import {COLOR, RESERVATION_STATUS} from "../../../constants/constants";

const ClientHome = () => {
    const [equip, setEquip] = useState([])
    // const[page,setPage] = useState(1);
    const[showData,setShowData] = useState({});
    const[current,setCurrent] = useState(RESERVATION_STATUS.ALL);
    const queryClient = useQueryClient();
    const {
        data,
        error,
        isLoading,
        isError,
    }= useInfiniteQuery(['reservations', ''], getReservations, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    });
    if(isError)message.error(error);
    console.log(data);
   const openModal = (data) => {
       setShowData(data)
       setEquip(data?.equipment)
       console.log(equip);
    }
    const footer = [
        <Button  key="close" className="login-form-button" onClick={()=>{setShowData({})}}>
           Close
        </Button>
    ]



    return (<>   <Space style={{ marginTop: 10,marginLeft:'20px', display:'flex',justifyContent:'start' }}>
    <div>
        <span>Show: </span>
        <Select defaultValue='choose' style={{width:150}} onChange={(e)=>setCurrent(e)}>
            <Select.Option value={1}>Previous</Select.Option>
            <Select.Option value={2}>Present</Select.Option>
            <Select.Option value={3}>Future</Select.Option>
        </Select>
    </div>
</Space>
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',margin:10}}>
        <Skeleton loading={(isLoading)} >
            {data &&
            (concatData(data)?.length > 0 &&
                concatData(data).map((val,index) => (
                   <Card
                    loading={isLoading}
                    key={index}
                    hoverable={true}
                    title={val?.vehicle?.plate_no}
                    style={{ width: '33%' }}
                    onClick={()=>{openModal(val)}}
                >
                    <p>Od: {val?.from_date} / {val?.rent_location?.name}</p>
                    <p>Do: {val?.to_date} /  {val?.return_location?.name}</p>
                </Card>
            )))}
            </Skeleton>
        </div>
  
        <Modal title='Info' visible={showData?.id} onCancel={()=>setShowData({})} footer={footer}>
                <div>
                    <h3>Reservation:</h3>
                    <p>From :{showData?.from_date}</p>
                    <p>To:{showData?.to_date}</p>
                    <p>Rent ocation:{showData?.rent_location?.name}</p>
                    <p>Return location:{showData?.return_location?.name}</p>
                    <p>Total price :{showData?.total_price} €</p>
                    <h3>Client:</h3>
                    <p>First name & Last name: {showData?.client?.name}</p>
                    <h3>Vehicle:</h3>
                    <p>Plate numer :{showData?.vehicle?.plate_no}</p>
                    <p>Production year:{showData?.vehicle?.production_year}</p>
                    <p>Vehicle type:{showData?.vehicle?.car_type?.name}</p>
                    <p>Number of seats :{showData?.vehicle?.no_of_seats}</p>
                    <p>Price per day :{showData?.vehicle?.price_per_day} €</p>
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

export default ClientHome;