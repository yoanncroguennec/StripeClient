import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51IMB74DCutNgHcFWaidAYqaR0regtqB4UnXtHZpYQWVF0F9k98zWZ0WP9ceBfRoE3SNZ4xiN8pjePOiHn6muiC5r00CdbpopJB";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
