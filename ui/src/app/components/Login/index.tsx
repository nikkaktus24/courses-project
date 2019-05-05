import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import './index.scss';
import { AuthService } from '../../services/authService';
import { SessionModel } from '../../models/Auth/SessionModel';
import { JoinModel } from '../../models/Auth/JoinModel';

interface Props {
    children: React.ReactNode;
    isLoggedIn?: boolean;
    isLoading?: boolean;
    error: string;
    auth?: (model: SessionModel) => void;
    join?: (model: JoinModel) => void;
    clear?: () => void;
}

interface State {
    isPasswordShown: boolean;
    isLogin: boolean;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    isDisabled: boolean;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        isLoggedIn: state.user.isLoggedIn,
        error: state.user.error,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        auth: (model: SessionModel) => {
            dispatch(AuthService.fetchSession(model));
        },
        join: (model: JoinModel) => {
            dispatch(AuthService.join(model));
        },
        clear: () => {
            dispatch(AuthService.clearErrors());
        }
    };
};

class Login extends React.PureComponent<Props, any> {
    public state: State;
    public loginPlaceholder: string = 'Введите login';
    public passwordPlaceholder: string = 'Введите пароль';
    public firstNamePlaceholder: string = 'Введите Имя';
    public lastNamePlaceholder: string = 'Введите Фамилию';

    constructor(props: Props) {
        super(props);
        this.state = {
            isPasswordShown: false,
            isLogin: true,
            login: '',
            password: '',
            firstName: '',
            lastName: '',
            isDisabled: true,
        };
    }

    public componentWillUnmount(): void {
       this.props.clear();
    }

    public onChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({[target.name]: target.value});
        this.validation();
    }

    public toggleMode = (): void => {
        this.setState({
            isLogin: !this.state.isLogin,
        });
    }

    public showPassword = (): void => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown,
        });
    }

    public onClick = (): void => {
        const model: SessionModel = new SessionModel();
        model.login = this.state.login;
        model.password = this.state.password;

        this.props.auth(model);
    }

    public registrate = (): void => {
        const model: JoinModel = new JoinModel();
        model.login = this.state.login;
        model.password = this.state.password;
        model.firstName = this.state.firstName;
        model.lastName = this.state.lastName;

        this.props.join(model);
    }

    public validation(): void {
        this.setState({isDisabled: !(!!this.state.login && !!this.state.password)});
    }


    public render(): React.ReactElement {
        return (
            <Modal>
                {this.state.isLogin ?
                <div className='cc-login'>
                    <div className='cc-text cc-text__h1 cc-login__title'>Авторизация</div>
                    <form className='cc-form'>
                        <div className='cc-form__control'>
                            <label className='cc-form__label' htmlFor='login'>Логин</label>
                            <input
                                onChange={this.onChange}
                                className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                                name='login'
                                placeholder={this.loginPlaceholder}
                                id='login' />
                        </div>
                        <div className='cc-form__control'>
                            <label className='cc-form__label' htmlFor='password'>Пароль</label>
                            <input
                                type='password'
                                onChange={this.onChange}
                                name='password'
                                className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                                placeholder={this.passwordPlaceholder}
                                id='password' />
                        </div>
                        <div className='cc-login__buttons'>
                            <button type='button'  onClick={this.toggleMode} className='cc-btn cc-login__button_with-margin cc-btn_red-outline'>Регистрация</button>
                            <button type='button' disabled={this.state.isDisabled} onClick={this.onClick} className='cc-btn cc-login__button cc-btn_red'>Авторизация</button>
                        </div>
                        <div className='cc-login__error-bar'>{this.props.error}</div>
                    </form>
                </div>
                : <div className='cc-login'>
                    <div className='cc-text cc-text__h1 cc-login__title'>Регистрация</div>
                    <form className='cc-form'>
                        <div className='cc-form__control'>
                            <label className='cc-form__label' htmlFor='login'>Логин</label>
                            <input
                                onChange={this.onChange}
                                className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                                name='login'
                                placeholder={this.loginPlaceholder}
                                id='login' />
                        </div>
                        <div className='cc-form__control'>
                            <label className='cc-form__label cc-login__label' htmlFor='password'>
                                Пароль
                                <div onClick={this.showPassword} className='cc-login__show-password'>Показать пароль</div>
                            </label>
                            <input
                                type={this.state.isPasswordShown ? 'text' : 'password'}
                                onChange={this.onChange}
                                name='password'
                                className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                                placeholder={this.passwordPlaceholder}
                                id='password' />
                        </div>
                        <div className='cc-form__control'>
                            <label className='cc-form__label' htmlFor='firstName'>Имя</label>
                            <input
                                onChange={this.onChange}
                                className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                                name='firstName'
                                placeholder={this.firstNamePlaceholder}
                                id='firstName' />
                        </div>
                        <div className='cc-form__control'>
                            <label className='cc-form__label' htmlFor='lastName'>Фамилия</label>
                            <input
                                onChange={this.onChange}
                                className={this.props.error ? 'cc-form__input cc-form__input_error' : 'cc-form__input'}
                                name='lastName'
                                placeholder={this.lastNamePlaceholder}
                                id='lastName' />
                        </div>
                        <div className='cc-login__buttons'>
                            <button type='button' onClick={this.toggleMode} className='cc-btn cc-login__button_with-margin cc-btn_red-outline'>Назад</button>
                            <button type='button' disabled={this.state.isDisabled} onClick={this.registrate} className='cc-btn cc-login__button cc-btn_red'>Регистрация</button>
                        </div>
                        <div className='cc-login__error-bar'>{this.props.error}</div>
                    </form>
                </div>}
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
