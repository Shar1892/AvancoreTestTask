import './AddPopup.css';

import {useFormWithValidation} from '../../utils/useFormWithValidation';

const AddPopup = ({isOpen, popupClose, addRecord}) => {
	const {values, handleChange, setValues, errors, isFormValid} =
		useFormWithValidation();

	const clearInputs = () => {
		setValues({
			description: '',
		});
	};

	const handleClose = (evt) => {
		if (evt.target === evt.currentTarget) {
			popupClose();
			clearInputs();
		}
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		addRecord(values.description);
		popupClose();
		clearInputs();
	};

	return (
		<div
			className={`add-popup__overlay ${
				isOpen ? 'add-popup__overlay_visible' : ''
			}`}
			onClick={handleClose}
		>
			<div className='add-popup'>
				<h2>Добавление записи</h2>
				<form className='add-popup__form' onSubmit={handleSubmit}>
					<div className='add-popup__input-container'>
						<input
							className='add-popup__input'
							type='text'
							name='description'
							value={values.description || ''}
							onChange={handleChange}
							minLength='5'
							maxLength='200'
							placeholder='Описание'
							required
						></input>
						<p className='add-popup__input-error'>{errors.description}</p>
					</div>
					<button
						type='submit'
						className={`add-popup__submin-button ${
							isFormValid ? '' : 'add-popup__submin-button_disabled'
						}`}
					>
						Добавить
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddPopup;
