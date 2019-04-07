import * as React from 'react';
import './index.scss';
import { Course } from '../../models/Courses/Courses';

interface Props {
    course: Course;
    order?: () => void;
}

const PLACEHOLDER_IMG = require('../../../assets/images/placeholder.png');

const PrivateCard = (props: Props): JSX.Element => {
    return (
        <div className={props.course.isTopRated ? 'cc-card cc-card_top-rated' : 'cc-card'}>
            <img
                className='cc-card__photo'
                src={props.course.photoUrl ? props.course.photoUrl : PLACEHOLDER_IMG}
                alt='placeholder' />
            <div className='cc-card__container'>
                <div className='cc-card__title'>
                    {props.course.name}
                </div>
                <div className='cc-card__desc'>
                    {props.course.description}
                </div>
                <button type='button' className='cc-btn cc-card__button cc-btn_red-outline'>Заказать</button>
            </div>
        </div>
    );
};

export default PrivateCard;