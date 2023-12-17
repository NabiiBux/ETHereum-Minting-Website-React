import React, { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import moment from 'moment';
import styled from 'styled-components';
import Form from "react-bootstrap/Form";
import MintingContract from '../MintingContract.json';
import { mintText, mintText0, mintText1 } from '../setting.js'
import { disconnectWallet, connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
import {
  Center,
  Box,
  Head,
  Image,
  Button,
  HStack,
  VStack,
  Heading,
  Flex,
  Link,
  Card,
  CardBody,
  StackDivider,
  Stack,
  useToast,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
  Progress,
} from '@chakra-ui/react';

const OutsideClickHandler = ({ children, onOutsideClick }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      // Clicked outside the specified element
      onOutsideClick();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};







const ReCaptach = () => {
  const difference = +new moment('2024-12-16 23:30').utc() - +new Date();
  const difference1 = +new moment('2023-12-16 05:30').utc() - +new Date();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [days1, setDays1] = useState(0);
  const [hours1, setHours1] = useState(0);
  const [minutes1, setMinutes1] = useState(0);
  const [seconds1, setSeconds1] = useState(0);
  const [text, setText] = useState(0);
  const [text1, setText1] = useState(0);
  const [text2, setText2] = useState(0);
  const [text3, setText3] = useState(0);
  const [verfied, setVerifed] = useState(false);




  useEffect(() => {
    const id = setTimeout(() => {

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
        setText("Ending in: ");

      }
      else {
        setText1(" Mints Ended");

      }

      if (difference1 > 0) {
        setDays1(Math.floor(difference1 / (1000 * 60 * 60 * 24)));
        setHours1(Math.floor((difference1 / (1000 * 60 * 60)) % 24));
        setMinutes1(Math.floor((difference1 / 1000 / 60) % 60));
        setSeconds1(Math.floor((difference1 / 1000) % 60));
        setText2("Ending in: ");

      }
      else {
        setText3("Mint Ended: ");
      }

    }, 1000);



    return () => {
      clearTimeout(id);

    };
  });




  //recaptcha function
  function onChange(value) {
    console.log('Captcha value:', value);
    setVerifed(true);
  }

  const CONTRACT_ADDRESS = '0x77C9e7733550026AcE28950e973681C0F74191E3';
  const [walletAddress, setWallet] = useState("");
  const [show, setShow] = useState("false");
  const [contract, setContract] = useState(undefined);
  const [tokenNumber, setTokenNumber] = useState(1);
  const [tokenNumber1, setTokenNumber1] = useState(1);
  const [status, setStatus] = useState("");
  const publicsale = true;
  const [supply, setSupply] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const publicsale_price = 30000000000000000;
  const [osLink, setOsLink] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [latestTx, setlatestTx] = useState('');
  const handleShow = async () => {
    setShow(true);
  };

  const onMintHandle = () => {
    setStatus("Mint not allowed!");
  };

  const decreaseTokenNumber = () => {
    if (tokenNumber === 1) {
      return;
    }
    setTokenNumber(tokenNumber - 1);

    if (tokenNumber1 === 1) {
      return;
    }
    setTokenNumber1(tokenNumber - 1);
  };

  const onMintPressed = async () => {
    const { status } = await (tokenNumber);
    setStatus(status);
  };




  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleOutsideClick = () => {
    console.log('Clicked outside!');
    setOpen(!open);
    // Add your logic for handling clicks outside the element
  };


  const loadBlockchain = async () => {
    let provider = window.ethereum;
    const web3 = new Web3(provider);

    const contract = new web3.eth.Contract(
      MintingContract.abi,
      CONTRACT_ADDRESS
    );
    setContract(contract);
  };

  const buyFlys = (number) => {
    if (contract !== undefined && ethAddress !== '') {
      var value = number * 20000000;

      contract.methods
        .buyFlys(number)
        .send({ from: ethAddress, value: value })
        .then((tx) => {
          console.log(tx);
          setlatestTx(tx.transactionHash);
          setOsLink(
            'https://opensea.io/assets/' +
            tx.to +
            '/' +
            tx.events.Transfer.returnValues.tokenId
          );
          console.log(osLink);
          onOpen();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const mintText = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  margin-bottom: 1rem;
`;



  return (
    <div className="container,display" style={{ marginTop: 10 }}>

      <div
        style={{
          border: '1px solid white',
          borderRadius: '5px',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ fontWeight: 'bold' }}>WL MINT</h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {` ${text} ` ? ` ${text} ` : ` ${text1} `}
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >

                {days < 10 ? `0${days}` : days}

              </div>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {hours < 10 ? `0${hours}` : hours}

              </div>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {minutes < 10 ? `0${minutes}` : minutes}

              </div>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {seconds < 10 ? `0${seconds}` : seconds}

              </div>
            </div>
          </div>
        </div>


        <div

          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p>
            <mintText >
              Only users who are Whitelisted can mint!
              <br />5 per wallet 0.01 SOL per NFT
              {/* {mintText0} */}
            </mintText>
          </p>


          <div className="mint-number"

          >

            {<Button
              style={{
                background: 'blue',
                borderRadius: '5px',
                padding: '5px 7px',
                color: 'white',
                position: 'relative',
                fontSize: '1rem',
                left: '140px',

              }}
              onClick={() => buyFlys()}
            >

              Mint Now!
            </Button>}

            <button type="button" onClick={decreaseTokenNumber}>
              <span aria-hidden="true">-</span>
            </button>
            <Form>
              <Form.Label>{tokenNumber}</Form.Label>
              {status ? <div>{status}</div> : <div></div>}
            </Form>
            {tokenNumber < 5 ? (
              <button
                type="button"
                onClick={() => setTokenNumber(tokenNumber + 1)}
              >
                <span aria-hidden="true">+</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setTokenNumber(tokenNumber)}
              >
                <span aria-hidden="true">+</span>
              </button>

            )}
          </div>

        </div >


      </div >






      {/* PUBLIC */}
      < div
        style={{
          border: '1px solid white',
          borderRadius: '5px',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ fontWeight: 'bold' }}>PUBLIC</h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {text2 ? text2 : text3}
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {days1 < 10 ? `0${days1}` : days1}
              </div>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {hours1 < 10 ? `0${hours1}` : hours1}
              </div>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {minutes1 < 10 ? `0${minutes1}` : minutes1}
              </div>
              <div
                style={{
                  background: 'blue',
                  marginLeft: '7px',
                  padding: '5px',
                  borderRadius: '3px',
                }}
              >
                {seconds1 < 10 ? `0${seconds1}` : seconds1}

              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p>
            <mintText >
              Public mint! All users can mint

              <br />10 per wallet • 0.02 SOL per NFT
              {/* {mintText1} */}
            </mintText>
          </p>

          <div className="mint-number"

          >

            {<Button
              style={{
                background: 'blue',
                borderRadius: '5px',
                padding: '5px 7px',
                color: 'white',
                position: 'relative',
                fontSize: '1rem',
                left: '140px',

              }}
              onClick={() => buyFlys()}
            >

              Mint Now!
            </Button>}

            <button type="button" onClick={decreaseTokenNumber}>
              <span aria-hidden="true">-</span>
            </button>
            <Form>
              <Form.Label>{tokenNumber1}</Form.Label>
              {status ? <div>{status}</div> : <div></div>}
            </Form>
            {tokenNumber1 < 10 ? (
              <button
                type="button"
                onClick={() => setTokenNumber1(tokenNumber1 + 1)}
              >
                <span aria-hidden="true">+</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setTokenNumber1(tokenNumber1)}
              >
                <span aria-hidden="true">+</span>
              </button>

            )}
          </div>
        </div>
      </div >
    </div >
  );
}

export default ReCaptach;
