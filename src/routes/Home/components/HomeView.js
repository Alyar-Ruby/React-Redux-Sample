import React from 'react'
import IntlTelInput from 'react-intl-tel-input';
import $ from 'jquery';
import { connect } from 'react-redux'

import './HomeView.scss'

const HomeView = ({ location }) => {
  const { query } = location
  const id = query.id

  var _input;
  function onSendSMS(e) {
    e.preventDefault();

    var intlNumber = $("#inputForm").intlTelInput("getNumber");
    alert(intlNumber);

    if (document.getElementById("inputForm")[0].checkValidity() == false)
    {
      alert("error");
      return;
    }

    alert(_input);
    // alert(this._input.value);
    return false;
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
/*          onSubmit={(e) => {
    e.preventDefault();

    if (document.getElementById("inputForm")[0].checkValidity() == false)
      return;

    alert(this._input.value);
  }}*/
        >
          <h2>Welcome to Volleto!</h2>
          <h4>Open your <b>{invitationName}</b> on Volleto app.
          We will send you a one-time SMS with the download link.</h4>

          <div className="form-group">
            <div className="input-group">
              <IntlTelInput id="phoneNumber"
                preferredCountries={['US', 'GB']}
                placeholder="Mobile Number"
                ref={ref => (_input = ref)}
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
