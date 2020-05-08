import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import StyledAlert from './styles/StyledAlert';

const Alert = props => {
  const [alertIcon, setAlertIcon] = useState(props.icon);

  const setIcon = useCallback(() => {
    if (alertIcon === undefined && props.icon === undefined) {
      switch (props.type) {
        case 'primary':
          setAlertIcon('lnr-alarm');
          break;

        case 'standard':
          setAlertIcon('lnr-alarm');
          break;

        case 'success':
          setAlertIcon('lnr-checkmark-circle');
          break;

        case 'warning':
          setAlertIcon('lnr-warning');
          break;

        case 'error':
          setAlertIcon('lnr-warning');
          break;

        default:
          setAlertIcon('lnr-alarm');
          break;
      }
    } else if (props.icon) {
      setAlertIcon(props.icon);
    }
  }, [props.icon, props.type, alertIcon]);

  useEffect(() => {
    setIcon();
  }, [props.type, props.icon, setIcon]);

  return (
    <StyledAlert type={props.type}>
      <span className={`alert-icon lnr ${alertIcon}`} />
      <p className="alert-text">{props.children}</p>
    </StyledAlert>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['primary', 'standard', 'success', 'warning', 'error']),
  icon: PropTypes.string,
};

Alert.defaultProps = {
  type: 'standard',
};

export default Alert;
