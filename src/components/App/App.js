import {useState, useEffect, createRef} from 'react';

import './App.css';

import RecordList from '../RecordList/RecordList';
import AddPopup from '../AddPopup/AddPopup';

import {createPhrase} from '../../utils/utils';

function App() {
	const [records, setRecords] = useState([]);
	const [total, setTotal] = useState({});

	const [selectedRecord, setSelectedRecord] = useState({});

	const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

	const getRecords = () => {
		fetch('./list.json')
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				let recordsList = data.slice(0, data.length - 1);
				setRecords(recordsList);
				setTotal(data[data.length - 1]);
			});
	};

	useEffect(() => {
		getRecords();
	}, []);

	const selectRef = createRef();

	const handleSelectChange = () => {
		let matchedRecord = records.find(
			(item) => item.entryPointDocument === selectRef.current.value
		);
		setSelectedRecord(matchedRecord);
	};

	const handleSelectByRadioInput = (record) => {
		setSelectedRecord(record);
	};

	const handleSelectByRecordClick = (record) => {
		setSelectedRecord(record);
	};

	const handleSort = () => {
		let sortRecords = records.sort((a, b) => {
			if (a.description > b.description) return 1;
			if (a.description === b.description) return 0;
			if (a.description < b.description) return -1;
		});
		setRecords([...sortRecords]);
	};

	const setEventListeners = () => {
		document.addEventListener('keydown', handleEscClose);
	};

	const handleOpenAddPopup = () => {
		setIsAddPopupOpen(true);
		setEventListeners();
	};

	const popupClose = () => {
		setIsAddPopupOpen(false);
		document.removeEventListener('keydown', handleEscClose);
	};

	const handleEscClose = (evt) => {
		if (evt.key === 'Escape') {
			popupClose();
		}
	};

	const hendleAddRecord = (description) => {
		let newRecord = {
			description: description,
			entryPointDocument: createPhrase(),
			name: createPhrase(),
			nfoType: createPhrase(),
			nfoTypeId: createPhrase(),
			reportPeriodType: createPhrase(),
			reportPeriodTypeId: createPhrase(),
			reportType: createPhrase(),
			reportTypeId: createPhrase(),
		};
		setRecords([...records, newRecord]);
	};

	return (
		<div className='app'>
			<select
				className='app__select'
				onChange={handleSelectChange}
				ref={selectRef}
			>
				{records.map((item, i) => (
					<option
						className='app__select-option'
						selected={
							item.entryPointDocument === selectedRecord.entryPointDocument
								? 'selected'
								: ''
						}
						value={
							item.entryPointDocument === selectedRecord.entryPointDocument
								? selectedRecord.entryPointDocument
								: item.entryPointDocument
						}
						key={item.entryPointDocument}
					>
						{item.entryPointDocument === selectedRecord.entryPointDocument
							? selectedRecord.description
							: item.description}
					</option>
				))}
			</select>

			<RecordList
				records={records}
				selectedRecord={selectedRecord}
				onRadioInputClick={handleSelectByRadioInput}
				onRecordClick={handleSelectByRecordClick}
			/>
			<button className='app__button' onClick={handleSort}>
				Сортировать
			</button>
			<button className='app__button' onClick={handleOpenAddPopup}>
				Добавить
			</button>
			<p className='app__total-record'>{total.description}</p>
			<AddPopup
				isOpen={isAddPopupOpen}
				popupClose={popupClose}
				addRecord={hendleAddRecord}
			/>
		</div>
	);
}

export default App;
