import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import useGetOrderTime from "../../hooks/useGetOrderTime";
import useGetDate from "../../hooks/useGetDate";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    color: "green",
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    borderBottom: "1px solid black",
  },
  header: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 0,
    lineHeight: 0,
    display: "inline",
    padding: 0,
    textAlign: "center",
    color: "black",
    fontWeight: 900,
  },
  details1: {
    fontSize: 12,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    textAlign: 'center',
    marginHorizontal: 30,
  },
  details2: {
    fontSize: 12,
    lineHeight: 2,
    marginHorizontal: 30,
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  custom: {
    display: "inline",
    padding: "0px",
    margin: "0px",
    lineHeight: "0px",
    color: "black"
  },
  total: {
    lineHeight: 0,
    margin: 0,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    paddingVertical: 2.5,
  },
  time: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 400,
    display: "inline",
    padding: "0px",
    margin: "0px",
    lineHeight: "0px",
    color: "black"
  }
});
const DinnerORderPDF = () => {
  const { lunchOrder, dinnerOrder } = useGetOrderTime();
  const {today} = useGetDate();
  console.log(lunchOrder);
  return (
    <Document style={styles.body}>
      {dinnerOrder?.map((order) => (
        <Page key={order.id} size="A7">
        <Text style={styles.header}>JomTaPAU</Text>
        <Text style={styles.time}>{today} | {order.time}</Text>
        <view style={styles.details1}>
          <Text style={styles.custom}>{order.address}</Text>
          <Text style={styles.custom}>{order.roomNumber}</Text>
          <Text style={styles.custom}>Name: {order.name}</Text>
          <Text style={styles.custom}>{order.phone}</Text> 
        </view>
        <view style={styles.details2}>
          <Text>Time: {order.time}</Text>
          <Text>Food: {order.food}</Text>
          <Text style={styles.total}>Total:RM {order.total} </Text>
        </view>
      </Page>
      ))}
    </Document>
  );
};

export default DinnerORderPDF;
