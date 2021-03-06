import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';
import { CoursesService } from '../../services/coursesService';
import { CourseCreateRequest } from '../../models/Courses/CourseRequest';
import Loader from '../Loader';
import CourseForm from '../CourseForm';
import { ICourseForm } from '../../interfaces/Courses/course-form';
import { Course } from '../../models/Courses/Courses';
import Card from '../Card';
import { find } from 'lodash';
import { UserData } from '../../models/Shared/UserData';
import { OrderCoursesRequest } from '../../interfaces/Courses/order-courses-request';

interface Props {
    isLoading?: boolean;
    store: Course[];
    courses: Course[];
    userData: UserData;
    error: string;
    orderCourses: (request: OrderCoursesRequest) => void;
    clear: () => void;
    deleteCourse: (store: Course[], course: Course) => void;
}

interface State {
    isEdited: boolean;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        courses: state.courses.courses,
        store: state.courses.store,
        userData: state.user.userData,
        isLoading: state.courses.isLoading,
        error: state.user.error,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        orderCourses: (request: OrderCoursesRequest) => {
            dispatch(CoursesService.orderCourses(request));
        },
        clear: () => {
            dispatch(CoursesService.clearErrors());
        },
        deleteCourse: (store: Course[], course: Course) => {
            const result: Course[] = store.filter((item: Course) => {
                return item.id !== course.id;
            });
            dispatch(CoursesService.store(result));
        },
    };
};

class Store extends React.PureComponent<Props, any> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
        };
    }

    public componentDidMount(): void {
        this.calculateCost();
    }

    public orderCourses = (): void => {
        const courseIds: string[] = this.props.store.map((course: Course) => course.id);
        const request: OrderCoursesRequest = new OrderCoursesRequest(this.props.userData.id, courseIds, this.calculateCost());
        this.props.orderCourses(request);
    }

    public deleteCourse = (course: Course): () => any => {
        return () => this.props.deleteCourse(this.props.store, course);
    }

    public calculateCost(): number {
        let cost: number = 0;
        this.props.store.forEach((item: Course) => {
            cost = item.cost + cost;
        });

        return cost;
    }

    public render(): React.ReactElement {
        return (
            <div className='cc-store'>
                <div className='cc-text cc-text__h1 cc-store__title'>Корзина</div>
            {(this.props.store && this.props.store.length) ?
                <div>
                    <div className='cc-store__dashboard cc-form'>
                        Сумма {this.calculateCost()}
                        <button disabled={this.calculateCost() > this.props.userData.coins} onClick={this.orderCourses} className='cc-btn cc-btn_primary-outline cc-store__button'>Заказать</button>
                    </div>
                    <div className='cc-store__courses'>
                        {this.props.courses &&
                            this.props.store.map((item: Course) => <Card isOrderable={false} deleteCourse={this.deleteCourse(item)} course={item} key={item.id}></Card>)}
                    </div>
                </div>
                : <div className='cc-store__no-data-available'>Корзина пуста</div>}
            {this.props.isLoading &&
                <Loader />}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Store);
