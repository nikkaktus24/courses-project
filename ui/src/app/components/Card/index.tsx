import * as React from 'react';
import './index.scss';
import { Course } from '../../models/Courses/Courses';
import { timeConvert } from '../../helpers/timeConverter';
import { Link } from 'react-router-dom';

interface Props {
    course: Course;
    isOrderable: boolean;
    isAdmin?: boolean;
    order?: () => void;
    deleteCourse?: () => void;
}

const Card = (props: Props): JSX.Element => {
    return (
        <div className={props.course.isTopRated ? 'cc-card cc-card_top-rated' : 'cc-card'}>
            <div className='cc-card__info'>
                <div className='cc-card__header'>
                    <h2 className='cc-card__title'>{props.course.name}</h2>
                    <div className='cc-card__sign'>
                        <div>{props.course.cost + 'р'}</div>
                        <div>{timeConvert(props.course.length)}</div>
                        <div>{props.course.date.format('DD/MM/YYYY')}</div>
                    </div>
                </div>
                <div className='cc-card__desc'>{props.course.description}</div>
            </div>
            {props.isOrderable ?
                <div className='cc-card__dashboard'>
                    <button onClick={props.order} className='cc-btn cc-card__button cc-card__button_order cc-btn_primary-outline'>Заказать</button>
                    {props.isAdmin && (
                    [<Link to={`/course/${props.course.id}`}><button className='cc-btn cc-card__button cc-btn_red-outline'>Редактировать</button></Link>,
                        <button onClick={props.deleteCourse} className='cc-btn cc-card__button cc-btn_red'>Удалить</button>]
                    )}
                </div>
                : <div className='cc-card__dashboard'><button onClick={props.deleteCourse} className='cc-btn cc-card__button cc-btn_red'>Удалить</button></div>
            }
        </div>
    );
};

export default Card;