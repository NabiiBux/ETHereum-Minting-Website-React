
<>
    <main style={{ display: "flex", flexDirection: "column", height: "100%" }}>


    </main>
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



    <Flex >

        <Content >
            <Text

            >
                {headerText}
            </Text>

            <InfoRow>

                <InfoBox className="container,night1">
                    <p>Total items</p>
                    <p>{Number(30)}</p>
                </InfoBox>

                <IconRow className="icons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <CiGlobe></CiGlobe>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        < CiTwitter></ CiTwitter>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FaDiscord></FaDiscord>
                    </a>
                </IconRow>
            </InfoRow>

            {collectionDescription}

        </Content >
    </Flex>

    <Flex width="100%" gap="20px">


        <Stack
            divider={<StackDivider />}
            width="100%"
            display="flex"
            rounded={"lg"}
            pos={"relative"}
        >
        </Stack>
    </Flex>
    <Flex color="white" flexDirection="column">
        <Image
            src={image}
            alt="project Image"
            layout="responsive"
            width={100}
            height={100}
            style={{
                minWidth: "< 650px" ? "400px" : "500px",
                height: "auto",
            }}
        />
    </Flex>



    <Nav
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        ethAddress={ethAddress}
    />
    <Center>
        {nftShowcaseToggle ? (
            <Image
                pt="50px"
                align="center"
                boxSize="25%"
                src={nftUrl}
                alt="Placeholder image"
                fallbackSrc="https://via.placeholder.com/2000x2400"
            />
        ) : (
            ""
        )}
    </Center>
    <>
        <Modal

            motionPreset="slideInBottom"
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader align="center">Mint succsessfull</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Image
                        src={nftUrl}
                        boxSize="50%"
                        align="center"
                        fallbackSrc="https://via.placeholder.com/2000x2400"
                        pb="6"
                        pt="6"
                    />
                    <Link
                        href={"https://ropsten.etherscan.io/tx/" + latestTx}
                        isExternal
                        offset="2"
                        alignSelf="center"
                        pt="3"
                    >
                        View on etherscan <ExternalLinkIcon mx="2px" />
                    </Link>

                    <Link
                        href={osLink}
                        isExternal
                        offset="2"
                        alignSelf="center"
                        pt="6"
                    >
                        View on OpenSea <ExternalLinkIcon mx="2px" />
                    </Link>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="white" mr={3} onClick={onClose} size="sm">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>



</>

);

}
