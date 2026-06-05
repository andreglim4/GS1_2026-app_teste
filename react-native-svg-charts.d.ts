declare module 'react-native-svg-charts' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface LineChartProps extends ViewProps {
    data: number[];
    svg?: any;
    contentInset?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    curve?: any;
    style?: any;
  }

  export class LineChart extends Component<LineChartProps> {}
}

declare module 'd3-shape' {
  export function curveLinear(): any;
  export function curveMonotoneX(): any;
  export function curveNatural(): any;
}
