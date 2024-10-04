import {
  Button,
  Modal,
  Popover,
  Form,
  FormLayout,
  TextField,
  DatePicker,
  Banner,
} from "@shopify/polaris";
import { useState, useCallback, useRef } from "react";
import { DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs for each rule

function ModalAddRule({ id }) {
  const [active, setActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [buttonTitle, setButtonTitle] = useState(
    new Date().toLocaleDateString()
  );
  const [popOverActive, setPopOverActive] = useState(false);
  const [titleCampaign, setTitleCampaign] = useState("");
  const [errors, setErrors] = useState({}); // State to track errors

  const togglePopoverActive = useCallback(
    () => setPopOverActive((popOverActive) => !popOverActive),
    []
  );
  const toggleActive = useCallback(() => {
    setPopOverActive(false);
    setButtonTitle(new Date().toLocaleDateString());
    setActive((active) => !active);
  }, [togglePopoverActive]);

  const buttonRef = useRef(null);

  const activator = (
    <div ref={buttonRef}>
      <Button
        variant="primary"
        icon={PlusIcon}
        onClick={toggleActive}
        className="text-center"
      >
        Add Rule
      </Button>
    </div>
  );

  const [rules, setRules] = useState([
    {
      id: uuidv4(), // Generate unique id for each rule
      buyFrom: "",
      buyTo: "",
      discount: "",
    },
  ]);

  const handleAddRule = () => {
    const newRule = {
      id: uuidv4(), // Generate unique id for each rule
      buyFrom: "",
      buyTo: "",
      discount: "",
    };
    setRules([...rules, newRule]);
  };

  const handleDeleteRule = (ruleId) => {
    if (rules.length > 1) {
      setRules(rules.filter((rule) => rule.id !== ruleId));
    }
  };

  const handleFieldChange = (value, field, ruleId) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === ruleId ? { ...rule, [field]: value } : rule
      )
    );
  };

  const popOverActivator = (
    <Button fullWidth onClick={togglePopoverActive} size="large">
      {buttonTitle}
    </Button>
  );

  const handleDateChange = (value) => {
    setSelectedDate(value);
    const formattedDate = `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`;
    setButtonTitle(formattedDate);
    togglePopoverActive();
  };

  const validateForm = () => {
    let formErrors = {};
    if (!titleCampaign) formErrors.titleCampaign = "Title Campaign is required";
    if (!selectedDate.start || !selectedDate.end)
      formErrors.date = "Date range is required";

    rules.forEach((rule, index) => {
      if (!rule.buyFrom)
        formErrors[`buyFrom-${rule.id}`] = "Buy From is required";
      if (!rule.buyTo) formErrors[`buyTo-${rule.id}`] = "Buy To is required";
      if (!rule.discount)
        formErrors[`discount-${rule.id}`] = "Discount is required";
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, construct the object and console.log it
      const formData = {
        titleCampaign,
        date: {
          start: selectedDate.start.toLocaleDateString(),
          end: selectedDate.end.toLocaleDateString(),
        },
        rules: rules.map(({ buyFrom, buyTo, discount }) => ({
          buyFrom,
          buyTo,
          discount,
        })),
      };
      console.log(formData);

      // Clear form inputs after successful submission
      setTitleCampaign("");
      setSelectedDate({
        start: new Date(),
        end: new Date(),
      });
      setRules([
        {
          id: uuidv4(), // Reset with one blank rule
          buyFrom: "",
          buyTo: "",
          discount: "",
        },
      ]);
      setErrors({}); // Clear any validation errors
      setButtonTitle("Choose date range"); // Reset the button title for the date picker

      // Close the modal
      toggleActive();
    }
  };

  return (
    <div>
      {activator}
      <div className="max-w-md">
        <Modal
          size="large"
          open={active}
          onClose={toggleActive}
          title={`Add Rule to product with id = ${id}`}
          primaryAction={{
            content: "Save",
            onAction: handleSubmit,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: toggleActive,
            },
          ]}
        >
          <Modal.Section>
            <Form>
              <FormLayout>
                <div className="grid grid-cols-2">
                  <TextField
                    label="Title Campaign"
                    value={titleCampaign}
                    onChange={setTitleCampaign}
                    error={errors.titleCampaign}
                  />
                  <div></div>
                </div>

                <div className="grid grid-cols-2">
                  <Popover
                    active={popOverActive}
                    activator={popOverActivator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                  >
                    <DatePicker
                      month={selectedDate.start.getMonth()}
                      year={selectedDate.start.getFullYear()}
                      onChange={handleDateChange}
                      onMonthChange={(month, year) =>
                        setSelectedDate({
                          start: new Date(
                            year,
                            month,
                            selectedDate.start.getDate()
                          ),
                          end: new Date(
                            year,
                            month,
                            selectedDate.end.getDate()
                          ),
                        })
                      }
                      selected={selectedDate}
                      allowRange
                      disableDatesBefore={new Date()}
                    />
                  </Popover>
                  <div className="text-red-500 col-span-2">
                    {errors.date && (
                      <Banner status="critical">{errors.date}</Banner>
                    )}
                  </div>
                </div>
                {/* Render dynamically added rules */}
                {rules.map((rule) => (
                  <div key={rule.id} className="relative pr-10 mb-4">
                    <div className="grid grid-cols-3 gap-3">
                      <TextField
                        label="Buy From"
                        value={rule.buyFrom}
                        onChange={(value) =>
                          handleFieldChange(value, "buyFrom", rule.id)
                        }
                        error={errors[`buyFrom-${rule.id}`]}
                      />
                      <TextField
                        label="Buy To"
                        value={rule.buyTo}
                        onChange={(value) =>
                          handleFieldChange(value, "buyTo", rule.id)
                        }
                        error={errors[`buyTo-${rule.id}`]}
                      />
                      <TextField
                        label="Discount per item (%)"
                        value={rule.discount}
                        onChange={(value) =>
                          handleFieldChange(value, "discount", rule.id)
                        }
                        error={errors[`discount-${rule.id}`]}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <Button
                        icon={DeleteIcon}
                        accessibilityLabel="Delete rule"
                        onClick={() => handleDeleteRule(rule.id)}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  variant="primary"
                  icon={PlusIcon}
                  onClick={handleAddRule}
                  className="text-center"
                >
                  Add
                </Button>
              </FormLayout>
            </Form>
          </Modal.Section>
        </Modal>
      </div>
    </div>
  );
}

export default ModalAddRule;
