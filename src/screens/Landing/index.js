import React, { useState } from 'react';
import SubscribeModal from './modals';
import { MODAL_SCREENS } from './modals/constants';
import SubscribeForm from './modals/subscribeForm';
import Success from './modals/success';
import FaqModal from './modals/faq';
import { TermsConditions, Cover, Header } from './partials';
import PageLayout from './partials/Layout';

const Landing = () => {
  const [currentScreen, setCurrentScreen] = useState(MODAL_SCREENS[0]);
  const [headerChange , setHeaderChange] = useState(true) // create headerChabge
  const [firstName , setFirstName] = useState(""); // create firtsname
  // place them as props to in Header and SubscribeForm
  // headerChange ?
  return (
    <PageLayout>
      <Header firstName = {firstName}  headerChange = {headerChange } setHeaderChange = {setHeaderChange} />
      <Cover />
      <SubscribeModal   screens={MODAL_SCREENS} currentScreen={currentScreen}>
        <SubscribeForm  setFirstName = {setFirstName} firstName = {firstName} headerChange = {headerChange } setHeaderChange = {setHeaderChange} onChangeScreen={setCurrentScreen} />
        <Success onChangeScreen={setCurrentScreen} />
      </SubscribeModal>
      <TermsConditions />
      <FaqModal />
    </PageLayout>
  );
};

export default Landing;