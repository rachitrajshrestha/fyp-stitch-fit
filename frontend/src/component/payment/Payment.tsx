import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

export const Payment = () => {
  const location = useLocation();
  console.log(location.state);
  let transaction_uuid = uuidv4();
  let total_amount = location.state?.totalAmount;

  let message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
  var hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash); // ✅ Matching name

  console.log(hashInBase64);
  return (
    <>
      <body>
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          <input
            type="text"
            id="amount"
            name="amount"
            value={total_amount}
            required
          />
          <input
            type="text"
            id="tax_amount"
            name="tax_amount"
            value="0"
            required
          />
          <input
            type="text"
            id="total_amount"
            name="total_amount"
            value={total_amount}
            required
          />
          <input
            type="text"
            id="transaction_uuid"
            name="transaction_uuid"
            value={transaction_uuid}
            required
          />
          <input
            type="text"
            id="product_code"
            name="product_code"
            value="EPAYTEST"
            required
          />
          <input
            type="text"
            id="product_service_charge"
            name="product_service_charge"
            value="0"
            required
          />
          <input
            type="text"
            id="product_delivery_charge"
            name="product_delivery_charge"
            value="0"
            required
          />
          <input
            type="text"
            id="success_url"
            name="success_url"
            value="http://localhost:5173/success"
            required
          />
          <input
            type="text"
            id="failure_url"
            name="failure_url"
            value="http://localhost:5173/failure"
            required
          />
          <input
            type="text"
            id="signed_field_names"
            name="signed_field_names"
            value="total_amount,transaction_uuid,product_code"
            required
          />
          <input
            type="text"
            id="signature"
            name="signature"
            value={hashInBase64}
            required
          />
          <input value="Submit" type="submit"></input>
        </form>
      </body>
    </>
  );
};
