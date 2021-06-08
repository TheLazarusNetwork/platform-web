import React from 'react'
import zxcvbn from 'zxcvbn'
import './../styles/components/PasswordStrengthMeter.css'

let createPasswordLabel = (score) => {
    switch (score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }

export default function PasswordStrengthMeter(props) {

    const {password} = props;
    const {score} = zxcvbn(password);



    return (
        <div className='password-strength-meter'>
            <progress 
            className={`password-strength-meter-progress strength-${createPasswordLabel(score)}`}
                value ={score}
                max="4"
                />
                {/* <label className="password-strength-meter-label">
                    {createPasswordLabel(score)}
            </label> */}
        </div>
    )
}
