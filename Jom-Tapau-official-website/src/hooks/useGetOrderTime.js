import useGetDate from "./useGetDate";
import useOrders from "./useOrders"

const useGetOrderTime = ()=>{
    const {orders} = useOrders();

    const {date,today} = useGetDate()

   //generate the current hours 
    const time = date.getHours();

    let lunchOrder = [];
    let dinnerOrder = [];
    function generateExcelData (newOrder,order){
        let text = ""
        order.orders.map(or=>{
            text = text + `${or.quantity}x${or.name} `;
        })
        const orderObj ={
            id:order._id,
            name:order.name,
            address:order.deliveryAddress,
            time:order.deliveryTime,
            food:text,
            phone:order.phoneNumber,
            total:order.total,
            roomNumber:order.roomNumber
        }

        newOrder.push(orderObj)
    }

    orders.map(order=>{
        if(order.deliveryDate===today){
            if(order.deliveryTime==="Lunch"){
                generateExcelData(lunchOrder,order);
            }else{
                console.log("Dinner",order)
            }
        }
    })

    return {
        lunchOrder,
        dinnerOrder
    }
}


export default useGetOrderTime;