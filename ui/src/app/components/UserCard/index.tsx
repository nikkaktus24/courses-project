import { IAppState } from '../../store/reducers/index';
import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { CoursesService } from '../../services/coursesService';
import Loader from '../Loader';
import { UserData } from '../../models/Shared/UserData';
import { OrderCoursesRequest } from '../../interfaces/Courses/order-courses-request';
import { AuthService } from '../../services/authService';

interface Props {
    isLoading?: boolean;
    user: UserData;
    updateUser: (request: UserData) => void;
}

interface State {
    isEdited: boolean;
    isAdmin: boolean;
    coins: number;
}

const mapStateToProps = (state: IAppState, props: Props): Partial<Props> => {
    return {
        ...props,
        user: state.user.userData,
        isLoading: state.courses.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Partial<Props> => {
    return {
        ...props,
        updateUser: (request: UserData) => {
            dispatch(AuthService.updateUser(request));
        },
    };
};

class UserCard extends React.PureComponent<Props, any> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
            isAdmin: this.props.user.isAdmin,
            coins: this.props.user.coins,
        };
    }

    public onChange = (key: string): (event: React.SyntheticEvent<HTMLInputElement>) => any => {
        return (event: React.SyntheticEvent<HTMLInputElement>): void => {
            const target: HTMLInputElement = event.target as HTMLInputElement;
            this.setState({[target.name]: target[key]});
        };
    }

    public saveUser = (): void => {
        this.props.user.toRequest(this.state.isAdmin, this.state.coins);
        this.props.updateUser(this.props.user);
        this.toggleMode();
    }

    public toggleMode = (): void => {
        this.setState({
            isEdited: !this.state.isEdited,
        });
    }

    public render(): React.ReactElement {
        return (
            <div className='cc-user-card-wrapper'>
            {!this.state.isEdited ?
                <div className='cc-user-card'>
                    <div>{this.props.user.id}</div>
                    <div className='cc-user-card__login'>{this.props.user.login}</div>
                    <div className='cc-user-card__name'>{this.props.user.name.getFullName()}</div>
                    <div className='cc-user-card__coins'>{this.state.coins}</div>
                    <div>{this.state.isAdmin ? 'Администратор' : 'Не администратор'}</div>
                    <button onClick={this.toggleMode} type='button' className='cc-btn cc-btn_red-outline'>Изменить</button>
                </div>
                : <div className='cc-user-card cc-form'>
                    <div>{this.props.user.id}</div>
                    <div className='cc-user-card__login'>{this.props.user.login}</div>
                    <div className='cc-user-card__name'>{this.props.user.name.getFullName()}</div>
                    <div className='cc-form__control cc-user-card__coins'>
                        <label className='cc-form__label' htmlFor='coins'>Монеты</label>
                        <input
                            className='cc-form__input'
                            onChange={this.onChange('value')}
                            defaultValue={`${this.state.coins}`}
                            name='coins'
                            id='coins' />
                    </div>
                    <div className='cc-form__control'>
                        <label className='cc-form__label' htmlFor='isAdmin'>Админ. права</label>
                        <input type='checkbox' onChange={this.onChange('checked')} defaultChecked={this.state.isAdmin} name='isAdmin' id='isAdmin' />
                    </div>
                    <button onClick={this.saveUser} type='button' className='cc-btn cc-btn_red-outline'>Сохранить</button>
                </div>
            }
            {this.props.isLoading &&
                <Loader />}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserCard);
