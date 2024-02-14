import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { data } from '../Data';
import { format } from 'date-fns';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const ChartData = () => {
  const { width } = useWindowSize();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
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
    colors: isDarkMode
      ? ['#5cb85c', '#63c', '#0961ad']
      : ['#5cb85c', '#63c', '#0961ad'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
      style: {
        color: '#000', // Change title color based on theme
      },
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
  });

  const [series2, setSeries2] = useState([
    {
      name: 'rate',
      data: seriesRate,
    },
  ]);

  useEffect(() => {}, [isDarkMode]);
  return (
    <Wrapper>
      <div id='chart-line'>
        <ReactApexChart
          options={options}
          series={series}
          type='line'
          height={options.chart.height}
        />
      </div>
      <div id='chart-line2'>
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
  .apexcharts-legend-text {
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
  }
`;
export default ChartData;
