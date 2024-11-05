import * as React from "react";
import "./Admincredential.css"; // Assuming you have some styles here

export default function AdminCredential() {
  return (
    <div className="mt-5">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mr.Dev</td>
            <td>Dev@gmail.com</td>
            <td>89876788765</td>
            <td>9.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
