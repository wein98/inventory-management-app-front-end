import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Input, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react";
import {
    URL
} from '../../../../constants.js'

export default function NewProductModal() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    let menuBg = useColorModeValue("white", "navy.800");
    const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
    const inputText = useColorModeValue("gray.700", "gray.100");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
      );

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [productType, setProductType] = useState('');
    const [importResult, setImportResult] = useState({
        isLoading: false,
        isSuccess: false,
        message: null
    })

    const changeHandler = (event) => {
        if (event.target && event.target.files[0].type === "text/csv") {
            console.log(event.target.files[0]);
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(!isFilePicked);

        } else {
            alert('Please choose a CSV file');
            return;
        }
    }

    let onFileSubmit = async () => {
        // refresh all states
        setImportResult({
            isLoading: true,
            isSuccess: true,
            message: null
        })

        const formData = new FormData();
        formData.append('file', selectedFile);
        
        let response = await fetch(`${URL.HOST}/api/product/products/import/${productType}`,
            {
				method: 'POST',
                headers: {
                    "accept": "application/json"
                },
				body: formData,
			})
            .then(response => response.json())
            .then((data) => {
                if (data.length) {
                    setImportResult({
                        isLoading: false,
                        isSuccess: true,
                        message: data
                    });
                } else {
                    setImportResult({
                        isLoading: false,
                        isSuccess: false,
                        message: 'There\'s invalid records, please check again.'
                    });
                }
            })
            .catch(e => {
                alert("Error processing this data due to server error.");
                setImportResult({
                    ...importResult,
                    isLoading: false
                });
            });
    }

    let showImportResult = () => {
        return (
            <Alert>
            <AlertIcon status='info'/>
            <AlertDescription>
                {importResult.isSuccess ? `Successfully uploaded ${importResult.message.length} items.` : `${importResult.message}`}
            </AlertDescription>
        </Alert>
        )
    }

    return (
        <Box p='10px' pt={{ base: "180px", md: "80px", xl: "80px" }} >
        <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems='center'
            flexDirection='row'
            bg={menuBg}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            p='20px'
            borderRadius='30px'
            boxShadow={shadow}>
                <Text
                    color={textColor}
                    fontSize='18px'
                    fontWeight='500'
                    lineHeight='100%'>
                    Import
                </Text>

                <div className="field" style={{width: '25%', padding: '10px', marginLeft: '10px'}}>
                    <select 
                        className="ui fluid dropdown" 
                        style={{width: '100%', borderRadius: '30px', 
                        padding: '5px', backgroundColor: `${inputBg}`}} 
                        onChange={e => setProductType(e.target.value)}
                        >
                        <option value="">Product Type</option>
                        <option value="PARENT">Parent product</option>
                        <option value="CHILDREN">Children product</option>
                    </select>
                </div>

                <Input
                    w='25%'
                    variant='search'
                    fontSize='sm'
                    ml='10px'
                    bg={inputBg}
                    color={inputText}
                    fontWeight='500'
                    _placeholder={{ color: "gray.400", fontSize: "14px" }}
                    borderRadius="30px"
                    placeholder=".csv file"
                    type="file"
                    onChange={e => changeHandler(e)}
                    />
                
                <Button ml='10px' variant='brand' onClick={onFileSubmit}>Submit</Button>
            </Flex>

            <Flex
                w={{ sm: "100%", md: "auto" }}
                alignItems='center'
                flexDirection='row'
                bg={menuBg}
                flexWrap={{ base: "wrap", md: "nowrap" }}
                p='10px'
                margin='20px'
                borderRadius='30px'
                boxShadow={shadow}>

                    {importResult.message ? showImportResult() : 'Pick a type of product and .csv file to be imported.'}

            </Flex>
        </Box>
    )
}