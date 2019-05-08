import * as React from 'react';
import './index.scss';
import { appSettings } from '../../../appSettings';
import { UserData } from '../../models/Shared/UserData';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Course } from '../../models/Courses/Courses';

export interface SideBarProps {
    user: UserData;
    store: Course[];
    logout: () => void;
}

const SideBar = (props: SideBarProps): JSX.Element => {
    return (
        <div className='cc-sidebar-wrapper'>
            <div className='cc-sidebar'>
                <div className='cc-sidebar__logo'>{appSettings.title}</div>
                <div className='cc-sidebar-navigation'>
                    {(props.user.isAdmin) ? <Link to='/create'><div className='cc-sidebar-navigation__item'>Добавить курс</div></Link> : null}
                    {(props.user.isOwner) ? <Link to='/owner'><div className='cc-sidebar-navigation__item'>Панель Данных</div></Link> : null}
                    <Link to='/my-orders'><div className='cc-sidebar-navigation__item'>Мои заказы</div></Link>
                    <Link to='/courses'><div className='cc-sidebar-navigation__item'>Каталог курсов</div></Link>
                    <Link to='/store'><div className='cc-sidebar-navigation__item'>Корзина</div></Link>
                    <div onClick={props.logout} className='cc-sidebar-navigation__item'>Выйти</div>
                </div>
                {props.user &&
                <div className='cc-sidebar__store'>
                    <span className='cc-sidebar__session-caption'>На вашем счету: </span>
                    <span className='cc-sidebar__login'>{props.user.coins}</span>
                    <span className='cc-sidebar__session-caption'> монет</span>
                </div>}
                {props.store &&
                <div className='cc-sidebar__store'>
                    <span className='cc-sidebar__session-caption'>В вашей корзине: </span>
                    <span className='cc-sidebar__login'>{props.store.length}</span>
                    <span className='cc-sidebar__session-caption'> курсов</span>
                </div>}
                <div className='cc-sidebar__session'>
                    <div className='cc-sidebar__session-caption'>Вы авторизованы как:</div>
                    <div className='cc-sidebar__login'>{props.user.login}</div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
