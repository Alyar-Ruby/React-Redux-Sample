import React from 'react'
import IntlTelInput from 'react-intl-tel-input';
import { connect } from 'react-redux'

import './HomeView.scss'

const HomeView = ({ location }) => {
  const { query } = location
  const id = query.id

  var invitationName;

  switch (id) {
    case "1":
      invitationName = "Urwerk Club Invitation";
      break;
    case "2":
      invitationName = "Bell&Ross Club Invitation";
      break;
    default:
      return (<div></div>);
  }

  return (
    <form id="inputForm"
          role="form"
/*          onSubmit={(e) => {
    e.preventDefault();

    if (document.getElementById("inputForm")[0].checkValidity() == false)
      return;

    alert(this._input.value);
  }}*/
        >
          <h2>Welcome to Volleto!</h2>
          <h5>Open your <b>{invitationName}</b> on Volleto app.
          We will send you a one-time SMS with the download link.</h5>

          <div className="form-group">
            <div className="input-group">
              <IntlTelInput
                preferredCountries={['US', 'GB']}
                placeholder="Mobile Number"
                /*ref={ref => (this._input = ref)}*/
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
