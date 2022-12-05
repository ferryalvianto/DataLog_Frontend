import React from 'react';
// import Button from '@mui/material/Button';
// import { ToolTip } from '@mui/material';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const excelExport = ({ excelData, fileName, buttonName }) => {
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsgeetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';

	const exportToExcel = async () => {
		console.log("clicked");
		const ws = XLSX.utils.json_to_sheet(excelData);
		const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};
	return (
		<>
			<button onClick={exportToExcel}>{buttonName}</button>
		</>
	);
};

export default excelExport;
