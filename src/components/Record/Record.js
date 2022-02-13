import './Record.css';

const Record = ({record, isSelect, onRadioInputClick, onRecordClick}) => {
	const handleOnRecordClick = () => {
		onRecordClick(record);
	};

	const handleRadioInputChange = () => {
		onRadioInputClick(record);
	};

	return (
		<div className='record'>
			<input
				type='radio'
				name='record'
				className='record__radio-input'
				id={record.entryPointDocument}
				value={record.entryPointDocument}
				onChange={handleRadioInputChange}
				checked={isSelect}
			></input>

			<div
				className={`record__description-container ${
					isSelect ? 'record__description-container_selected' : ''
				}`}
				onClick={handleOnRecordClick}
			>
				<p className='record__description'>{record.description}</p>
			</div>
		</div>
	);
};

export default Record;
