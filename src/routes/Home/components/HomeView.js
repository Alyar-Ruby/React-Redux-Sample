import React from 'react'
import IntlTelInput from 'react-intl-tel-input';
import $ from 'jquery';
import { connect } from 'react-redux'
import branch from 'branch-sdk'

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

    if (phoneNumber.length == 0)
    {
      alert("No phone number.");
      return;
    }

    branch.init('key_live_aauzveHjvXyHWgG0uMgE0ioiCtiFUMp6', function(err, data) {
    	branch.sendSMS(
        phoneNumber,
        {
            tags: ['tag1', 'tag2'],
            channel: 'facebook',
            feature: 'dashboard',
            stage: 'new user',
            data: {
                mydata: 'something',
                foo: 'bar',
                '$desktop_url': 'http://myappwebsite.com',
                '$ios_url': 'http://myappwebsite.com/ios',
                '$ipad_url': 'http://myappwebsite.com/ipad',
                '$android_url': 'http://myappwebsite.com/android',
                '$og_app_id': '12345',
                '$og_title': 'My App',
                '$og_description': 'My app\'s description.',
                '$og_image_url': 'http://myappwebsite.com/image.png'
            }
        },
        { make_new_link: true }, // Default: false. If set to true, sendSMS will generate a new link even if one already exists. 
        function(err) { console.log(err); }
      );
    });

    // alert('onSendSMS: ' + phoneNumber);

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
