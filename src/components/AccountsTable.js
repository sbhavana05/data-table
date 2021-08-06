import React , {useState, useEffect, useRef} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import accountsData  from '../assets/accounts.json';
import { Calendar } from 'primereact/calendar';

import './AccountsTable.css'

const AccountsTable = () => {
/**
 * Component State Starts
 */
   const [originalAccountsData , setAccountsOriginalData] = useState(accountsData);
   const [pageNationConfig , setPageNationConfig] = useState({
    pageIndex: 0,
    pageSize : 10,
    totalPages: accountsData.length,
})

const dt = useRef(null);

const [selectedDateDob, setSelectedDobDateDate] = useState(null);
const [selectedDateCreatedDate, setSelectedCreatedDate] = useState(null);

   const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
   const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;


/**Component State Ends */

   const onCustomPage = (event) => {
       console.log(event);
       setPageNationConfig((prevState) => {
        return {
            ...prevState, 
            pageIndex: event?.first,
        }
     
       })
    }
 


const dateBodyTemplate = (rowData, column) => {
      const date = new Date(rowData[column]);
      if(date){
          var year = date.getFullYear();

          var month = (1 + date.getMonth()).toString();
          month = month.length > 1 ? month : '0' + month;
          var day = date.getDate().toString();
          day = day.length > 1 ? day : '0' + day;

          return `${month}/${day}/${year}`;
        
      }
}

// CreatedDate Filter with calender

const onDateChange = (e) => {
    dt.current.filter(e.value, 'createdDate', 'custom');
    setSelectedCreatedDate(e.value);
}

// DOB date Filter with calender
const onDateDobDateChange = (e) => {
    dt.current.filter(e.value, 'dob', 'custom');
    setSelectedDobDateDate(e.value);
}

// CreatedDate Filter with calender

const dateFilterForCreatedDate = <Calendar value={selectedDateCreatedDate} onChange={onDateChange} dateFormat="yy-mm-dd" className="p-column-filter" placeholder="Created Date"/>;

// DOB date Filter with calender
const dateFilterForDob = <Calendar value={selectedDateDob} onChange={onDateDobDateChange} dateFormat="yy-mm-dd" className="p-column-filter" placeholder="DOB"/>;

// Filter Date by Filter
const filterDate = (value, filter) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value === formatDate(filter);
}

// Formate Date 
const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}

// export csv file 
const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
}

// header button for export csv
const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button type="button" icon="pi pi-file-o" onClick={() => exportCSV(false)} className="p-mr-2" data-pr-tooltip="CSV" />
    </div>
);

    return (

        <div>
           
        <div className="card">
            
            <h5>Basic</h5>
            <DataTable value={originalAccountsData} ref={dt} header={header} paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"  first={pageNationConfig.pageIndex} rows={pageNationConfig.pageSize} onPage={onCustomPage}
                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="First Name" header="Account Holder First Name" sortable filter filterPlaceholder="First Name" ></Column>
                <Column field="Last Name" header="Account Holder Last Name" sortable  filter filterPlaceholder="First Name"  ></Column>
                <Column field="Country" header="Country code" sortable filter filterPlaceholder="Country"></Column>
                <Column field="email" header="Email" sortable  filter filterPlaceholder="email" ></Column>

                <Column field="dob" header="Date of Birth" sortable filter filterPlaceholder="dob" filterElement={dateFilterForDob} filterFunction={filterDate}  body={(props) => {
                return dateBodyTemplate(props, "dob");
              }}  filterElement={dateFilterForDob} filterFunction={filterDate}  ></Column>
                <Column field="mfa" header="Mfa" sortable filter filterPlaceholder="mfa" ></Column>
                <Column field="amt" header="Amt" sortable filter filterPlaceholder="amt"></Column>
                <Column field="createdDate" header="Created Date" sortable filter filterPlaceholder="createdDate" filterElement={dateFilterForCreatedDate} filterFunction={filterDate}  body={(props) => {
                return dateBodyTemplate(props, "createdDate");
              }}  ></Column>
                <Column field="ReferredBy" header="ReferredBy" sortable sortable filter filterPlaceholder="ReferredBy" ></Column>
            </DataTable>

            
        </div>
            
        </div>
    )
}

export default AccountsTable
