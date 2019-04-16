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

interface Props {
    isLoading?: boolean;
    store: string[];
    courses: Course[];
    error: string;
    createCourse: (course: CourseCreateRequest) => void;
    clear: () => void;
}

interface State {
    isEdited: boolean;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        courses: state.courses.courses,
        store: state.courses.store,
        isLoading: state.courses.isLoading,
        error: state.user.error,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        createCourse: (course: CourseCreateRequest) => {
            dispatch(CoursesService.createCourse(course));
        },
        clear: () => {
            dispatch(CoursesService.clearErrors());
        },
    };
};

class Store extends React.PureComponent<Props, any> {
    public state: State;
    public cost: number = 0;

    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
        };
    }

    public componentDidMount(): void {
        this.calculateCost();
    }

    public createCourse(): (courseForm: ICourseForm) => void {
        return (courseForm: ICourseForm) => {
            const request: CourseCreateRequest = CourseCreateRequest.toRequest(courseForm);
            this.props.createCourse(request);
            this.setState({
                isEdited: true,
            });
        };
    }

    public findCourse(item: Course): JSX.Element {
        return find(this.props.store, (store: string) => store === item.id) ?
            <Card isOrderable={false} course={item} key={item.id}></Card>
            : null;
    }

    public calculateCost(): void {
        this.props.courses.forEach((item: Course) => {
            if (find(this.props.store, (store: string) => store === item.id)) {
                this.cost = item.cost + this.cost;
            }
        });
    }

    public render(): React.ReactElement {
        return (
            <div className='cc-course-flow'>
                <div className='cc-text cc-text__h1 cc-edit-course__title'>Корзина</div>
            {(this.props.store && this.props.store.length) ?
                <div>
                    <div className='cc-course-flow__dashboard cc-form'>
                        Сумма {this.cost}
                        <button className='cc-btn cc-btn_primary-outline cc-course-flow__button'>Заказать</button>
                    </div>
                    <div className='cc-course-flow__courses'>
                        {this.props.courses &&
                            this.props.courses.map((item: Course) => this.findCourse(item))}
                    </div>
                </div>
                : <div className='cc-course-flow__no-data-available'>Корзина пуста</div>}
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
