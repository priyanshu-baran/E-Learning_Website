/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Sidebar } from 'primereact/sidebar';
import { CustomerService } from './service/CustomerService';
import { TabPanel, TabView } from 'primereact/tabview';

export const AdminDashboard = () => {
  const usenavigate = useNavigate();
  const inputRef = useRef();
  const [refIsShow, setRefIsShow] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setloading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState();
  const [visibleBottom, setVisibleBottom] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
    const fetchData = async () => {
      try {
        const data = await CustomerService.getCustomersMedium();
        const formatCustomers = data.map((customer) => ({
          ...customer,
          dateofjoining: new Date(customer.dateofjoining),
        }));
        setCustomers(formatCustomers);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchData();
    initFilters();
  }, []);
  const clearFilter = () => {
    initFilters();
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      username: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      person: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      'country.name': {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      dateofjoining: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue('');
  };
  const renderHeader = () => {
    return (
      <div className='flex justify-content-between'>
        <Button
          type='button'
          icon='pi pi-filter-slash'
          label='Clear'
          outlined
          onClick={clearFilter}
        />
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            value={globalFilterValue}
            style={{ width: '400px' }}
            onChange={onGlobalFilterChange}
            placeholder='Keyword Search'
          />
          {globalFilterValue && (
            <i
              className='pi pi-times'
              style={{ cursor: 'pointer', position: 'absolute', right: '15px' }}
              onClick={() => initFilters()}
            />
          )}
        </span>
      </div>
    );
  };
  const countryBodyTemplate = (rowData) => {
    return (
      <div className='flex align-items-center gap-2'>
        <img
          alt='flag'
          src='https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png'
          className={`flag flag-in`}
          style={{ width: '24px' }}
        />
        <span>India</span>
      </div>
    );
  };
  const filterClearTemplate = (options) => {
    return (
      <Button
        type='button'
        icon='pi pi-times'
        onClick={options.filterClearCallback}
        style={{ borderRadius: '8px', outline: 'none' }}
        severity='secondary'></Button>
    );
  };
  const filterApplyTemplate = (options) => {
    return (
      <div>
        <Button
          type='button'
          icon='pi pi-check'
          style={{ borderRadius: '8px', outline: 'none' }}
          onClick={options.filterApplyCallback}
          severity='success'></Button>
      </div>
    );
  };
  const filterFooterTemplate = () => {
    return <div className='px-3 pt-0 pb-3 text-center'>Filter by Country</div>;
  };
  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.person;
    return (
      <div className='flex align-items-center gap-2'>
        <img
          alt=''
          src={`https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png`}
          width='32'
        />
        <span>
          {representative && representative.firstname
            ? `${representative.firstname} ${representative.lastname || ''}`
            : 'Not yet set'}
        </span>
      </div>
    );
  };
  const representativeFilterTemplate = (options) => {
    return (
      <div>
        <MultiSelect
          value={options.value}
          options={customers}
          itemTemplate={representativesItemTemplate}
          onChange={(e) => options.filterCallback(e.value)}
          optionLabel='username'
          placeholder='Any'
          className='p-column-filter'
        />
      </div>
    );
  };
  const representativesItemTemplate = (option) => {
    return (
      <div className='flex align-items-center gap-2'>
        <img
          alt={option.username}
          src={`https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png`}
          width='32'
        />
        <span>{option.username}</span>
      </div>
    );
  };
  const formatDate = (value) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };
  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat='dd/mm/yy'
        placeholder='dd/mm/yyyy'
        mask='99/99/9999'
      />
    );
  };
  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames('pi', {
          'text-green-500 pi-check-circle': rowData.verified,
          'text-red-500 pi-times-circle': !rowData.verified,
        })}
      />
    );
  };
  const verifiedFilterTemplate = (options) => {
    return (
      <div className='flex align-items-center gap-2'>
        <label
          htmlFor='verified-filter'
          className='font-bold'>
          Verified
        </label>
        <TriStateCheckbox
          inputid='verified-filter'
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
        />
      </div>
    );
  };
  const renderRowNumber = (rowData) => {
    const rowIndex = customers.indexOf(rowData) + 1;
    return <span>{rowIndex}.</span>;
  };
  const header = renderHeader();
  useEffect(() => {
    const body = document.querySelector('.home_body'),
      modeToggle = body.querySelector('.mode-toggle'),
      sidebar = body.querySelector('.admin_nav'),
      sidebarToggle = body.querySelector('.sidebar-toggle');
    let getMode = localStorage.getItem('mode');
    if (getMode && getMode === 'dark') {
      body.classList.add('dark');
    }
    let getStatus = localStorage.getItem('status');
    if (getStatus && getStatus === 'close') {
      sidebar.classList.add('close');
    }
    const handleDarkToggle = (e) => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    };
    const handleSideToggle = (e) => {
      sidebar.classList.toggle('close');
      if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
      } else {
        localStorage.setItem('status', 'open');
      }
    };
    modeToggle.addEventListener('click', handleDarkToggle);
    sidebarToggle.addEventListener('click', handleSideToggle);
    return () => {
      modeToggle.removeEventListener('click', handleDarkToggle);
      sidebarToggle.removeEventListener('click', handleSideToggle);
    };
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        inputRef.current.focus();
        setRefIsShow(false);
      }
      if (event.key === 'Escape') {
        inputRef.current.blur();
        inputRef.current.value = '';
        setRefIsShow(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className='home_body'>
      <nav className='admin_nav'>
        <div className='logo-name'>
          <div className='logo-image'>
            <img
              src='Images/logo.png'
              alt=''
            />
          </div>
          <span className='logo_name'>ConnectLearn</span>
        </div>
        <div className='menu-items'>
          <ul className='nav-links'>
            <li>
              <a href='/admin'>
                <i className='uil uil-estate'></i>
                <span className='link-name'>Dahsboard</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-files-landscapes'></i>
                <span className='link-name'>Content</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-chart'></i>
                <span className='link-name'>Analytics</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-thumbs-up'></i>
                <span className='link-name'>Like</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-comments'></i>
                <span className='link-name'>Comment</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-share'></i>
                <span className='link-name'>Share</span>
              </a>
            </li>
          </ul>
          <ul className='logout-mode'>
            <li
              onClick={() => {
                usenavigate('/');
              }}>
              <a href='#'>
                <i className='uil uil-signout'></i>
                <span className='link-name'>Logout</span>
              </a>
            </li>
            <li className='mode'>
              <a href='#'>
                <i className='uil uil-moon'></i>
                <span className='link-name'>Dark Mode</span>
              </a>
              <div className='mode-toggle'>
                <span className='switch'></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section className='dashboard'>
        <div className='top'>
          <i className='uil uil-bars sidebar-toggle'></i>
          <div className='search-box'>
            <i className='uil uil-search'></i>
            <input
              type='text'
              ref={inputRef}
              placeholder='Search anything here...'
              value={inputValue}
              onChange={(e) => setInputValue(e.value)}
            />
            {refIsShow ? (
              <div className='shortcut-text'>
                <div className='shortcut-text1'>CTRL</div>+
                <div className='shortcut-text1'>&ensp;/&ensp;</div>
              </div>
            ) : (
              <div className='shortcut-text'>
                <div className='shortcut-text1'>Esc to clear</div>
              </div>
            )}
          </div>
          <div />
        </div>
        <div className='dash-content'>
          <div className='overview'>
            <div className='title'>
              <i className='uil uil-tachometer-fast-alt'></i>
              <span className='text'>Dashboard</span>
            </div>
            <div className='boxes'>
              <div className='box box1'>
                <i className='uil uil-thumbs-up'></i>
                <span className='text'>Total Likes</span>
                <span className='number'>50,120</span>
              </div>
              <div className='box box2'>
                <i className='uil uil-comments'></i>
                <span className='text'>Comments</span>
                <span className='number'>20,120</span>
              </div>
              <div className='box box3'>
                <i className='uil uil-share'></i>
                <span className='text'>Total Share</span>
                <span className='number'>10,120</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className='card'
          style={{ position: 'relative', top: '60px' }}>
          <DataTable
            value={customers}
            selectionMode='radiobutton'
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            onRowSelect={() => {
              setSelectedProduct(true);
              setVisibleBottom(true);
            }}
            onRowUnselect={() => setSelectedProduct(false)}
            metaKeySelection={false}
            tableStyle={{ minWidth: '50rem' }}
            paginator
            style={{ cursor: 'pointer' }}
            showGridlines
            rows={10}
            loading={loading}
            dataKey='_id'
            filters={filters}
            globalFilterFields={[
              'username',
              'email',
              'person',
              'country.name',
              'dateofjoining',
            ]}
            header={header}
            emptyMessage='No customers found...!!!'>
            <Column
              body={renderRowNumber}
              header='S.NO.'
              style={{ width: '6rem', textAlign: 'center' }}
              alignHeader={'center'}
            />
            <Column
              field='username'
              header='Username'
              filter
              filterPlaceholder='Search by Username'
              style={{ minWidth: '12rem' }}
            />
            <Column
              field='email'
              header='Email'
              filter
              filterPlaceholder='Search by Email'
              style={{ minWidth: '12rem' }}
            />
            <Column
              header='Full Name'
              filterField='person'
              showFilterMatchModes={false}
              filterMenuStyle={{ width: '14rem' }}
              style={{ minWidth: '14rem' }}
              body={representativeBodyTemplate}
              filter
              filterElement={representativeFilterTemplate}
            />
            <Column
              header='Country'
              filterField='country.name'
              style={{ minWidth: '12rem' }}
              body={countryBodyTemplate}
              filter
              filterPlaceholder='Search by country'
              filterClear={filterClearTemplate}
              filterApply={filterApplyTemplate}
              filterFooter={filterFooterTemplate}
            />
            <Column
              header='Date of Joining'
              filterField='dateofjoining'
              dataType='date'
              style={{ minWidth: '10rem' }}
              body={dateBodyTemplate}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              field='verified'
              header='Account Verified'
              dataType='boolean'
              bodyClassName='text-center'
              style={{ minWidth: '8rem' }}
              body={verifiedBodyTemplate}
              filter
              filterElement={verifiedFilterTemplate}
            />
          </DataTable>
          <Sidebar
            visible={visibleBottom}
            position='bottom'
            showCloseIcon={false}
            style={{
              height: '40vh',
              width: '86vw',
              marginBottom: '-8px',
              border: '8px groove #c5bdbd',
              borderRadius: '25px 25px 0 0',
            }}
            onHide={() => {
              setVisibleBottom(false);
              setSelectedProduct(false);
            }}>
            {selectedProduct && (
              <div id='detailedTabView'>
                <h3>
                  {selectedProduct[0]._id} - {selectedProduct[0].username}
                </h3>
                <br />
                <TabView>
                  <TabPanel
                    header={selectedProduct[0].person.firstname}
                    leftIcon='pi pi-calendar mr-2'>
                    <p className='m-0'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </TabPanel>
                  <TabPanel
                    header='Header II'
                    leftIcon='pi pi-calendar mr-2'>
                    <p className='m-0'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </TabPanel>
                </TabView>
              </div>
            )}
          </Sidebar>
        </div>
      </section>
    </div>
  );
};
