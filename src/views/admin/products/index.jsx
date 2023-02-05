import { Box, Button, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import ParentProductsColumnsTable from "./components/ParentProductsColumnsTable";
import VariationProductColumnsTable from "./components/VariationProductsColumnsTable";
import {
  variationProductsDataColumns,
  parentProductsColumnsDataColumns,
  variationByParentProductsDataColumns
} from "views/admin/products/variables/columnsData"
import {
    PRODUCT_TYPE,
    URL
} from '../../../constants'
import { useState } from "react";
import VariationByParentProductsColumnsTable from "./components/VariationByParentProductsColumnsTable";
import NewProductModal from "./components/NewProductModal";
import ExportDataModal from "./components/ExportDataModal";
import Cookies from 'js-cookie';

export default function Products() {
    // Chakra Color Mode
    let menuBg = useColorModeValue("white", "navy.800");
    const searchIconColor = useColorModeValue("gray.700", "white");
    const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
    const inputText = useColorModeValue("gray.700", "gray.100");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
      );

    const [productSKU, setProductSKU] = useState('');
    const [productType, setProductType] = useState('');
    const [table, setTable] = useState();

    const [ExportDataModalOpen, setExportDataModalOpen] = useState(false);
    const { onClose: closeExportDataModal, onOpen: openExportDataModal, isOpen: exportDataIsOpen } = useDisclosure();
    const [newProductModalOpen, setNewProductModalOpen] = useState(false);
    const { onClose: closeNewProductModal, onOpen: openNewProductModal, isOpen: newProductIsOpen } = useDisclosure();

    async function fetchTableData(url) {
        let response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
              }
            })
            .catch(e => {
                alert("Error processing this data due to server error.");
            });
        if (response.ok) {
            return response.json();
        } else {
            alert("Product not found.");
        }
    }

    let onFormSubmit = async () => {
        let path = productType === 'PARENT' ? `${URL.HOST}/product` : `${URL.HOST}/product/variations`
        path = productSKU === '' ? path : path+`/${productSKU}` ;
        // TODO: data validation

        if ((productType === 'PARENT') || (productType === "VARIATION" && productSKU != "")) {

            let result = await fetchTableData(path);
            console.log(result);

            if (productType === PRODUCT_TYPE.PARENT && productSKU.length == 0) {
                setTable(
                    <ParentProductsColumnsTable
                        columnsData={parentProductsColumnsDataColumns}
                        tableData={result.data}
                    />
                )
            } else if (productType === PRODUCT_TYPE.PARENT && productSKU.length !== 0) {
                setTable(<VariationByParentProductsColumnsTable 
                    columnsData={variationByParentProductsDataColumns}
                    tableData={result}
                    productSKU={productSKU}
                    variationByProductData={result.product_variations}
                />)
            } else if (productType === PRODUCT_TYPE.VARIATION && productSKU.length !== 0) {
                setTable(<VariationProductColumnsTable 
                    columnsData={variationProductsDataColumns}
                    tableData={result.data}
                    productSKU={productSKU}
                />) 
            } 
        } else {
            alert('Please provide correct input.');
        }
    }

    return (
        <Box p='10px' pt={{ base: "180px", md: "80px", xl: "80px" }} >

            <Modal size='xxl' isOpen={newProductIsOpen} onClose={closeNewProductModal}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>New Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <NewProductModal />
                </ModalBody>
                {/* <ModalFooter>
                    <Button colorScheme="brand" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant="ghost">Upload Products</Button>
                </ModalFooter> */}
                </ModalContent>
            </Modal>

            <Modal size='xxl' isOpen={exportDataIsOpen} onClose={closeExportDataModal}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Export Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ExportDataModal />
                </ModalBody>
                </ModalContent>
            </Modal>
            
            <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems='center'
            flexDirection='row'
            bg={menuBg}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            p='10px'
            borderRadius='30px'
            boxShadow={shadow}>
                {/* <div className="field" style={{width: '25%', padding: '10px'}}>
                    <select className="ui fluid dropdown" style={{width: '100%', borderRadius: '30px'}} onChange={e => setProductSKU(e.target.value)}>
                        <option value="">Product Category</option>
                        <option value="NECKLACE">Necklace</option>
                        <option value="BRACELET">Bracelet</option>
                        <option value="RING">Ring</option>
                        <option value="EARRING">Earring</option>
                    </select>
                </div> */}
                <div className="field" style={{width: '25%', padding: '10px'}}>
                    <select className="ui fluid dropdown" style={{width: '100%', borderRadius: '30px', padding: '5px', backgroundColor: `${inputBg}`}} onChange={e => setProductType(e.target.value)}>
                        <option value="">Product Type</option>
                        <option value="PARENT">Parent product</option>
                        <option value="VARIATION">Children product</option>
                    </select>
                </div>
                <Input
                    w='25%'
                    variant='search'
                    fontSize='sm'
                    bg={inputBg}
                    color={inputText}
                    fontWeight='500'
                    _placeholder={{ color: "gray.400", fontSize: "14px" }}
                    borderRadius="30px"
                    placeholder="SKU"
                    onChange={e => {setProductSKU(e.target.value)}}/>
                <Button w='10%' ml='10px' variant='action' onClick={() => onFormSubmit()}>Search</Button>
                
                <Spacer />
                
                <Button variant='brand' mr='10px' onClick={openExportDataModal}>Export Data</Button>

                <Button variant='brand' onClick={openNewProductModal}>New Product</Button>
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
                    {table}
            </Flex>
        </Box>
    )
}