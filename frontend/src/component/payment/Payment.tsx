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
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  console.log(hashInBase64);
  return (
    <>
      <body>
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
          <div className="w-full max-w-md shadow-lg rounded-lg bg-white overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-center">
                Complete Your Payment
              </h2>
              <p className="text-center text-gray-500 mt-1">
                Secure payment via eSewa
              </p>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold">
                      NPR {Number.parseFloat(total_amount).toLocaleString()}
                    </p>
                  </div>
                  {/* Replaced Lucide CreditCard icon with a simple CSS-based icon */}
                  <div className="h-10 w-10 flex items-center justify-center text-green-600">
                    <div className="w-8 h-6 border-2 border-current rounded-md relative">
                      <div className="absolute top-7 left-0 w-8 h-1 bg-green-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                {/* Replaced Lucide ShieldCheck icon with a simple Unicode symbol */}
                <span className="text-green-600 text-lg">✓</span>
                <p>Your payment information is secure and encrypted</p>
              </div>

              <form
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                className="space-y-4"
              >
                {/* Hidden fields - not visible to user but still submitted */}
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
                  className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Pay with eSewa
                </button>
              </form>
            </div>

            {/* Card Footer */}
            <div className="flex justify-center border-t p-6">
              <p className="text-xs text-gray-500">
                By proceeding, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
