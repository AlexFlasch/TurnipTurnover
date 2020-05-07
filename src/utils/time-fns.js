import setHours from 'date-fns/setHours';
import getHours from 'date-fns/getHours';
import setMinutes from 'date-fns/setMinutes';

// helpers to deal with price log time stamps and checks around them

// gets the time to check
export const getCutoffTime = () => {
  const currentTime = new Date();
  const currentHours = getHours(currentTime);

  const roundMinutesDown = datetime => setMinutes(datetime, 0);

  let comparisonTimestamp;
  if (currentHours < 12) {
    const setToMorningBeginningHours = datetime =>
      setHours(datetime, currentHours - 6);

    comparisonTimestamp = setToMorningBeginningHours(currentTime);
    comparisonTimestamp = roundMinutesDown(comparisonTimestamp);
  } else {
    const setToAfternoonBeginningHours = datetime =>
      setHours(datetime, currentHours - 12);

    comparisonTimestamp = setToAfternoonBeginningHours(currentTime);
    comparisonTimestamp = roundMinutesDown(comparisonTimestamp);
  }

  return comparisonTimestamp;
};
