import './App.css';
import Web3 from 'web3';
import MintingContract from './MintingContract.json';
import { useEffect, useState, useRef } from 'react';
import { image, headerText, collectionDescription } from './setting';
import styled from 'styled-components';
import { CiGlobe, CiTwitter } from 'react-icons/ci';
import { FaDiscord, FaGlobe, FaTwitter } from 'react-icons/fa';
import ReCaptach from './components/ReCaptach';
// import { useWeb3React } from "@web3-react/core";
import { disconnectWallet, connectWallet, getCurrentWalletConnected } from "./utils/interact.js";
import ReCAPTCHA from 'react-google-recaptcha';
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
import Nav from './components/Nav';





















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


















function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [walletAddress, setWallet, setwalletAdrress] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to update screen width on resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // metamask related function

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










  const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;
    width: 100%;
  `;

  const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0;
    gap: 16px;
    flex-wrap: wrap;
  `;
  const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px 16px;
    gap: 8px;
    border: 2px solid #ffffff;
    border-radius: 4px;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    text-transform: uppercase;
    color: var(--white);

    @media only screen and (max-width: 450px) {
      font-size: 18px;
    }
  `;
  const IconRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 24px;
    margin-bottom: -3px;
    margin-left: 1rem;
  `;
  const CollectionDescription = styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    margin-bottom: 1rem;
  `;














  return (
    <>

      <main>
        <style index>
          {`
            html {
              height: 100%;
              background: black; /* fallback for old browsers */
            }
            body {
              // background: #673ab7; /* fallback for old browsers */
              background: black; /* fallback for old browsers */
            }
          `}
        </style>

        <>

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
                          className='button.wallet-adapter-button-trigger , button.wallet-adapter-button-trigger:hover , wallet-adapter-dropdown'
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

                isCaptchaVerified ? (
                  <Button

                    colorScheme="purple"
                    size="lg"
                    onClick={() => connectWalletPressed()}
                  >
                    Select Wallet
                  </Button>

                ) : (

                  null

                )


              )}
            </div>
          </HStack>
          <Flex
            gap={screenWidth > 650 ? '20px' : '10px'}
            marginBottom="20px"
            alignItems="center"
            justifyContent="center"
            flexDirection={screenWidth < 1100 ? 'column' : 'row'}
          >
            <div>
              <Flex
                width="100%"
                maxWidth="600px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                color="white"
                // height="45rem"
                maxHeight="100%"
              >
                <Flex>
                  <Content>
                    <Text
                      alignItems="center"
                      justifyContent={'650px' ? 'center' : 'flex-start'}
                      color="white"
                      fontSize={'650px' ? '8vh' : '3.5rem'}
                      fontWeight="bold"

                    >

                      {headerText}
                    </Text>
                    <InfoRow>
                      <></>

                      <InfoBox>
                        <p>Total items</p>
                        <p> </p>
                      </InfoBox>

                      <IconRow>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <FaGlobe></FaGlobe>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <FaTwitter></FaTwitter>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <FaDiscord></FaDiscord>
                        </a>
                      </IconRow>
                    </InfoRow>
                    <CollectionDescription>
                      {collectionDescription}
                    </CollectionDescription>
                    {isCaptchaVerified ? (
                      <div style={{ width: '100%' }}>
                        {walletAddress !== '' ? (
                          null
                        ) : (
                          <Button
                            style={{ width: '100%' }}
                            colorScheme="purple"
                            size="lg"
                            onClick={() => connectWalletPressed()}
                          >
                            Select Wallet

                          </Button>

                        )}

                        {/* <ReCAPTCHA
                          sitekey={
                            process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
                            " 6Le4rSQpAAAAAMTiGCwY1nAPW0I6cKFrvLSXSsKK "
                          }
                          onChange={(value) => {
                            console.log("Captcha value:", value);
                            setCaptchaVerified(true);
                          }}
                        /> */}
                      </div>
                    ) : (
                      null
                    )}

                  </Content>
                </Flex>

                <Flex width="100%" gap="20px">

                  <Stack
                    divider={<StackDivider />}
                    width="100%"
                    display="flex"
                    rounded={"lg"}
                    pos={"relative"}
                  >

                    {isCaptchaVerified ? (
                      <
                        ReCaptach
                      />


                    ) : (
                      <ReCAPTCHA
                        sitekey={
                          process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
                          " 6Le4rSQpAAAAAMTiGCwY1nAPW0I6cKFrvLSXSsKK "
                        }
                        onChange={(value) => {
                          console.log("Captcha value:", value);
                          setCaptchaVerified(true);
                        }}
                      />

                    )}
                  </Stack>

                </Flex>
                {/* <Text marginBottom="30px" width="100%">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci laudantium at, error reprehenderit minima
                  repellendus! Eveniet voluptatem iusto repudiandae suscipit,
                  expedita quibusdam quaerat officiis atque at ab libero, labore
                  eaque!
                </Text> */}
                <Flex width="100%" gap="20px">
                  <Stack
                    divider={<StackDivider />}
                    width="100%"
                    display="flex"
                    rounded={'lg'}
                    pos={'relative'}
                  ></Stack>
                </Flex>
              </Flex>
            </div>
            <div>
              <Flex color="white" flexDirection="column">
                <Image
                  src={image}
                  alt="project Image"
                  layout="responsive"
                  width={100}
                  height={100}
                  style={{
                    minWidth: screenWidth < 650 ? '400px' : '500px',
                    height: 'auto',
                  }}
                />
              </Flex>
            </div>
          </Flex>
        </>
      </main >
    </>
  );
}

export default App;
