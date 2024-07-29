import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
}

export const ArrowButton = (props: TArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={[styles.container, props.isOpen?styles.container_open:''].join(' ')}
			onClick={(e) => {
				e.stopPropagation()
				props.onClick()
			}}
			>
			<img src={arrow} alt='иконка стрелочки' className={[styles.arrow, props.isOpen?styles.arrow_open:''].join(' ')} />
		</div>
	);
};
