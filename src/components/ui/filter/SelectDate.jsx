import { Button, Popover, ActionList, DatePicker } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { chartFilterActions } from "../../../store/chartFilterSlice";

function SelectDate() {
  const dispatch = useDispatch();

  const [popoverActive, setPopoverActive] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("The Last 7 days"); // Default button title
  const [showDatePicker, setShowDatePicker] = useState(false); // Controls date picker visibility
  const [selectedDate, setSelectedDate] = useState({
    start: new Date(),
    end: new Date(),
  });

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleActionClick = (content) => {
    if (content === "Choose date") {
      setShowDatePicker(true); // Show the date picker if "Choose date" is clicked
    } else {
      dispatch(chartFilterActions.setDate(content));
      setButtonTitle(content);
      setShowDatePicker(false);
      togglePopoverActive();
    }
  };

  const handleDateChange = (value) => {
    setSelectedDate(value); // Update the selected date
    const formattedDate = `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`; // Format the date
    setButtonTitle(formattedDate); // Set the button title to the selected date range
    dispatch(
      chartFilterActions.setDate({
        start: value.start.toISOString(),
        end: value.end.toISOString(),
      })
    );
    setShowDatePicker(false); // Close date picker after selection
    togglePopoverActive(); // Close popover
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      {buttonTitle}
    </Button>
  );

  return (
    <div className="mb-3">
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        {!showDatePicker ? (
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: "The Last 7 days",
                onAction: () => handleActionClick("The Last 7 days"),
              },
              {
                content: "Choose date",
                onAction: () => handleActionClick("Choose date"),
              },
            ]}
          />
        ) : (
          <DatePicker
            month={selectedDate.start.getMonth()}
            year={selectedDate.start.getFullYear()}
            onChange={handleDateChange}
            onMonthChange={(month, year) =>
              setSelectedDate({
                start: new Date(year, month, selectedDate.start.getDate()),
                end: new Date(year, month, selectedDate.end.getDate()),
              })
            }
            selected={selectedDate}
            allowRange
          />
        )}
      </Popover>
    </div>
  );
}

export default SelectDate;
