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

interface Props {
    children: React.ReactNode;
    courses: Course[];
    store: string[];
    isLoading?: boolean;
    error: string;
    fetchCourses: (start: number, pageNumber: number, sort?: SortTypes, textFragment?: string) => void;
    clear: () => void;
    order: (store: string[]) => void;
}

interface State {
    login: string;
    password: string;
    isDisabled: boolean;
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
        fetchCourses: (start: number, pageNumber: number, sort?: SortTypes, textFragment?: string) => {
            dispatch(CoursesService.fetchCourses(start, pageNumber, sort, textFragment));
        },
        clear: () => {
            dispatch(CoursesService.clearErrors());
        },
        order: (store: string[]) => {
            dispatch(CoursesService.store(store));
        }
    };
};

class CoursesFlow extends React.PureComponent<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    public onType = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;

        if (target.value.length > 4) {
            this.props.fetchCourses(0, 1, SortTypes.Date, target.value);
        } else if (!target.value) {
            this.props.fetchCourses(0, 1);
        }
    }

    public componentDidMount(): void {
        this.props.fetchCourses(0, 1);
    }

    public order = (id: string): () => any => {
        const store: string[] = [...this.props.store, id];
       return () => this.props.order(store);
    }

    public render(): React.ReactElement {
        if (this.props.isLoading) {
            <Loader />;
        }
        return (
            <div className='cc-course-flow'>
                <form className='cc-course-flow__dashboard cc-form'>
                    <div className='cc-form__contro cc-course-flow__typeahead'>
                        <label className='cc-form__label' htmlFor='login'>Поиск курсов</label>
                        <input
                            onChange={this.onType}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            name='login'
                            id='login' />
                    </div>
                </form>
                {this.props.isLoading &&
                <Loader />}
                <div className='cc-course-flow__courses'>
                    {this.props.courses &&
                this.props.courses.map((item: Course) => <Card order={this.order(item.id)} course={item} key={item.id}></Card>)}
                </div>
                    {(this.props.courses && !this.props.courses.length) &&
                <div className='cc-course-flow__no-data-available'>No courses found</div>}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CoursesFlow);
