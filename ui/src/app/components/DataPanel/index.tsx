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
    isLoading?: boolean;
    fetchUsers: () => void;
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
        isLoading: state.courses.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        fetchUsers: () => {
            dispatch(AuthService.getUsers());
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

    public render(): React.ReactElement {
        if (this.props.isLoading) {
            <Loader />;
        }
        if (!this.props.user.isOwner) {
           <Redirect to='courses' />;
        }
        return (
            <div className='cc-data-panel'>
                <div className='cc-text cc-text__h1 cc-data-panel__title'>Панель данных</div>
                <div className='cc-data-panel__dashboard'>
                    <button type='button' className='cc-btn cc-btn_red-outline'>Сбросить юзеров</button>
                    <button type='button' className='cc-btn cc-btn_red'>Сбросить курсы</button>
                </div>
                {this.props.isLoading &&
                <Loader />}
                <div className='cc-course-flow__users'>
                    {this.props.users &&
                    this.props.users.map((item: UserData) => <UserCard user={item} key={item.id}></UserCard>)}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DataPanel);
