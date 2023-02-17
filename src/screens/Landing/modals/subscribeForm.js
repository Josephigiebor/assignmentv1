/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import SelectCountryDropdown from '../../../components/SelectCountryDropdown';
import { useApi } from '../../../utils/hooks';
import { showAlert } from '../../../utils/notifications';
import { useUrlQuery } from '../../../utils/router';
import { MODAL_SCREENS } from './constants';

const KEY = '6LdxyZAeAAAAAJJHHG8tKKGp7GeGVHR6hFLl1FfW';
const handleAnalytics = () => {
  window.dotq = window.dotq || [];
  window.dotq.push({
    projectId: '10000',
    properties: { pixelId: '10174444', qstrings: { et: 'custom', ec: 'Registration' } },
  });
};

const SubscribeForm = ({ onChangeScreen , headerChange , setHeaderChange , firstName , setFirstName }) => {
 console.log(headerChange , setHeaderChange , setFirstName , firstName);
  const recaptchaRef = useRef();
  const query = useUrlQuery();
  const [form, setForm] = useState({
    firstName : "",
    email: '',
    selectedCountry: null,
    withNano: null,
  });
  const {
    data,
    error,
    isLoading,
    refetch: submitData,
  } = useApi('post', '/v2/waiting_list', { type: 'ledger' });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

// use handleNameChange for name onchange so save value to setFirstName
// when we save the changes onChange we transfer it to Header as firstName
  const handleNameChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
    setFirstName(value);
  };

  useEffect(() => {
    if (error) {
      const { message } = error;
      showAlert({ message, type: 'warning' });
    } else if (data) {
      const { alreadyAdded, status, message } = data;
      if (alreadyAdded) {
        showAlert({ message: 'Email was already added', type: 'danger' });
      } else if (status >= 400) {
        showAlert({ message, type: 'warning' });
      } else {
        onChangeScreen(MODAL_SCREENS[1]);
      }
    }
  }, [data, error]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();

     // when we submit the form we change the header xhange to true .
     // Now we go to Hedaer we stored sent headerChange as props
    if (form.firstName && form.email && form.selectedCountry.id ) {
      setHeaderChange(true);
    }

    if (form.firstName !== form.email !== form.selectedCountry.id ) {
      setHeaderChange(false);
    }


    submitData({
      firstName : form.firstName,
      email: form.email,
      countryId: form.selectedCountry.id,
      sourceReferralCode: query.get('ref') || null,
      withNano: form.withNano,
      utm_source: query.get('utm_source') || null,
      utm_medium: query.get('utm_medium') || null,
      utm_campaign: query.get('utm_campaign') || null,
      utm_content: query.get('utm_content') || null,
      recaptchaValue,
    });
    handleAnalytics();
  };
  return (
    <div className="form">
      <p className="header upper-case text-h1">Join the waitlist</p>
      <div>
        <p className="text-f5">
          Refer your friends and be first in line for a free physical card and early access. The
          more people you refer, the more you move up in line.
        </p>
        <p className="text-f5">Join the waitlist to get your exclusive referral link.</p>
        <p className="text-f5">
          <i>
            To receive your reward, you need to enter the email address you’ll use for creating your
            card account.
          </i>
        </p>
      </div>
      <form onSubmit={handleSubmitForm} id="confirm-phone-form" style={{ marginTop: '2.563rem' }}>
        <div className="form-group mb-4">
          <input
            name="email"
            type="email"
            className="form-control-input"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <label className="floating-label">Enter your email</label>
        </div>
        <div className="form-group mb-4">
          <input
            name="firstName"
            type="name"
            className="form-control-input"
            placeholder="Enter your firstName"
            onChange={handleNameChange}
            required
          />

          <label className="floating-label">Enter your firstName</label>
        </div>
        <div className="select-group">
          {form.selectedCountry && (
            <label style={{ fontSize: '0.75rem', color: '#c3c3c3' }}>
              Enter your country of residenceesssss
            </label>
          )}
          <SelectCountryDropdown
            name="selectedCountry"
            value={form.selectedCountry}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <p>Are you VetCoin MetaVerse Member?</p>
          <div className="d-flex flex-row align-items-center justify-content-start">

            <label className="w-50 d-flex flex-row align-items-center">
              <input
                onChange={() => handleChange({ target: { value: true, name: 'withNano' } })}
                checked={form.withNano === true}
                className="me-2 form-check-input"
                type="radio"
              />
              <span>Yes</span>
            </label>
            <label className="w-50 d-flex flex-row align-items-center">
              <input
                onChange={() => handleChange({ target: { value: false, name: 'withNano' } })}
                checked={form.withNano === false}
                className="me-2 form-check-input"
                type="radio"
              />
              <span>No</span>
            </label>
          </div>
          <div className="mt-4">
            <ReCAPTCHA ref={recaptchaRef} sitekey={KEY} theme="dark" />
          </div>
        </div>
        <button type="submit" className="w-100 btn btn-primary btn-wide">
          {isLoading ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Join'}
        </button>
      </form>
    </div>
  );
};
export default SubscribeForm;

SubscribeForm.propTypes = {
  onChangeScreen: PropTypes.func.isRequired,
  headerChange : PropTypes.bool.isRequired,
  setHeaderChange : PropTypes.func.isRequired,
  firstName : PropTypes.string.isRequired,
  setFirstName : PropTypes.func.isRequired
};
