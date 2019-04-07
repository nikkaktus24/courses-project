import * as React from 'react';
import '../../assets/styles/main.scss';
import SideBar from './SideBar';
import { Redirect, Route, Switch } from 'react-router-dom';
import CoursesFlow from './CoursesFlow';
import { IAppState } from '../store/reducers';
import { connect } from 'react-redux';
import { SharedService } from '../services/sharedService';
import { UserData } from '../models/Shared/UserData';
import { AuthService } from '../services/authService';
import PrivateCard from './PrivateCard';

interface Props {
    children: React.ReactNode;
    user: UserData;
    store: string[];
    logout: () => void;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        user: state.user.userData,
        store: state.courses.store,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        logout: () => {
            dispatch(AuthService.logout());
        },
    };
};

const App = (props: Props): JSX.Element => {
    return (
        <div className='cc-app'>
            <div className='cc-app__sidebar'>
                <SideBar store={props.store} logout={props.logout} user={props.user} />
            </div>
            <div className='cc-app__main'>
                <Switch>
                    <Route exact={true} path='/' component={CoursesFlow} />
                    <Route path='/card/:id' component={PrivateCard} />
                </Switch>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
