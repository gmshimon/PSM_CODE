import React from 'react';
import useOrders from '../../hooks/useOrders';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style'
import useGetDate from '../../hooks/useGetDate';

const ExcelGenerator = () => {

    const {orders} = useOrders();

   const {date,today} = useGetDate()

   //generate the current hours 
    const time = date.getHours();
    console.log(time)

    let lunchOrder = [];
    let dinnerOrder = [];
    function generateExcelData (newOrder,order){
        let text = ""
        order.orders.map(or=>{
            text = text + `${or.quantity}x${or.name} `;
        })
        const orderObj ={
            name:order.name,
            address:order.deliveryAddress,
            time:order.deliveryTime,
            food:text,
            total:order.total
        }

        newOrder.push(orderObj)
    }

    orders.map(order=>{
        if(order.deliveryDate===today){
            if(order.deliveryTime==="Lunch"){
                generateExcelData(lunchOrder,order);
                console.log("Lunch",order);
            }else{
                console.log("Dinner",order)
                generateExcelData(dinnerOrder,order)
            }
        }
    })

    // newOrder = JSON.stringify(newOrder)
    

    const fileType = 'application/vnd.openxmlformats-officedocuments.spreedsheethtml.sheet;charset=UTF-8';
    const fileExtention = '.csv';


    const exportToExcelLunch = async()=>{
        const ws = XLSX.utils.json_to_sheet(lunchOrder);
        const wb = {Sheets : {'data':ws},SheetNames:['data']};
        const excelBuffer = XLSX.write(wb, {bookType:'xlsx',type:'array'});
        const data = new Blob([excelBuffer],{type:fileType});
        FileSaver.saveAs(data,"Order list" + fileExtention);
    } 

    const exportToExcelDinner = async()=>{
        const ws = XLSX.utils.json_to_sheet(dinnerOrder);
        const wb = {Sheets : {'data':ws},SheetNames:['data']};
        const excelBuffer = XLSX.write(wb, {bookType:'xlsx',type:'array'});
        const data = new Blob([excelBuffer],{type:fileType});
        FileSaver.saveAs(data,"Order list" + fileExtention);
    } 


    return (
        <div>
            <button 
                onClick={(e)=>exportToExcelLunch()}
            >
               Lunch Excel
            </button>
            <button 
                onClick={(e)=>exportToExcelDinner()}
            >
               Dinner Excel
            </button>
        </div>
    );
};

export default ExcelGenerator;