import Record from '../Record/Record';

import './RecordList.css';

const RecordList = ({
	records,
	selectedRecord,
	onRadioInputClick,
	onRecordClick,
}) => {
	return (
		<div className='record-list'>
			{records.map((item, i) => (
				<Record
					record={item}
					key={item.entryPointDocument}
					isSelect={
						selectedRecord.entryPointDocument === item.entryPointDocument
							? true
							: false
					}
					onRadioInputClick={onRadioInputClick}
					onRecordClick={onRecordClick}
				/>
			))}
		</div>
	);
};

export default RecordList;
