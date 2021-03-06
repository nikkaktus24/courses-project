import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';
import { SortTypes } from '../../enums/sort-types';
import { CoursesService } from '../../services/coursesService';
import { CourseCreateRequest } from '../../models/Courses/CourseRequest';
import Loader from '../Loader';
import CourseForm from '../CourseForm';
import { ICourseForm } from '../../interfaces/Courses/course-form';
import { Course } from '../../models/Courses/Courses';

interface Props {
    match: any;
    isLoading?: boolean;
    course: Course;
    error: string;
    updateCourse: (id: string, course: CourseCreateRequest) => void;
    fetchCourse: (id: string) => void;
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
        updateCourse: (id: string, course: CourseCreateRequest) => {
            dispatch(CoursesService.updateCourse(id, course));
        },
        fetchCourse: (id: string) => {
            dispatch(CoursesService.getCourseById(id));
        },
        clear: () => {
            dispatch(CoursesService.clearErrors());
        },
    };
};

class EditCourse extends React.PureComponent<Props, any> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
        };
    }

    public updateCourse(): (courseForm: ICourseForm) => void {
        return (courseForm: ICourseForm) => {
            const request: CourseCreateRequest = CourseCreateRequest.toRequest(courseForm);
            this.props.updateCourse(this.props.course.id, request);
            this.setState({
                isEdited: true,
            });
        };
    }

    public componentDidMount(): void {
        const courseId: string = this.props.match.params.id;
        this.props.fetchCourse(courseId);
    }

    public componentWillUnmount(): void {
        this.props.clear();
    }

    public render(): React.ReactElement {
        if (this.state.isEdited) {
            return (
                <div className='cc-edit-course'>
                    <div className='cc-text cc-text__h1 cc-edit-course__title'>Курс успешно отредактирован (id: {this.props.course.id})</div>
                    <Link to='/courses'><button type='button' className='cc-btn cc-btn_red-outline'>Перейти на страницу курсов</button></Link>
                </div>
            );
        } else if (this.props.course) {
            return (
                <div className='cc-edit-course'>
                    <div className='cc-text cc-text__h1 cc-edit-course__title'>Редактирование курса</div>
                    <CourseForm course={this.props.course} callBack={this.updateCourse()}></CourseForm>
                    {this.props.isLoading ? <Loader /> : null}
                </div>
            );
        } else {
            return <Loader />;
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditCourse);
