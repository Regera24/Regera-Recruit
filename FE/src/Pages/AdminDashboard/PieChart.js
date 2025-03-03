import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = (props) => {
  const {company} =  props;
  console.log(company)
  const config = {
    theme:'classic',
    data: [
      { type: 'Reject', value: 5 },
      { type: 'Accept', value: 10 },
      { type: 'Processing', value: 20 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    scale: { color: { palette: "paired" } },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 0,
      },
    },
  };
  return <Pie {...config} />;
};

export default DemoPie;