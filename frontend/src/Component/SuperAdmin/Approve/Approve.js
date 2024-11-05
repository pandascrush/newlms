import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";

export function Approve() {
  const [checktransation, setChecktransation] = useState([]);
  const [checkapproved, setCheckapproved] = useState([]);
  const [nefttransation, setnefttransation] = useState([]);
  const [neftapproved, setneftapproved] = useState([]);
  var id = "6c7b260c-6025-4899-939a-b72cf49cb317";
  const [activeTable, setActiveTable] = useState(1);
  const [activeTable2, setActiveTable2] = useState(1);
  const [transationid, setTransationid] = useState("");
  const changeTable = (tableNumber) => {
    setActiveTable(tableNumber);
  };
  const changeTable1 = (tableNumber) => {
    setActiveTable2(tableNumber);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}superadmin/getcheck`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChecktransation(data);
      });

    fetch(`${process.env.REACT_APP_API_URL}superadmin/checkapproved`)
      .then((res) => res.json())
      .then((data) => setCheckapproved(data));

    fetch(`${process.env.REACT_APP_API_URL}superadmin/getneft`)
      .then((res) => res.json())
      .then((data) => setnefttransation(data));

    fetch(`${process.env.REACT_APP_API_URL}superadmin/neftapproved`)
      .then((res) => res.json())
      .then((data) => setneftapproved(data));
  }, []);

  function handleupdate(event) {
    event.preventDefault();
    var transationid = document.getElementById("transationid").value;
    var email = document.getElementById("email").innerText;
    var id = document.getElementById("id").innerText;
    var quantity = document.getElementById("quantity").innerText;
    var amount = document.getElementById("amount").innerText;
    var key = {
      transationid: transationid,
      id: id,
      email: email,
      quantity: quantity,
      amount: amount,
    };
    console.log(key);

    if (transationid === "") {
      alert("plz fill the transation id");
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}superadmin/checkupdate`, key)
        .then((res) => {
          if (res.data.status === "updated") {
            alert("Approved");
            window.location.reload();
          }
        });
    }
  }

  function handleupdateneft(event) {
    event.preventDefault();
    var transationid = document.getElementById("nefttransationalid").innerText;
    var email = document.getElementById("neftemail").innerText;
    var id = document.getElementById("neftid").innerText;
    var quantity = document.getElementById("neftquantity").innerText;
    var amount = document.getElementById("neftamount").innerText;
    var key = {
      transationid: transationid,
      id: id,
      email: email,
      quantity: quantity,
      amount: amount,
    };
    console.log(key);

    if (transationid === "") {
      alert("plz fill the transation id");
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}superadmin/neftupdate`, key)
        .then((res) => {
          if (res.data.status === "updated") {
            alert("Approved");
            window.location.reload();
          }
        });
    }
  }

  return (
    <>
      <div class="card shadow border-0 mb-7">
        <div class="card-header d-flex justify-content-between">
          <h5 class="mb-0 pointer">Cheque Transaction</h5>
          {activeTable === 1 ? (
            <button
              class="mb-0 pointer btn btn-success"
              onClick={() => changeTable(2)}
            >
              Approved
            </button>
          ) : (
            <h5
              class="mb-0 pointer btn btn-primary"
              onClick={() => changeTable(1)}
            >
              Waiting for Approval
            </h5>
          )}
        </div>
        <div class="table-responsive">
          <table class="table table-hover table-nowrap">
            <thead class="thead-light">
              <tr>
                <th scope="col" className="text-light">Id</th>
                <th scope="col" className="text-light">email</th>
                <th scope="col" className="text-light">Cheque Number</th>
                <th scope="col" className="text-light">Transaction Id</th>
                <th cope="col" className="text-light">quantity</th>
                <th cope="col" className="text-light">Amount</th>
                <th cope="col" className="text-light">Action</th>
              </tr>
            </thead>
            {activeTable === 1 && (
              <tbody>
                {checktransation.map((value, index) => (
                  <tr>
                    <td id="id">
                      {/* <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"/> */}
                      <a class="text-heading font-semibold" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td id="email">{value.email}</td>
                    <td>{value.checkno}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter the Transation Id"
                        name="transationid"
                        id="transationid"
                      />
                    </td>
                    <td id="quantity">{value.quantity}</td>
                    <td id="amount">{value.amount}</td>
                    <td>
                      <i
                        class="bi bi-check btn btn-success"
                        onClick={handleupdate}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {activeTable === 2 && (
              <tbody>
                {checkapproved.map((value, index) => (
                  <tr>
                    <td>
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        class="avatar avatar-sm rounded-circle me-2"
                      />
                      <a class="text-heading font-semibold" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td>{value.email}</td>
                    <td>{value.checkno}</td>
                    <td>{value.transaction_id}</td>
                    <td id="quantity">{value.quantity}</td>
                    <td id="amount">{value.amount}</td>
                    <td>
                      <p className="text-success">Approved</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div class="card-footer border-0 py-5">
          <span class="text-muted text-sm">
            Showing 10 items out of 250 results found
          </span>
        </div>
      </div>

      <div class="card shadow border-0 mb-7">
        <div class="card-header d-flex justify-content-between">
          <h5 class="mb-0 pointer">NEFT Transaction</h5>
          {activeTable2 === 1 ? (
            <button
              class="mb-0 pointer btn btn-success"
              onClick={() => changeTable1(2)}
            >
              Approved
            </button>
          ) : (
            <h5
              class="mb-0 pointer btn btn-primary"
              onClick={() => changeTable1(1)}
            >
              Waiting for Approval
            </h5>
          )}
        </div>
        <div class="table-responsive">
          <table class="table table-hover table-nowrap">
            <thead class="thead-light">
              <tr>
                <th scope="col" className="text-light">Id</th>
                <th scope="col" className="text-light">email</th>
                <th scope="col" className="text-light">Transaction Id</th>
                <th cope="col" className="text-light">quantity</th>
                <th cope="col" className="text-light">Amount</th>
                <th cope="col" className="text-light">Action</th>
              </tr>
            </thead>
            {activeTable2 === 1 && (
              <tbody>
                {nefttransation.map((value, index) => (
                  <tr>
                    <td id="neftid">
                      {/* <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"/> */}
                      <a class="text-heading font-semibold" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td id="neftemail">{value.email}</td>
                    <td id="nefttransationalid">{value.transaction_id}</td>
                    <td id="neftquantity">{value.quantity}</td>
                    <td id="neftamount">{value.amount}</td>
                    <td>
                      <i
                        class="bi bi-check btn btn-success"
                        onClick={handleupdateneft}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {activeTable2 === 2 && (
              <tbody>
                {neftapproved.map((value, index) => (
                  <tr>
                    <td>
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        class="avatar avatar-sm rounded-circle me-2"
                      />
                      <a class="text-heading font-semibold" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td id="neftemail">{value.email}</td>
                    <td id="nefttransationalid">{value.transaction_id}</td>
                    <td id="neftquantity">{value.quantity}</td>
                    <td id="neftamount">{value.amount}</td>
                    <td>
                      <p className="text-success">Approved</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div class="card-footer border-0 py-5">
          <span class="text-muted text-sm">
            Showing 10 items out of 250 results found
          </span>
        </div>
      </div>
    </>
  );
}
