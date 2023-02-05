import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Input, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import {
    URL
} from '../../../../constants.js'

export default function ExportDataModal () {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    let menuBg = useColorModeValue("white", "navy.800");
    const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
    const inputText = useColorModeValue("gray.700", "gray.100");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
      );

    const [data, setData] = useState([]);
    const [productType, setProductType] = useState('');
    const [productCategory, setProductCategory] = useState('');

    let exportDataOnClick = async () => {
        let response = await fetch(`${URL.HOST}/api/product/products/export/${productCategory}`,
            {
                method: 'POST',
                headers: {
                    "accept": "application/json"
                }
            })
            .catch(e => {alert("Error exporting data.")});
        const csvData = await response.text();
        setData(csvData);
    };

    let handleDownload = async () => {
        await exportDataOnClick();
        const blob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
    
        link.href = url;
        link.download = `product_${productCategory}_data.csv`;
        link.click();
    };

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
                        Export
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

                    <div className="field" style={{width: '25%', padding: '10px', marginLeft: '10px'}}>
                        <select 
                            className="ui fluid dropdown" 
                            style={{width: '100%', borderRadius: '30px', 
                            padding: '5px', backgroundColor: `${inputBg}`}} 
                            onChange={e => setProductCategory(e.target.value)}
                            >
                            <option value="">Product Category</option>
                            <option value="PENDANT">Pendant</option>
                            <option value="RING">Ring</option>
                        </select>
                    </div>
                    
                    <Button ml='10px' variant='brand' onClick={handleDownload}>Export and Download</Button>
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

                    <Text>Pick the product category you wish to export.</Text>

                </Flex>
            </Box>
        )
}