import React, {
  useContext,
  useReducer,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { generateCombination } from 'gfycat-style-urls';

import AuthContext from '../../../../contexts/auth';
import ToastContext from '../../../../contexts/toast';

import { getCutoffTime } from '../../../../utils/time-fns';
import hasCurrentPriceQuery from '../../../../gql/queries/hasCurrentPrice';
import addHostSessionMutaiton from '../../../../gql/mutations/addHostSession';

import hostFormReducer, {
  initialState,
  updateDodoCode,
  updateEntryFee,
  updateRules,
  updateQueueSize,
  updateMaxVisitors,
  updateSessionType,
  updateSessionVisibility,
} from './state';

import Alert from '../../../../components/alert/Alert';
import Input from '../../../../components/input/Input';
import TextArea from '../../../../components/textarea/TextArea';
import Toggle from '../../../../components/toggle/Toggle';
import Button from '../../../../components/button/Button';

const HostForm = props => {
  const {
    user: { id: userId },
  } = useContext(AuthContext);
  const toastContext = useContext(ToastContext);
  const [state, dispatch] = useReducer(hostFormReducer, initialState);
  const hasCurrentPrice = useRef(true);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const cutoffTime = useRef(getCutoffTime());

  const {
    data: hasCurrentPriceData,
    loading: hasCurrentPriceLoading,
  } = useQuery(hasCurrentPriceQuery, {
    variables: { userId, cutoffTime: cutoffTime.current },
  });

  const [addHostSession, { data: addHostSessionData }] = useMutation(
    addHostSessionMutaiton,
  );

  if (!hasCurrentPriceLoading) {
    hasCurrentPrice.current = hasCurrentPriceData?.PriceLog?.length > 0;
  }

  useEffect(() => {
    if (hasCurrentPrice.current) {
      setShowPriceAlert(false);
    } else {
      setShowPriceAlert(true);
    }
  }, [hasCurrentPrice]);

  const submitHostForm = event => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();

      if (state.formIsValid && !showPriceAlert) {
        const urlCode = generateCombination(3, '', true);

        const formValues = {
          dodoCode: state.dodoCode.value,
          maxVisitors: state.maxVisitors.value,
          queueSize: state.queueSize.value,
          isPublic: state.isPublic,
          isBuySession: state.isBuySession,
          isSellSession: state.isSellSession,
        };

        addHostSession({
          variables: {
            ...formValues,
            urlCode,
            hostId: userId,
          },
        });
      }
    }
  };

  console.log('form reducer state: ', state);

  return (
    <form onSubmit={submitHostForm}>
      <AnimatePresence>
        {showPriceAlert && (
          <Alert
            type="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>
              You don't have a tracked price that's still valid! In order to
              open your island please
            </span>
            <Link to="/track">log a price here</Link>
            <span>
              and come back to open your island. Any price log type will do!
            </span>
          </Alert>
        )}
      </AnimatePresence>
      <Toggle
        topLabel="Session Type"
        offLabel="Private"
        onLabel="Public"
        defaultValue={true}
        handleChange={value => updateSessionVisibility(dispatch, value)}
      />
      <Toggle
        topLabel="What are Visitors here for?"
        offLabel="Buying Turnips"
        onLabel="Selling Turnips"
        defaultValue={true}
        handleChange={value => updateSessionType(dispatch, value)}
      />
      <TextArea
        label="Rules for Visitors"
        value={state.rules.value}
        handleChange={value => updateRules(dispatch, value)}
      />
      <Input
        label="Max Visitors in Line"
        value={state.queueSize.value}
        handleChange={value => updateQueueSize(dispatch, value)}
        isValid={state.queueSize.isValid}
        validationMessage={state.queueSize.validationMsg}
      />
      <Input
        label="Max Visitors on Island"
        value={state.maxVisitors.value}
        handleChange={value => updateMaxVisitors(dispatch, value)}
        isValid={state.maxVisitors.isValid}
        validationMessage={state.maxVisitors.validationMsg}
      />
      <Input
        label="Entry Fee"
        value={state.entryFee.value}
        handleChange={value => updateEntryFee(dispatch, value)}
        isValid={state.entryFee.isValid}
        validationMessage={state.entryFee.validationMsg}
      />
      <Input
        label="Dodo Code"
        value={state.dodoCode.value}
        handleChange={value => updateDodoCode(dispatch, value)}
        isValid={state.dodoCode.isValid}
        validationMessage={state.dodoCode.validationMsg}
      />
      <Button
        disabled={!state.formIsValid && !showPriceAlert}
        text="Open Island"
        color="primary"
        type="submit"
        onClick={submitHostForm}
      />
    </form>
  );
};

export default HostForm;
