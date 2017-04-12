import React from 'react'
import IntlTelInput from 'react-intl-tel-input';
import $ from 'jquery';
import { connect } from 'react-redux'

import './HomeView.scss'

const HomeView = ({ location }) => {
  const { query } = location
  const id = query.id

  var phoneNumber = '';

  const onPhoneNumberChanged = (status, value, countryData, number, id) => {
    if (value.length > 0)
      phoneNumber = countryData.dialCode + value;
    else
      phoneNumber = '';
  }
  const onCountryChanged = (status, value, countryData, number, id) => {
    if (status.length > 0)
      phoneNumber = value.dialCode + status;
    else
      phoneNumber = '';
  }

  function onSendSMS(e) {
    e.preventDefault();

    alert('onSendSMS: ' + phoneNumber);

    return true;
  }


  var invitationName;

  switch (id) {
    case "1":
      invitationName = "Urwerk Club Invitation";
      break;
    case "2":
      invitationName = "Bell&Ross Club Invitation";
      break;
    default:
      return (<h2>Please select ID.</h2>);
  }

  return (
    <form id="inputForm"
          role="form"
          onSubmit={onSendSMS}
        >
          <h2>Welcome to Volleto!</h2>
          <h4>Open your <b>{invitationName}</b> on Volleto app.
          We will send you a one-time SMS with the download link.</h4>

          <div className="form-group">
            <div className="input-group">
              <IntlTelInput id="phoneNumber"
                preferredCountries={['US', 'GB']}
                placeholder="Mobile Number"
                numberType = "MOBILE"
                onPhoneNumberChange={onPhoneNumberChanged}
                onSelectFlag={onCountryChanged}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Send me the App
          </button>
        </form>
  );
}

HomeView.propTypes = {
  location: React.PropTypes.any
}


function mapStateToProps (state) {
  return {
    location: state.location
  }
}

export default connect(mapStateToProps)(HomeView)
