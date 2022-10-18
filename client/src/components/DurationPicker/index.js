import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./DurationPicker.css";
import DurationPickerColumn from "./DurationPickerColumn";

DurationPicker.propTypes = {
  onChange: PropTypes.func,
  initialDuration: PropTypes.shape({
    days: PropTypes.number,
    hours: PropTypes.number,
    minutes: PropTypes.number,
  }),
  maxDays: PropTypes.number,
};

DurationPicker.defaultProps = {
  maxDays: 10,
  onChange: () => {},
  initialDuration: { days: 0, hours: 0, minutes: 0 },
};

function DurationPicker(props) {
  const { onChange, maxDays, initialDuration } = props;
  const [isSmallScreen, setIsSmallScreen] = useState(undefined);
  const [duration, setDuration] = useState(initialDuration);

  // column onChange handlers
  const onChangeDays = useCallback((days) => {
    setDuration((prevDuration) => ({ ...prevDuration, days }));
  }, []);
  const onChangeHours = useCallback((hours) => {
    setDuration((prevDuration) => ({ ...prevDuration, hours }));
  }, []);
  const onChangeMinutes = useCallback((minutes) => {
    setDuration((prevDuration) => ({ ...prevDuration, minutes }));
  }, []);

  // add/remove resize listener and measure screen size
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth <= 600) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // execute callback prop
  useEffect(() => {
    onChange(duration);
  }, [duration, onChange]);
  return (
    <div className="rdp-picker">
      <DurationPickerColumn
        onChange={onChangeDays}
        unit="days"
        maxDays={maxDays}
        isSmallScreen={isSmallScreen}
        initial={initialDuration.days}
      />
      <DurationPickerColumn
        onChange={onChangeHours}
        unit="hours"
        isSmallScreen={isSmallScreen}
        initial={initialDuration.hours}
      />
      <DurationPickerColumn
        onChange={onChangeMinutes}
        unit="mins"
        isSmallScreen={isSmallScreen}
        initial={initialDuration.minutes}
      />
    </div>
  );
}

export default DurationPicker;
