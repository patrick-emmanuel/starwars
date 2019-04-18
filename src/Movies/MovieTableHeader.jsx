import React from "react";

const MovieTableHeader = ({ handleHeaderClick }) => (
  <thead>
    <tr>
      <th data-name="name" onClick={handleHeaderClick}>
        Name
      </th>
      <th data-name="gender" onClick={handleHeaderClick}>
        Gender
      </th>
      <th data-name="height" onClick={handleHeaderClick}>
        Height
      </th>
    </tr>
  </thead>
);

export default MovieTableHeader;
