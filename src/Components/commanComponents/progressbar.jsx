import React from 'react';
import '../../styles/components/progressbar.css'

export default class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const sqSize = this.props.sqSize;
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * this.props.percentage) / 100;

    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${this.props.sqSize / 2} ${
            this.props.sqSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {`${this.props.percentage}%`}
        </text>
      </svg>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10,
};


// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       percentage: 25,
//     };

//     this.handleChangeEvent = this.handleChangeEvent.bind(this);
//   }

//   handleChangeEvent(event) {
//     this.setState({
//       percentage: event.target.value,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <CircularProgressBar
//           strokeWidth="10"
//           sqSize="200"
//           percentage={this.state.percentage}
//         />
//         <div>
//           <input
//             id="progressInput"
//             type="range"
//             min="0"
//             max="100"
//             step="1"
//             value={this.state.percentage}
//             onChange={this.handleChangeEvent}
//           />
//         </div>
//       </div>
//     );
//   }
// }
