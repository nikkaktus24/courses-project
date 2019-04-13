import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { AuthService } from '../../services/authService';
import { SessionModel } from '../../models/Auth/SessionModel';
import * as moment from 'moment';
import { ICourseForm } from '../../interfaces/Courses/course-form';
import { Course } from '../../models/Courses/Courses';
import { isDateValid } from '../../helpers/dateValidators';

interface Props {
    isLoading: boolean;
    error: string;
    course?: Course;
    callBack: (form: ICourseForm) => void;
}

interface State extends ICourseForm {
    isDisabled: boolean;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        isLoading: state.courses.isLoading,
        error: state.courses.error,
    };
};

class CourseForm extends React.PureComponent<Props, any> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.course ? props.course.name : '',
            description: props.course ? props.course.description : '',
            cost: props.course ? props.course.cost : '',
            length: props.course ? props.course.length : '',
            isTopRated: props.course ? props.course.isTopRated : false,
            date: props.course ? props.course.date.format('DD/MM/YYYY') : '',
            isDisabled: true,
        };
    }

    public onChange = (event: React.SyntheticEvent<HTMLElement>): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({[target.name]: target.value}, this.validation);
    }

    public componentDidMount(): void {
        this.validation();
    }

    public onSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.props.callBack(this.state);
    }

    public validation(): void {
        this.setState({isDisabled: !(!!this.state.name && !!this.state.description
            && isDateValid(this.state.date)
            && !!this.state.cost && !!this.state.length)});
    }


    public render(): React.ReactElement {
        return (
            <div className='cc-course-form'>
                <form className='cc-form' onSubmit={this.onSubmit}>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='name'>Название</label>
                        <input
                            onChange={this.onChange}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            name='name'
                            value={this.state.name}
                            placeholder='Название'
                            id='name' />
                    </div>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='description'>Описание</label>
                        <textarea
                            onChange={this.onChange}
                            name='description'
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            value={this.state.description}
                            placeholder='Описание'
                            id='description'></textarea>
                    </div>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='length'>Продолжительность</label>
                        <input
                            onChange={this.onChange}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            value={this.state.length}
                            name='length'
                            placeholder='Продолжительность'
                            id='length' />
                    </div>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='cost'>Стоимость</label>
                        <input
                            onChange={this.onChange}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            value={this.state.cost}
                            name='cost'
                            placeholder='Стоимость'
                            id='cost' />
                    </div>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='date'>Дата</label>
                        <input
                            type='text'
                            onChange={this.onChange}
                            className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                            value={this.state.date}
                            name='date'
                            placeholder='ДД/ММ/ГГГГ'
                            id='date' />
                    </div>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='isTopRated'>В рейтинге</label>
                        <input
                            type='checkbox'
                            onChange={this.onChange}
                            checked={this.state.isTopRated}
                            name='isTopRated'
                            id='isTopRated' />
                    </div>
                    <div className='cc-course-form__buttons'>
                        {/* <button type='button' className='cc-btn cc-login__button_with-margin cc-btn_red-outline'>Регистрация</button> */}
                        <button type='submit' disabled={this.state.isDisabled} className='cc-btn cc-course-form__button cc-btn_red'>Сохранить</button>
                    </div>
                    <div className='cc-course-form__error-bar'>{this.props.error}</div>
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(CourseForm);
