import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Modal from '../Modal';
import './index.scss';
import { AuthService } from '../../services/authService';
import { SessionModel } from '../../models/Auth/SessionModel';
import { SortTypes } from '../../enums/sort-types';
import { CoursesService } from '../../services/coursesService';
import { Course } from '../../models/Courses/Courses';
import Card from '../Card';
import Loader from '../Loader';
import { UserData } from '../../models/Shared/UserData';
import { courseOptions } from '../../helpers/courseOptions';
import { Entity } from '../../models/Shared/Entity';
import UserCard from '../UserCard';

interface Props {
    user: UserData;
    users: UserData[];
    isLoadingUsers?: boolean;
    isLoadingCourses?: boolean;
    fetchUsers: () => void;
    resetUsers: () => void;
    resetCourses: () => void;
    updateUser: (request: UserData) => void;
}

interface State {
    sort: SortTypes;
    textFragment: string;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        user: state.user.userData,
        users: state.user.users,
        isLoadingCourses: state.courses.isLoading,
        isLoadingUsers: state.user.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        fetchUsers: () => {
            dispatch(AuthService.getUsers());
        },
        resetUsers: () => {
            dispatch(AuthService.resetUsers());
        },
        resetCourses: () => {
            dispatch(CoursesService.resetCourses());
        },
        updateUser: (request: UserData) => {
            dispatch(AuthService.updateUser(request));
        }
    };
};

class DataPanel extends React.PureComponent<Props, any> {
    public pageNumber: number = 1;
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            textFragment: '',
            sort: SortTypes.Date,
        };
    }

    public componentDidMount(): void {
        this.props.fetchUsers();
    }

    public onChange = (event: React.SyntheticEvent<HTMLElement>): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({[target.name]: target.value});
    }

    public onResetUsers = (): void => {
        this.props.resetUsers();
        this.props.fetchUsers();
    }

    public updateUser = (): (request: UserData) => any => {
        return (request: UserData) => {
            this.props.updateUser(request);
            this.props.fetchUsers();
        };
    }

    public render(): React.ReactElement {
        if (!this.props.user.isOwner) {
           <Redirect to='courses' />;
        }
        return (
            <div className='cc-data-panel'>
                <div className='cc-text cc-text__h1 cc-data-panel__title'>Панель данных</div>
                <div className='cc-data-panel__dashboard'>
                    <button type='button' onClick={this.onResetUsers} className='cc-btn cc-btn_red-outline'>Сбросить юзеров</button>
                    <button type='button' onClick={this.props.resetCourses} className='cc-btn cc-btn_red'>Сбросить курсы</button>
                </div>
                {this.props.isLoadingCourses || this.props.isLoadingUsers &&
                <Loader />}
                <div className='cc-course-flow__users'>
                    {this.props.users &&
                    this.props.users.map((item: UserData) => <UserCard updateUser={this.updateUser()} user={item} key={item.id}></UserCard>)}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DataPanel);
