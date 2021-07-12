import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/app';
import AboutOne from '../components/pages/others/about-1';
import AboutTwo from '../components/pages/others/about-2';
import ContactOne from '../components/pages/others/contact-1';
import ContactTwo from '../components/pages/others/contact-2';
import FAQ from '../components/pages/others/faq';
import ComingSoon from '../components/pages/others/coming-soon';
import Login from '../components/pages/others/login';
import Activate from '../components/pages/others/activate';
import ForgetPassword from '../components/pages/others/forgetpassword';
import ResetPassword from '../components/pages/others/resetpassword';
import ErrorPage from '../components/pages/others/404';
import ThankYouPage from '../components/pages/others/thankyou';

export default function OthersRoute() {
    return (
        <Switch>
            <Route exact path={ `${process.env.PUBLIC_URL}/pages/coming-soon` } component={ ComingSoon } />

            <Layout>
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/about` } component={ AboutOne } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/about-2` } component={ AboutTwo } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/contact` } component={ ContactOne } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/contact-2` } component={ ContactTwo } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/login` } component={ Login } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/activate/:token` } component={ Activate } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/forget-password` } component={ ForgetPassword } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/reset-password/:token` } component={ ResetPassword } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/faq` } component={ FAQ } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/thank-you` } component={ ThankYouPage } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/404` } component={ ErrorPage } />
            </Layout>
        </Switch>
    );
}