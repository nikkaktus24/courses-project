import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { CoursesService } from '../../services/coursesService';
import Loader from '../Loader';
import { UserData } from '../../models/Shared/UserData';
import { OrderCoursesRequest } from '../../interfaces/Courses/order-courses-request';
import { AuthService } from '../../services/authService';

interface Props {
    isLoading?: boolean;
    user: UserData;
    updateUser: (request: UserData) => void;
}

interface State {
    isEdited: boolean;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        user: state.user.userData,
        isLoading: state.courses.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        updateUser: (request: UserData) => {
            dispatch(AuthService.updateUser(request));
        },
    };
};

class UserCard extends React.PureComponent<Props, any> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
        };
    }

    public componentDidMount(): void {
    }

    public orderCourses = (): void => {
        // this.props.orderCourses(request);
    }

    public render(): React.ReactElement {
        console.log(this.props.user);
        return (
            <div className='cc-user-card-wrapper'>
            {!this.state.isEdited ?
                <div className='cc-user-card'>
                    <div>{this.props.user.id}</div>
                    <div className='cc-user-card__login'>{this.props.user.login}</div>
                    <div className='cc-user-card__name'>{this.props.user.name.getFullName()}</div>
                    <div className='cc-user-card__coins'>{this.props.user.coins}</div>
                    <div>{this.props.user.isAdmin ? 'Администратор' : 'Не администратор'}</div>
                </div>
                : <div className='cc-user-card'>
                </div>
            }
            {this.props.isLoading &&
                <Loader />}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserCard);
