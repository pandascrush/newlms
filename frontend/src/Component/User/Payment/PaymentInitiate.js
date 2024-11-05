import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css"; // Custom CSS for styling
import { useNavigate, useParams } from "react-router-dom";
import MySpineCoach from "../../../Asset/MySpineCoach.jpg"; // Example image

const stripePromise = loadStripe(
  "pk_test_51OT2FaSHtllxmCJSGKaAzZmIfYDedAkOkUhZqLs8GAvPlEQsasgY7zKxH0iDm4E1Nu11OEyVv7kCPp3MhvK7P85i00ecnTPLf9"
);

function PaymentInitiate() {
  const [sessionId, setSessionId] = useState(null);
  const [hasPaid, setHasPaid] = useState(false); // Track payment status
  const { id } = useParams();
  const history = useNavigate();

  // Fetch payment verification
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}user/payverify/${id}`)
      .then(res => {
        console.log(res.data.hasPaid);
        // const { hasPaid } = res.data;
        setHasPaid(res.data.hasPaid); // Update the state based on payment status
      })
      .catch(err => {
        console.error("Payment verification error:", err);
      });
  }, [id]);

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}payment/create-payment-intent/${id}`,
        {
          items: [{ name: "My Spine Coach", price: 1000, quantity: 1 }], // Adjust this data as needed
        }
      );

      const { id: sessionId } = response.data;
      setSessionId(sessionId);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe Checkout Error:", error);
      } else {
        history(`/user/${id}/payment`);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className={`payment-container ${hasPaid ? "paid-container" : ""}`}>
      <div className="payment-card">
        <div className="payment-image">
          <img src={MySpineCoach} alt="Subscription Plan" />
        </div>
        <div className="payment-details">
          <h1>Our Subscription Plan for Success</h1>
          <p>
            Get unlimited course access with a single plan designed to help you
            achieve your goals faster and more effectively.
          </p>
          {hasPaid ? (
            <div className="paid-message">
              <i className="fa fa-check-circle paid-icon"></i>
              <p className="paid-text">You have already purchased this course</p>
            </div>
          ) : (
            <button className="purchase-button" onClick={handleCheckout}>
              Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentInitiate />
  </Elements>
);

export default PaymentPage;
