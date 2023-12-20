import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { useNavigate } from 'react-router-dom';

export const Speeddial = ({ handlePricing, handleLogout }) => {
  const usenavigate = useNavigate('');
  const items = [
    {
      // label: 'Add',
      icon: 'pi pi-pencil',
      command: () => {
        usenavigate('/profile');
        // toast.current.show({
        //   severity: 'info',
        //   summary: 'Add',
        //   detail: 'Data Added',
        // });
      },
    },
    {
      // label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      // label: 'Pricing',
      icon: 'pi pi-cart-plus',
      command: () => handlePricing(),
    },
    {
      // label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => handleLogout(),
    },
  ];

  return (
    <div>
      <div style={{ position: 'relative', height: '350px' }}>
        <Tooltip
          target='.speeddial-bottom-right .p-speeddial-action'
          position='left'
        />
        <SpeedDial
          model={items}
          direction='up'
          transitionDelay={100}
          showIcon='pi pi-bars'
          hideIcon='pi pi-times'
          className='speeddial-bottom-right right-0 bottom-0'
          buttonClassName='p-button-danger'
        />
      </div>
    </div>
  );
};
