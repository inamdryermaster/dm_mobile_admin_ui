import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { data } from './Data';
import { format } from 'date-fns';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useWindowSize } from '../../../../../../../hooks/useWindowSize';

const ChartData = () => {
  const { width } = useWindowSize();
  const seriesInlet = data.map((item) => {
    return {
      x: format(new Date(item.createdAt), 'EEE hh:mm'),
      y: item.inlet.toFixed(0),
    };
  });

  const seriesOutlet = data.map((item) => {
    return {
      x: format(new Date(item.createdAt), 'EEE hh:mm'),
      y: item.outlet.toFixed(0),
    };
  });

  const seriesTarget = data.map((item) => {
    return {
      x: format(new Date(item.createdAt), 'EEE hh:mm'),
      y: item.target.toFixed(0),
    };
  });

  const seriesRate = data.map((item) => {
    return {
      x: format(new Date(item.createdAt), 'EEE hh:mm'),
      y: item.rate.toFixed(0),
    };
  });

  const [options, setOptions] = useState({
    chart: {
      id: 'chart2',
      group: 'social',
      type: 'line',
      height: 350,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },

      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    colors: ['#5cb85c', '#63c', '#0961ad'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Moisture',
      align: 'left',
    },
    xaxis: {
      type: 'category',
      tickAmount:
        // width bigger than 768px than 10 if screen is bigger than 920px than 20
        width > 768 ? (width > 920 ? 15 : 8) : 7,
      labels: {
        style: {
          colors: '#000',
        },
        formatter: function (val) {
          return val;
        },
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'inlet',
      data: seriesInlet,
    },
    {
      name: 'target',
      data: seriesTarget,
    },
    {
      name: 'outlet',
      data: seriesOutlet,
    },
  ]);

  const [options2, setOptions2] = useState({
    chart: {
      id: 'chart2',
      group: 'social',
      type: 'line',
      height: 300,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },

      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },

    colors: ['#f0ad4e'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Rate',
      align: 'left',
    },
    xaxis: {
      type: 'category',
      tickAmount:
        // width bigger than 768px than 10 if screen is bigger than 920px than 20
        width > 768 ? (width > 920 ? 15 : 8) : 7,
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true, // Add this line
    },
  });

  const [series2, setSeries2] = useState([
    {
      name: 'rate',
      data: seriesRate,
    },
  ]);

  useEffect(() => {}, []);
  return (
    <Wrapper>
      <div
        id='chart-line'
        className='chart-line'>
        <ReactApexChart
          options={options}
          series={series}
          type='line'
          height={options.chart.height}
        />
      </div>
      <div
        id='chart-line2'
        className='chart-line2'>
        <ReactApexChart
          options={options2}
          series={series2}
          type='line'
          height={options2.chart.height}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
  .apexcharts-toolbar {
    margin-right: 1rem;
  }

  .apexcharts-title-text {
    fill: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
  }
  .apexcharts-xaxis-label,
  .apexcharts-yaxis-label {
    fill: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
  }

  .apexcharts-tooltip {
    background: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#333' : '#fff'} !important;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
    text-transform: capitalize;
  }
  .apexcharts-tooltip-title {
    background: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#000' : ''} !important;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
  }
  .apexcharts-legend-text {
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
    text-transform: capitalize;
  }

  .chart-line,
  .chart-line2 {
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#000' : '#fff'};

    margin: 0 1rem;
  }
  .chart-line {
  }
  .chart-line2 {
  }
`;
export default ChartData;
