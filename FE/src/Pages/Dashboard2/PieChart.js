import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = (props) => {
  const {company} =  props;
  console.log(company)
  const config = {
    theme:'classic',
    data: [
      { type: 'Employees', value: company.quantityPeople },
      { type: 'Candidates', value: company.numberOfCv },
      { type: 'Jobs', value: company.jobDTOList.length },
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