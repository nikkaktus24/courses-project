import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
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

interface Props {
    children: React.ReactNode;
    courses: Course[];
    user: UserData;
    store: Course[];
    isLoading?: boolean;
    error: string;
    fetchCourses: (userId: number, start: number, pageNumber: number, sort?: SortTypes, textFragment?: string, filter?: SortTypes) => void;
    clear: () => void;
}

interface State {
    sort: SortTypes;
    textFragment: string;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        courses: state.courses.courses,
        user: state.user.userData,
        store: state.courses.store,
        isLoading: state.courses.isLoading,
        error: state.user.error,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        fetchCourses: (userId: number, start: number, pageNumber: number, sort?: SortTypes, textFragment?: string, filter?: SortTypes,) => {
            dispatch(CoursesService.fetchCoursesByUserId(userId, start, pageNumber, sort, textFragment, filter));
        },
        clear: () => {
            dispatch(CoursesService.clearErrors());
        },
    };
};

class MyOrders extends React.PureComponent<Props, any> {
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
        this.props.fetchCourses(this.props.user.id, 0, this.pageNumber);
    }

    public onChange = (event: React.SyntheticEvent<HTMLElement>): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({[target.name]: target.value}, this.fetchCourses);
    }

    public fetchCourses(): void {
        this.props.fetchCourses(this.props.user.id, 0, this.pageNumber, this.state.sort, this.state.textFragment);
    }

    public loadMore = (): void => {
        this.pageNumber++;
        this.fetchCourses();
    }

    public render(): React.ReactElement {
        if (this.props.isLoading) {
            <Loader />;
        }
        return (
            <div className='cc-course-flow'>
                <div className='cc-text cc-text__h1 cc-course-flow__title'>Мои заказы</div>
                <form className='cc-course-flow__dashboard cc-form'>
                    <div className='cc-form__contro cc-course-flow__typeahead'>
                        <label className='cc-form__label' htmlFor='textFragment'>Поиск курсов</label>
                        <input
                            onChange={this.onChange}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            name='textFragment'
                            id='textFragment' />
                    </div>
                    <div className='cc-form__contro cc-course-flow__filter'>
                        <label className='cc-form__label' htmlFor='sort'>Сортировать по</label>
                        <select
                            onChange={this.onChange}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            name='sort'
                            defaultValue={this.state.sort}
                            id='sort'>
                                <option value={null}></option>
                                {courseOptions && courseOptions.map((item: Entity<SortTypes>) => <option value={item.id} key={item.id}>{item.name}</option>)}
                            </select>
                    </div>
                </form>
                {this.props.isLoading &&
                <Loader />}
                <div className='cc-course-flow__courses'>
                    {this.props.courses &&
                this.props.courses.map((item: Course) => <Card isOrderable={true} course={item} key={item.id}></Card>)}
                </div>
                {(this.props.courses && this.props.courses.length) ? <button onClick={this.loadMore} className='cc-btn cc-btn_primary-outline cc-course-flow__button'>Загрузить еще</button> : null}
                    {(this.props.courses && !this.props.courses.length) &&
                <div className='cc-course-flow__no-data-available'>Курсы по данному запросу не найдены</div>}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyOrders);
