import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";
import { CreditCard, ShieldCheck } from "lucide-react";

export const Payment = () => {
  const location = useLocation();
  const transaction_uuid = uuidv4();
  const total_amount = location.state?.totalAmount;

  console.log("Transaction UUID:", transaction_uuid);
  console.log("Total Amount:", total_amount);

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md shadow-lg rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">
            Complete Your Payment
          </h2>
          <p className="text-center text-gray-500 mt-1">
            Secure payment via eSewa
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold">
                  NPR {Number.parseFloat(total_amount).toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center text-green-600">
                <CreditCard className="w-8 h-8" />
              </div>
            </div>

            {/* Secure Info */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-4">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <p>Your payment information is secure and encrypted</p>
            </div>
          </div>

          {/* Payment Form */}
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="amount" value={total_amount} />
            <input type="hidden" name="tax_amount" value="0" />
            <input type="hidden" name="total_amount" value={total_amount} />
            <input
              type="hidden"
              name="transaction_uuid"
              value={transaction_uuid}
            />
            <input type="hidden" name="product_code" value="EPAYTEST" />
            <input type="hidden" name="product_service_charge" value="0" />
            <input type="hidden" name="product_delivery_charge" value="0" />
            <input
              type="hidden"
              name="success_url"
              value="http://localhost:5173/success"
            />
            <input
              type="hidden"
              name="failure_url"
              value="http://localhost:5173/failure"
            />
            <input
              type="hidden"
              name="signed_field_names"
              value="total_amount,transaction_uuid,product_code"
            />
            <input type="hidden" name="signature" value={hashInBase64} />

            <button
              type="submit"
              className="w-full py-3 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Pay with eSewa
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-center border-t p-6">
          <p className="text-xs text-gray-500">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};
