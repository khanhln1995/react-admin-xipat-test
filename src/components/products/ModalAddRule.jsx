import {
  Button,
  Modal,
  Popover,
  Form,
  FormLayout,
  TextField,
  ActionList,
} from "@shopify/polaris";
import { useState, useCallback, useRef } from "react";
import { PlusIcon } from "@shopify/polaris-icons";

function ModalAddRule({ id }) {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const buttonRef = useRef(null);

  const activator = (
    <div ref={buttonRef}>
      <Button
        variant="primary"
        icon={PlusIcon}
        onClick={toggleActive}
        class="text-center"
      >
        Add Rule
      </Button>
    </div>
  );

  const [popOverStartDateActive, setPopOverStartDateActive] = useState(false);

  const togglePopOverStartDateActive = useCallback(
    () =>
      setPopOverStartDateActive(
        (popOverStartDateActive) => !popOverStartDateActive
      ),
    []
  );

  const popoverStartDateActivator = (
    <Button fullWidth onClick={togglePopOverStartDateActive} size="large">
      Start Date
    </Button>
  );
  const [popOverEndDateActive, setPopOverEndDateActive] = useState(false);

  const togglePopOverEndDateActive = useCallback(
    () =>
      setPopOverEndDateActive((popOverEndDateActive) => !popOverEndDateActive),
    []
  );

  const popoverEndDateActivator = (
    <Button fullWidth onClick={togglePopOverEndDateActive} size="large">
      End Date
    </Button>
  );

  return (
    <div>
      {activator}

      <Modal
        size="large"
        open={active}
        onClose={toggleActive}
        title={`Add Rule to product with id = ${id}`}
        primaryAction={{
          content: "Save",
          onAction: toggleActive,
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
              <div className="grid grid-cols-3 gap-3 ">
                <TextField placeholder="Title Campaign" />

                <Popover
                  active={popOverStartDateActive}
                  activator={popoverStartDateActivator}
                  autofocusTarget="first-node"
                  onClose={togglePopOverStartDateActive}
                ></Popover>
                <Popover
                  active={popOverEndDateActive}
                  activator={popoverEndDateActivator}
                  autofocusTarget="first-node"
                  onClose={togglePopOverEndDateActive}
                ></Popover>
              </div>
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default ModalAddRule;
