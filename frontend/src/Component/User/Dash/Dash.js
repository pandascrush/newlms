import React from "react";
import { Indiviualmenu } from "../UserProfile/UserProfile";
import { Message } from "../Message/Message";
import { Payment } from "../Payment/Payment";

export default function DashBoardProfile() {
  return (
    <>
      <Indiviualmenu />
    </>
  );
}

export function DashBoardMessage() {
  return (
    <>
      <Message />
    </>
  );
}

export function DashBoardPayment() {
  return (
    <>
      <Payment />
    </>
  );
}
