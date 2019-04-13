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

interface Props {
    isLoading?: boolean;
    course: Course;
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
        course: state.courses.course,
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

    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
        };
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

    public componentWillUnmount(): void {
        this.props.clear();
    }

    public render(): React.ReactElement {
        if (this.state.isEdited) {
            return (
                <div className='cc-create-course'>
                    <div className='cc-text cc-text__h1 cc-create-course__title'>Курс успешно создан (id: {this.props.course.id})</div>
                    <Link to='/courses'><button type='button' className='cc-btn cc-btn_red-outline'>Перейти на страницу курсов</button></Link>
                </div>
            );
        } else {
            return (
                <div className='cc-create-course'>
                    <div className='cc-text cc-text__h1 cc-create-course__title'>Создание курса</div>
                    <CourseForm callBack={this.createCourse()}></CourseForm>
                    {this.props.isLoading ? <Loader /> : null}
                </div>
            );
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Store);
