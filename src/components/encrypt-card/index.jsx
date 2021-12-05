import { useState, useEffect, useRef } from "react";
import CryptoJS from "crypto-js";
import {
  Card,
  Text,
  Select,
  Input,
  Spacer,
  Button,
  Modal,
  Note,
  useToasts,
} from "@geist-ui/react";

const EncryptCard = () => {
  const pwdRef = useRef(null);
  const privatePhraseRef = useRef(null);
  const selectRef = useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [type, setType] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pwd, setPwd] = useState(null);
  const [privatePhrase, setPrivatePhrase] = useState(null);
  const [passwordEncrypt, setPasswordEncrypt] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [toasts, setToast] = useToasts();
  const [selectInitialValue, setSelectInitialValue] = useState(null);

  useEffect(() => {
    if (type) {
      setSelectInitialValue(type);
    }

    if (pwd && privatePhrase && type > 0) {
      setBtnDisabled(false);
    }
  }, [privatePhrase, pwd, type]);

  useEffect(() => {
    if (passwordEncrypt) {
      setVisibleModal(true);
    }
  }, [passwordEncrypt]);

  const closeHandler = (event) => {
    setVisibleModal(false);
  };

  const selectHandler = (val) => {
    setType(val);
  };

  const encrypt = () => {
    switch (type) {
      case "1":
        const pwdEncrypt = CryptoJS.AES.encrypt(pwd, privatePhrase).toString();
        setPasswordEncrypt(pwdEncrypt);
        break;
      case "2":
        const pwdRabit = CryptoJS.Rabbit.encrypt(pwd, privatePhrase).toString();
        setPasswordEncrypt(pwdRabit);
        break;

      case "3":
        const pwdTripleDES = CryptoJS.TripleDES.encrypt(
          pwd,
          privatePhrase
        ).toString();
        setPasswordEncrypt(pwdTripleDES);
        break;

      case "4":
        const pwdTripleRC4 = CryptoJS.RC4Drop.encrypt(
          pwd,
          privatePhrase
        ).toString();
        setPasswordEncrypt(pwdTripleRC4);
        break;

      default:
        break;
    }
  };

  const copyKeyToClipboard = () => {
    navigator.clipboard.writeText(passwordEncrypt).then(() => {
      resetFormValues();
      setToast({ text: "Encrypt key copied to clipboard.", type: "success" });
      setTimeout(() => {
        setVisibleModal(false);
      }, 100);
    });
  };

  const closeModal = () => {
    resetFormValues();
    setVisibleModal(false);
  };

  const resetFormValues = () => {
    setBtnDisabled(true);
    pwdRef && (pwdRef.current.value = "");
    privatePhraseRef && (privatePhraseRef.current.value = "");
    setSelectInitialValue(null);
  };

  return (
    <>
      <Card hoverable width="100%">
        <Text h4>Encrypt</Text>
        <p>Encrypt your passwords and save them anywhere.</p>
        <Select
          placeholder="Algorithm type"
          onChange={selectHandler}
          width="100%"
          ref={selectRef}
          value={() => selectInitialValue}
        >
          <Select.Option value="1">AES</Select.Option>
          <Select.Option value="2">Rabbit</Select.Option>
          <Select.Option value="3">TripleDES</Select.Option>
          <Select.Option value="4">RC4Drop</Select.Option>
        </Select>
        <br />
        <Spacer />
        <Input.Password
          placeholder="Text to encrypt"
          onChange={(e) => setPwd(e.target.value)}
          width="100%"
          ref={pwdRef}
        />
        <br />
        <Spacer />
        <Input.Password
          placeholder="Private phrase"
          onChange={(e) => setPrivatePhrase(e.target.value)}
          width="100%"
          ref={privatePhraseRef}
        />
        <Spacer h={2} />
        <div align="start">
          <Button
            type="secondary-light"
            onClick={() => encrypt()}
            disabled={btnDisabled}
          >
            Ecrypt!
          </Button>
        </div>
      </Card>

      <Modal visible={visibleModal} onClose={closeHandler}>
        <Modal.Title>Encrypt Password</Modal.Title>
        {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
        <Modal.Content>
          <Note
            width="100%"
            style={{ wordBreak: "break-all", whiteSpace: "normal" }}
            label={false}
          >
            {passwordEncrypt}
          </Note>
        </Modal.Content>
        <Modal.Action passive onClick={() => closeModal()}>
          Cancel
        </Modal.Action>
        <Modal.Action passive onClick={() => copyKeyToClipboard()}>
          Copy to Clipboard
        </Modal.Action>
      </Modal>
    </>
  );
};

export default EncryptCard;
