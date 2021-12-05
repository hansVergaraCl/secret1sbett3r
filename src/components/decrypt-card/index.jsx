import CryptoJS from "crypto-js";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  Text,
  Input,
  Spacer,
  Select,
  Button,
  Modal,
  Note,
  useToasts,
} from "@geist-ui/react";
import { rabbitDecrypt } from "./rabbit";

const DecryptCard = () => {
  const passwordEncryptRef = useRef(null);
  const secretPhraseRef = useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [type, setType] = useState(null);
  const [passwordEncrypt, setPasswordEncrypt] = useState(null);
  const [secretPhrase, setSecretPhrase] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [toasts, setToast] = useToasts();
  const [passwordDecrypt, setPasswordDecrypt] = useState(null);
  const [selectInitialValue, setSelectInitialValue] = useState(null);

  useEffect(() => {
    if (type) {
      setSelectInitialValue(type);
    }
    if (type && passwordEncrypt && secretPhrase) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [type, passwordEncrypt, secretPhrase]);

  useEffect(() => {
    if (passwordDecrypt) {
      setVisibleModal(true);
    }
  }, [passwordDecrypt]);

  const decryptPassword = () => {
    switch (type) {
      case "1":
        try {
          const decrypt = CryptoJS.AES.decrypt(passwordEncrypt, secretPhrase);
          const originalText = decrypt.toString(CryptoJS.enc.Utf8);
          console.log(originalText.length);
          if (originalText.length === 0) {
            setToast({ text: "Private phrase is not valid.", type: "error" });
          } else {
            setPasswordDecrypt(originalText);
          }
        } catch (error) {
          console.error(error);
        }

        break;

      case "2":
        try {
          const decrypt = CryptoJS.Rabbit.decrypt(
            passwordEncrypt,
            secretPhrase
          );
          const originalText = rabbitDecrypt(decrypt);
          if (originalText.length === 0) {
            setToast({ text: "Private phrase is not valid.", type: "error" });
          } else {
            setPasswordDecrypt(originalText);
          }
        } catch (error) {
          console.error(error);
        }
        break;
      case "3":
        try {
          const decrypt = CryptoJS.TripleDES.decrypt(
            passwordEncrypt,
            secretPhrase
          );
          // const originalText = rabbitDecrypt(decrypt);
          const originalText = decrypt.toString(CryptoJS.enc.Utf8);
          if (originalText.length === 0) {
            setToast({ text: "Private phrase is not valid.", type: "error" });
          } else {
            setPasswordDecrypt(originalText);
          }
        } catch (error) {
          setToast({ text: "Private phrase is not valid.", type: "error" });
          console.error(error);
        }
        break;
      case "4":
        try {
          const decrypt = CryptoJS.RC4Drop.decrypt(
            passwordEncrypt,
            secretPhrase
          );
          // const originalText = rabbitDecrypt(decrypt);
          const originalText = decrypt.toString(CryptoJS.enc.Utf8);
          if (originalText.length === 0) {
            setToast({ text: "Private phrase is not valid.", type: "error" });
          } else {
            setPasswordDecrypt(originalText);
          }
        } catch (error) {
          setToast({ text: "Private phrase is not valid.", type: "error" });
          console.error(error);
        }
        break;
      default:
        console.warn("Algoritmo no definido.");
        break;
    }
  };

  const closeHandler = (event) => {
    setVisibleModal(false);
    resetFormValues();
  };

  const copyKeyToClipboard = () => {
    navigator.clipboard.writeText(passwordDecrypt).then(() => {
      setToast({ text: "Encrypt key copied to clipboard." });
      setTimeout(() => {
        setVisibleModal(false);
        resetFormValues();
      }, 100);
    });
  };

  const resetFormValues = () => {
    setBtnDisabled(true);
    passwordEncryptRef && (passwordEncryptRef.current.value = "");
    secretPhraseRef && (secretPhraseRef.current.value = "");
    setSelectInitialValue(null);
  };

  return (
    <>
      <Card hoverable width="100%">
        <Text h4>Decrypt</Text>
        <p>Decrypt everything you have hidden.</p>
        <Input
          width="100%"
          placeholder="Text to decrypt"
          onChange={(event) => setPasswordEncrypt(event.target.value)}
          ref={passwordEncryptRef}
        />
        <Spacer />
        <Input.Password
          placeholder="Private phrase"
          onChange={(event) => setSecretPhrase(event.target.value)}
          width="100%"
          ref={secretPhraseRef}
        />
        <Spacer />
        <Select
          placeholder="Type"
          onChange={(val) => setType(val)}
          width="100%"
          value={() => selectInitialValue}
        >
          <Select.Option value="1">AES</Select.Option>
          <Select.Option value="2">Rabbit</Select.Option>
          <Select.Option value="3">TripleDES</Select.Option>
          <Select.Option value="4">RC4Drop</Select.Option>
        </Select>
        <Spacer h={2} />
        <div align="end">
          <Button
            type="secondary-light"
            onClick={decryptPassword}
            disabled={btnDisabled}
          >
            Decrypt!
          </Button>
        </div>
      </Card>

      <Modal visible={visibleModal} onClose={closeHandler}>
        <Modal.Title>Decrypt Password</Modal.Title>
        {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
        <Modal.Content>
          <Note label={false}>{passwordDecrypt}</Note>
        </Modal.Content>
        <Modal.Action passive onClick={() => closeHandler()}>
          Cancel
        </Modal.Action>
        <Modal.Action passive onClick={() => copyKeyToClipboard()}>
          Copy to Clipboard
        </Modal.Action>
      </Modal>
    </>
  );
};

export default DecryptCard;
