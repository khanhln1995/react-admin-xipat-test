import {
  Button,
  Modal,
  DropZone,
  Form,
  FormLayout,
  TextField,
  Thumbnail,
  Text,
  Banner,
  List,
} from "@shopify/polaris";
import { useState, useCallback, useRef } from "react";

function ModalAddProduct() {
  const [active, setActive] = useState(false);

  const [titleInputValue, setTitleInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");

  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  // Validation states
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const buttonRef = useRef(null);

  const activator = (
    <div ref={buttonRef}>
      <Button onClick={toggleActive}>Add Product</Button>
    </div>
  );

  const handleTitleChange = useCallback((value) => {
    setTitleInputValue(value);
    setTitleError(false);
  }, []);

  const handlePriceChange = useCallback((value) => {
    setPriceInputValue(value);
    setPriceError(false);
  }, []);

  const handleDescriptionChange = useCallback((value) => {
    setDescriptionInputValue(value);
    setDescriptionError(false);
  }, []);

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
  );
  const uploadedFiles = files.length > 0 && (
    <div className="flex items-center justify-center">
      {files.map((file, index) => (
        <div alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{" "}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </div>
      ))}
    </div>
  );

  const errorMessage = hasError && (
    <Banner title="The following images couldn’t be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    setTitleError(false);
    setPriceError(false);
    setDescriptionError(false);

    if (!titleInputValue) {
      setTitleError(true);
    }
    if (!priceInputValue) {
      setPriceError(true);
    }
    if (!descriptionInputValue) {
      setDescriptionError(true);
    }

    if (titleInputValue && priceInputValue && descriptionInputValue) {
      console.log("Submitting product:", {
        title: titleInputValue,
        price: priceInputValue,
        description: descriptionInputValue,
        files,
      });

      // Reset form values if needed
      setTitleInputValue("");
      setPriceInputValue("");
      setDescriptionInputValue("");
      setFiles([]);
      setRejectedFiles([]);

      toggleActive();
    }
  };

  return (
    <div>
      {activator}

      <Modal
        size="large"
        open={active}
        onClose={toggleActive}
        title={`Add Product`}
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
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="Title"
                value={titleInputValue}
                onChange={handleTitleChange}
                monospaced
                error={titleError ? "Title cannot be empty." : ""}
              />
              <TextField
                label="Price"
                type="number"
                value={priceInputValue}
                onChange={handlePriceChange}
                monospaced
                error={priceError ? "Price cannot be empty." : ""}
              />
              <div>
                {errorMessage}
                <DropZone
                  accept="image/*"
                  type="image"
                  onDrop={handleDrop}
                  label="Images"
                >
                  {uploadedFiles}
                  {fileUpload}
                </DropZone>
              </div>
              <TextField
                label="Description"
                multiline={4}
                value={descriptionInputValue}
                onChange={handleDescriptionChange}
                error={descriptionError ? "Description cannot be empty." : ""}
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default ModalAddProduct;
