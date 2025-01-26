<template>
    <div class="destination-details">
      <h1>Destination details</h1>
      <table>
        <tbody>
          <tr>
            <th>City:</th>
            <td>{{ destination.city }}</td>
          </tr>
          <tr>
            <th>Country:</th>
            <td>{{ destination.country }}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>{{ destination.price }} €</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "DestinationDetails",
    props: {
      destination: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .destination-details {
    margin: 20px;
    font-family: Arial, sans-serif;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    font-weight: bold;
    background-color: #f9f9f9;
  }
  </style>
  