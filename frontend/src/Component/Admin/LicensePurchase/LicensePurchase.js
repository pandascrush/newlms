import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./LicensePurchase.css";
const stripePromise = loadStripe(
    "pk_test_51OT2FaSHtllxmCJSGKaAzZmIfYDedAkOkUhZqLs8GAvPlEQsasgY7zKxH0iDm4E1Nu11OEyVv7kCPp3MhvK7P85i00ecnTPLf9"
  );

export function LicensePurchase() {
  const itemName = "License";
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const nav = useNavigate();

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Redirect based on selected payment method
  function handlecheck() {
    window.location.assign(`/admindashboard/${id}/check/${quantity}`);
  }

  function handleneft() {
    window.location.assign(`/admindashboard/${id}/neft/${quantity}`);
  }

  // Checkout function for online payment
  function checkout(itemPrice, quantity) {
    fetch(`${process.env.REACT_APP_API_URL}admin/create-checkout-session/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        items: [
          { id: 1, quantity: quantity, price: itemPrice, name: itemName },
        ],
      }),
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
      )
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  }

  return (
    <div className="container-fluid">
      <div className="p-5">
        <h3 className="text-center">We Provide Best Catalogue</h3>
      </div>
      
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 mb-4 mx-auto">
              <div className="card h-100 shadow-lg">
                <div className="card-body">
                  <div className="text-center p-3">
                    <span className="h2">$20</span>/License
                    <br />
                    <br />
                    <h4>
                      <button onClick={increment} className="btn neftbtn1  px-3">
                        +
                      </button>
                      <span className="btquantity py-2 px-3 rounded-5">{quantity}</span>
                      
                      
                      <button onClick={decrement} className="btn neftbtn1  px-3 rounded-2">
                        -
                      </button>
                    </h4>
                    <br />
                  </div>
                  <p className="card-text">
                    For most businesses that want to optimize web queries
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-check"></i> Access catalog of 5,800+
                    from top universities and companies
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-check"></i> Co-branded experience with
                    learner priority technical support
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-check"></i> Skills platform for insights
                    and analytics
                  </li>
                </ul>
                <div className="card-body text-center">
                  <button
                    className="btn neftbtn btn-lg mx-2"
                    onClick={() => {
                      checkout(20, quantity);
                    }}
                    style={{ borderRadius: "30px" }}
                  >
                    Online Payment
                  </button>
                  <button
                    className="btn neftbtn btn-lg mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ borderRadius: "30px" }}
                  >
                    Offline Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Modal for Offline Payment Selection */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header modleborderbottom">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Payment Mode
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body p-5">
                    <h5>Choose the payment method types.</h5>
                    <div className="d-flex justify-content-between py-3">
                      <button
                        type="button"
                        className="btn neftbtn"
                        onClick={handleneft}
                      >
                        NEFT
                      </button>
                      <button
                        type="button"
                        className="btn neftbtn"
                        onClick={handlecheck}
                      >
                        Cheque
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
}
