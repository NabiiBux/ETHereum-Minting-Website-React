import React, { useEffect, useRef, useState } from 'react';
import { Button, HStack, useToast } from '@chakra-ui/react';
import { disconnectWallet, connectWallet, getCurrentWalletConnected } from "../utils/interact.js";
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

function Nav({ }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWallet, setwalletAdrress] = useState("");
  const [show, setShow] = useState(false);
  const [tokenNumber, setTokenNumber] = useState(1);
  const [status, setStatus] = useState("");
  const handleClose = () => setShow(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
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
  };

  const onMintPressed = async () => {
    const { status } = await connectWalletPressed(tokenNumber);
    setStatus(status);
  };


  const handleIncrement = () => {
    if (mintAmount < 5) {
      setTotalSupply((prev) => prev + 1);
    }
  };
  const handleDecrement = () => {
    if (mintAmount > 0) {
      setTotalSupply((prev) => prev - 1);
    }
  };
  const handleOutsideClick = () => {
    console.log('Clicked outside!');
    setOpen(!open);
    // Add your logic for handling clicks outside the element


  };


  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };
  const disconnectWalletPressed = () => {
    setwalletAdrress('null');
    alert('disconnected');
  };



  return (
    <div class="Aligner-item Aligner-item--top">
      <HStack flexDirection="column">
        <div
          style={{
            padding: '10px 20px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >

          {walletAddress !== '' ? (
            <div style={{ position: 'relative' }}>
              <Button
                color="white"
                fontWeight="bold"
                fontSize="1.5rem"
                maxWidth="100%"
                colorScheme="purple"
                size="lg"
                onClick={() => setOpen(true)}
              >
                {/* Disconnect */}
                {walletAddress?.slice(0, 6)}...
                {walletAddress?.slice(walletAddress.length - 4, walletAddress.length)}
              </Button>
              {open && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '50px',
                    background: 'black',
                    padding: 10,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                >
                  <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                    <Button
                      style={{ width: '100%' }}
                      color="white"
                      fontWeight="bold"
                      fontSize="1.5rem"
                      maxWidth="100%"
                      colorScheme="purple"
                      size="lg"
                      onClick={() => disconnectWalletPressed()}
                    >
                      Disconnect
                    </Button>
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          ) : (
            <Button
              colorScheme="purple"
              size="lg"
              onClick={() => connectWalletPressed()}
            >
              Select Wallet
            </Button>
          )}
        </div>
      </HStack>
    </div>
  );
}

export default Nav;
