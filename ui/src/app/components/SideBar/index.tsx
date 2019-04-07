import * as React from 'react';
import './index.scss';
import { appSettings } from '../../../appSettings';
import { UserData } from '../../models/Shared/UserData';

export interface SideBarProps {
    user: UserData;
    store: string[];
    logout: () => void;
}

const SideBar = (props: SideBarProps): JSX.Element => {
    return (
        <div className='cc-sidebar-wrapper'>
            <div className='cc-sidebar'>
                <div className='cc-sidebar__logo'>{appSettings.title}</div>
                <div className='cc-sidebar-navigation'>
                    {/* <div className='cc-sidebar-navigation__item'>Мои заказы</div> */}
                    <div className='cc-sidebar-navigation__item'>Каталог курсов</div>
                    <div className='cc-sidebar-navigation__item'>Корзина</div>
                    {/* <div className='cc-sidebar-navigation__item'>Авторство</div> */}
                    {/* <div className='cc-sidebar-navigation__item'>Управление</div> */}
                    <div onClick={props.logout} className='cc-sidebar-navigation__item'>Выйти</div>
                </div>
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
