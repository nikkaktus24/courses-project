import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import './index.scss';
import { AuthService } from '../../services/authService';
import { SessionModel } from '../../models/Auth/SessionModel';

interface Props {
    children: React.ReactNode;
    isLoggedIn?: boolean;
    isLoading?: boolean;
    error: string;
    auth?: (model: SessionModel) => void;
    clear?: () => void;
}

interface State {
    login: string;
    password: string;
    isDisabled: boolean;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        isLoggedIn: state.user.isLoggedIn,
        error: state.user.error,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        auth: (model: SessionModel) => {
            dispatch(AuthService.fetchSession(model));
        },
        clear: () => {
            dispatch(AuthService.clearErrors());
        }
    };
};

class CoursesFlow extends React.PureComponent<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    public render(): React.ReactElement {
        return (
            null
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CoursesFlow);